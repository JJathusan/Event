// src/components/figma/ImageWithFallback.tsx
import React, { useState } from "react";

type Props = {
  src?: string;                       // can be undefined safely
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  fallback?: string;                  // optional custom fallback image
};

export function ImageWithFallback({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  fallback,
}: Props) {
  const [hasError, setHasError] = useState(false);

  // Default fallback image (local placeholder)
  const defaultFallback =
    "/placeholder-image.png"; // put this image in public/ folder

  const finalSrc = !src || hasError ? fallback || defaultFallback : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
}
