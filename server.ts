import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === "production";

function hasRealEnvValue(val: string | undefined, placeholderPrefix = "MY_"): boolean {
  if (!val) return false;
  const trimmed = val.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith(placeholderPrefix)) return false;
  return true;
}

function getIntegrationStatus() {
  const geminiConfigured = hasRealEnvValue(process.env.GEMINI_API_KEY, "MY_GEMINI");
  const supabaseConfigured =
    hasRealEnvValue(process.env.SUPABASE_URL) &&
    hasRealEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const adminConfigured = hasRealEnvValue(process.env.ADMIN_ACCESS_TOKEN);

  return {
    geminiConfigured,
    supabaseConfigured,
    adminConfigured,
  };
}

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!hasRealEnvValue(process.env.GEMINI_API_KEY, "MY_GEMINI")) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  // Health & integration status (never returns secret values)
  app.get("/api/config-status", (_req: Request, res: Response) => {
    res.json(getIntegrationStatus());
  });

  // Grounded Portfolio AI Assistant endpoint
  app.post("/api/assistant", async (req: Request, res: Response) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        configured: false,
        error: "AI_INTEGRATION_PENDING",
        message:
          "AI Assistant integration is pending. Add GEMINI_API_KEY to your server environment / Secrets panel to enable live responses.",
      });
      return;
    }

    const { message, history, portfolioContext } = req.body as {
      message?: string;
      history?: Array<{ role: "user" | "assistant"; content: string }>;
      portfolioContext?: unknown;
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    try {
      const safeContext = JSON.stringify(portfolioContext ?? {}, null, 2).slice(0, 14000);
      const historyLines = Array.isArray(history)
        ? history
            .slice(-6)
            .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
            .join("\n")
        : "";

      const prompt = historyLines
        ? `Previous conversation:\n${historyLines}\n\nVisitor question: ${message.trim()}`
        : `Visitor question: ${message.trim()}`;

      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: prompt,
        config: {
          systemInstruction: [
            "You are the Portfolio Assistant for this developer portfolio website.",
            "Answer visitor questions strictly using ONLY the structured portfolio JSON provided below.",
            "If a detail is still a placeholder (such as [YOUR_NAME] or [YOUR_PROJECT_TITLE_1]) or is not present in the portfolio data, state honestly that the portfolio owner has not populated that detail yet.",
            "Never invent work experience, employers, metrics, or skills not found in the provided context.",
            "Keep answers concise, clear, and helpful.",
            `Portfolio Data:\n${safeContext}`,
          ].join("\n\n"),
        },
      });

      const reply = response.text?.trim();
      if (!reply) {
        res.status(502).json({ error: "Empty response from Gemini model." });
        return;
      }

      res.json({ configured: true, reply });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to query Gemini API.";
      res.status(500).json({ configured: true, error: "GEMINI_ERROR", message: msg });
    }
  });

  // Contact form submission (requires Supabase configuration; never pretends to save)
  app.post("/api/contact", async (req: Request, res: Response) => {
    const { name, email, subject, message, website } = req.body as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      website?: string;
    };

    // Honeypot spam guard
    if (website && website.trim().length > 0) {
      res.status(400).json({ error: "Invalid submission." });
      return;
    }

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      res.status(400).json({ error: "All fields (name, email, subject, message) are required." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.status(400).json({ error: "Please provide a valid email address." });
      return;
    }

    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!hasRealEnvValue(supabaseUrl) || !hasRealEnvValue(supabaseKey)) {
      res.status(501).json({
        configured: false,
        error: "BACKEND_NOT_CONFIGURED",
        message:
          "Message storage is not configured yet. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server to persist contact submissions.",
        requiredEnv: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
      });
      return;
    }

    try {
      const endpoint = `${supabaseUrl!.replace(/\/$/, "")}/rest/v1/contact_messages`;
      const sbRes = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey!}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      if (!sbRes.ok) {
        const detail = await sbRes.text();
        res.status(502).json({
          configured: true,
          error: "SUPABASE_INSERT_FAILED",
          message: `Supabase returned ${sbRes.status}: ${detail}`,
        });
        return;
      }

      res.status(201).json({
        configured: true,
        stored: true,
        message: "Your message has been recorded.",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect to Supabase.";
      res.status(500).json({ configured: true, error: "CONTACT_SERVER_ERROR", message: msg });
    }
  });

  // Protected Admin Messages Inbox Scaffold
  app.get("/api/admin/messages", async (req: Request, res: Response) => {
    const adminToken = process.env.ADMIN_ACCESS_TOKEN?.trim();
    if (!hasRealEnvValue(adminToken)) {
      res.status(501).json({
        configured: false,
        error: "ADMIN_AUTH_NOT_CONFIGURED",
        message:
          "Admin authentication is not configured yet. Configure ADMIN_ACCESS_TOKEN (or Supabase Auth JWT verification) along with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      });
      return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      res.status(401).json({ error: "Unauthorized. Valid admin bearer token required." });
      return;
    }

    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!hasRealEnvValue(supabaseUrl) || !hasRealEnvValue(supabaseKey)) {
      res.status(501).json({
        configured: false,
        error: "SUPABASE_NOT_CONFIGURED",
        message: "Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to read stored messages.",
      });
      return;
    }

    try {
      const endpoint = `${supabaseUrl!.replace(/\/$/, "")}/rest/v1/contact_messages?select=*&order=created_at.desc&limit=50`;
      const sbRes = await fetch(endpoint, {
        headers: {
          apikey: supabaseKey!,
          Authorization: `Bearer ${supabaseKey!}`,
        },
      });
      if (!sbRes.ok) {
        res.status(502).json({ error: "Failed to query Supabase contact_messages." });
        return;
      }
      const rows = await sbRes.json();
      res.json({ configured: true, messages: rows });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching messages.";
      res.status(500).json({ error: msg });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("/{*splat}", (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Editorial Portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
