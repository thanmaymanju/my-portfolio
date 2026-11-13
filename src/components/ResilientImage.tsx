import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: "lazy" | "eager";
}

export function ResilientImage({
  src,
  alt,
  className = "",
  fallbackTitle,
  loading = "lazy",
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#f6f3f2] to-[#eae7e7] text-[#58413f] p-6 text-center border border-[#E5E5E5] ${className}`}
      >
        <ImageOff className="w-6 h-6 text-[#7A1212] mb-2" aria-hidden="true" />
        <span className="font-display text-sm font-medium text-[#1c1b1b]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
