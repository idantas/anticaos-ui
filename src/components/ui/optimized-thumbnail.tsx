"use client";

import { useState, useCallback } from "react";

interface OptimizedThumbnailProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
}

/**
 * Thumbnail que usa a API de otimização para comprimir sem alterar proporção.
 * Mantém a proporção natural da imagem e reduz o peso via compressão.
 * Fallback para URL original em caso de erro.
 */
export function OptimizedThumbnail({
  src,
  alt,
  className,
  onError,
  ...rest
}: OptimizedThumbnailProps) {
  const [useOriginal, setUseOriginal] = useState(false);
  const [errored, setErrored] = useState(false);

  const optimizedSrc =
    useOriginal || errored
      ? src
      : `/api/optimize-image?url=${encodeURIComponent(src)}`;

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!useOriginal && !errored) {
        setUseOriginal(true);
      } else {
        setErrored(true);
        onError?.(e);
      }
    },
    [useOriginal, errored, onError]
  );

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...rest}
    />
  );
}
