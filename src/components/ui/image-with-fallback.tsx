"use client";

import { useState, useEffect, useRef } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

const failedImagesCache = new Set<string>();

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const srcString = typeof props.src === "string" ? props.src : undefined;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    failedImagesCache.has(srcString || "") ? "error" : "loading"
  );
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(srcString);

  useEffect(() => {
    if (srcString !== imageSrc) {
      if (failedImagesCache.has(srcString || "")) {
        setStatus("error");
      } else {
        setStatus("loading");
      }
      setImageSrc(srcString);
    }
  }, [srcString, imageSrc]);

  useEffect(() => {
    if (!imageSrc || failedImagesCache.has(imageSrc)) {
      setStatus("error");
      return;
    }

    if (imageSrc.startsWith("data:")) {
      setStatus("success");
      return;
    }

    const img = new Image();

    const handleLoad = () => setStatus("success");
    const handleError = () => {
      failedImagesCache.add(imageSrc);
      setStatus("error");
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);
    img.src = imageSrc;

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [imageSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.preventDefault();
    if (imageSrc) failedImagesCache.add(imageSrc);
    setStatus("error");
    props.onError?.(e);
  };

  const { src, alt, style, className, onError, ...rest } = props;

  if (status === "error" || !imageSrc) {
    return (
      <div
        className={`inline-block bg-gray-50 text-center align-middle ${className ?? ""}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt="Image not available"
            className="opacity-30 w-16 h-16 object-contain"
          />
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div
        className={`inline-block bg-gray-50 text-center align-middle animate-pulse ${className ?? ""}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-8 h-8 opacity-20 rounded-full bg-gray-300" />
        </div>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
      loading="lazy"
    />
  );
}
