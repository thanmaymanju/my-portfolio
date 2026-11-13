import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import type { GalleryCategory, GalleryItem } from "../types/portfolio";
import { ResilientImage } from "./ResilientImage";
import { SectionHeader } from "./SectionHeader";

const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "UI/UX Design",
  "Web Interfaces",
  "Dashboard Concepts",
  "System Diagrams",
];

export function Gallery() {
  if (!portfolioData.sections.showGallery) return null;

  const [category, setCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const items = useMemo(() => {
    if (category === "All") return portfolioData.gallery;
    return portfolioData.gallery.filter((item) => item.category === category);
  }, [category]);

  const activeItem: GalleryItem | null =
    lightboxIndex !== null && items[lightboxIndex] ? items[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % items.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + items.length) % items.length
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, items.length]);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Creative Gallery"
            title="Interface studies, dashboards, and visual artifacts."
            subtitle="Select any artifact to open the full-resolution lightbox viewer."
          />

          <div
            role="tablist"
            aria-label="Filter gallery artifacts"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f0eded] border border-[#E5E5E5] rounded-lg"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? "bg-white text-[#7A1212] border border-[#E5E5E5]"
                      : "text-[#58413f] hover:text-[#1c1b1b]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.3,
                delay: Math.min(idx * 0.05, 0.2),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-[#fcf9f8] border border-[#E5E5E5] hover:border-[#7A1212] rounded-xl overflow-hidden transition-colors duration-150"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Inspect ${item.title} in lightbox`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f3f2] border-b border-[#E5E5E5] block text-left cursor-pointer"
              >
                <ResilientImage
                  src={item.image}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/90 border border-[#E5E5E5] text-[#1c1b1b] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>

              <figcaption className="p-5 sm:p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-[#58413f]">
                  <span className="text-[#7A1212] font-semibold">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{item.year}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#1c1b1b]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#58413f] leading-relaxed">{item.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Viewer */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-8"
          >
            <div
              className="flex items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs sm:text-sm text-white/80 font-mono tabular-nums">
                {lightboxIndex + 1} / {items.length} · {activeItem.category}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 flex items-center justify-center my-4 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-5xl w-full max-h-[75vh] flex items-center justify-center">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex - 1 + items.length) % items.length)
                    }
                    aria-label="Previous image"
                    className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-lg bg-black/50 hover:bg-[#7A1212] text-white border border-white/20 mr-4 shrink-0 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div className="bg-[#171717] rounded-xl overflow-hidden border border-white/15 max-h-[75vh]">
                  <ResilientImage
                    src={activeItem.image}
                    alt={activeItem.alt}
                    fallbackTitle={activeItem.title}
                    className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
                  />
                </div>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % items.length)}
                    aria-label="Next image"
                    className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-lg bg-black/50 hover:bg-[#7A1212] text-white border border-white/20 ml-4 shrink-0 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div
              className="max-w-3xl mx-auto text-center text-white space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="font-display text-lg font-semibold">{activeItem.title}</h4>
              <p className="text-sm text-white/80">{activeItem.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
