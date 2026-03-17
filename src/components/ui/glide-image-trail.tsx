"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { cn } from "../../lib/utils";

export interface GlideImageTrailProps {
  /** Array of image URLs to cycle through */
  images: string[];
  /** Container className */
  className?: string;
  /** Image size in pixels */
  imageSize?: number;
  /** Minimum distance cursor must move before spawning new image (pixels) */
  spawnDistance?: number;
  /** Maximum number of images visible at once */
  maxImages?: number;
  /** Image lifetime in milliseconds */
  imageLifetime?: number;
  /** Enable glide/drift effect */
  enableGlide?: boolean;
  /** Glide amount (how far images drift) */
  glideAmount?: number;
  /** Rotation range in degrees (images will rotate randomly within this range) */
  rotationRange?: number;
  /** Enable 3D perspective effect */
  enable3D?: boolean;
  /** Shadow intensity (0-1) */
  shadowIntensity?: number;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Custom enter animation */
  enterAnimation?: "scale" | "fade" | "slide" | "rotate" | "flip";
  /** Custom exit animation */
  exitAnimation?: "scale" | "fade" | "slide" | "rotate" | "dissolve";
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Children content to render inside the container */
  children?: React.ReactNode;
  /** Z-index for images */
  imageZIndex?: number;
  /** Custom render function for each trail item — receives the image src and its index in the images array */
  renderItem?: (src: string, index: number) => React.ReactNode;
}

interface TrailImage {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  glideX: number;
  glideY: number;
  index: number;
}

const enterVariants: Record<string, Variants> = {
  scale: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slide: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  rotate: {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
  },
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
  },
};

const exitVariants: Record<string, Variants> = {
  scale: {
    exit: { scale: 0, opacity: 0 },
  },
  fade: {
    exit: { opacity: 0 },
  },
  slide: {
    exit: { y: -20, opacity: 0 },
  },
  rotate: {
    exit: { scale: 0, rotate: 180, opacity: 0 },
  },
  dissolve: {
    exit: { scale: 1.2, opacity: 0, filter: "blur(10px)" },
  },
};

export function GlideImageTrail({
  images,
  className,
  imageSize = 120,
  spawnDistance = 80,
  maxImages = 12,
  imageLifetime = 1500,
  enableGlide = true,
  glideAmount = 30,
  rotationRange = 15,
  enable3D = false,
  shadowIntensity = 0.3,
  borderRadius = 8,
  enterAnimation = "scale",
  exitAnimation = "fade",
  animationDuration = 0.4,
  children,
  imageZIndex = 10,
  renderItem,
}: GlideImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const lastPositionRef = useRef<{ x: number; y: number } | null>(null);
  const imageIndexRef = useRef(0);
  const idCounterRef = useRef(0);

  // Calculate distance between two points
  const getDistance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);

  // Get random rotation within range
  const getRandomRotation = useCallback(() => {
    return (Math.random() - 0.5) * 2 * rotationRange;
  }, [rotationRange]);

  // Get random glide direction
  const getRandomGlide = useCallback(() => {
    if (!enableGlide) return { x: 0, y: 0 };
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * glideAmount,
      y: Math.sin(angle) * glideAmount,
    };
  }, [enableGlide, glideAmount]);

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || images.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if cursor moved enough distance
      if (lastPositionRef.current) {
        const distance = getDistance(
          lastPositionRef.current.x,
          lastPositionRef.current.y,
          x,
          y
        );

        if (distance < spawnDistance) return;
      }

      lastPositionRef.current = { x, y };

      // Get next image in cycle
      const currentIndex = imageIndexRef.current % images.length;
      const imageSrc = images[currentIndex];
      imageIndexRef.current++;

      // Create new trail image
      const glide = getRandomGlide();
      const newImage: TrailImage = {
        id: idCounterRef.current++,
        src: imageSrc,
        index: currentIndex,
        x: x - imageSize / 2,
        y: y - imageSize / 2,
        rotation: getRandomRotation(),
        scale: 0.9 + Math.random() * 0.2,
        glideX: glide.x,
        glideY: glide.y,
      };

      setTrailImages((prev) => {
        const updated = [...prev, newImage];
        // Limit max images
        if (updated.length > maxImages) {
          return updated.slice(-maxImages);
        }
        return updated;
      });

      // Remove image after lifetime
      setTimeout(() => {
        setTrailImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, imageLifetime);
    },
    [
      images,
      imageSize,
      spawnDistance,
      maxImages,
      imageLifetime,
      getDistance,
      getRandomRotation,
      getRandomGlide,
    ]
  );

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    lastPositionRef.current = null;
  }, []);

  // Combined animation variants
  const getVariants = useMemo((): Variants => {
    return {
      initial: enterVariants[enterAnimation]?.initial || { opacity: 0 },
      animate: enterVariants[enterAnimation]?.animate || { opacity: 1 },
      exit: exitVariants[exitAnimation]?.exit || { opacity: 0 },
    };
  }, [enterAnimation, exitAnimation]);

  // Shadow style based on intensity
  const shadowStyle = useMemo(() => {
    if (shadowIntensity <= 0) return "none";
    const opacity = Math.min(shadowIntensity, 1);
    return `0 10px 30px rgba(0, 0, 0, ${opacity * 0.3}), 0 5px 15px rgba(0, 0, 0, ${opacity * 0.2})`;
  }, [shadowIntensity]);

  if (images.length === 0) {
    return (
      <div className={cn("relative", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: enable3D ? "1000px" : undefined,
      }}
    >
      {/* Trail images layer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: imageZIndex }}
      >
        <AnimatePresence mode="popLayout">
          {trailImages.map((img) => (
            <motion.div
              key={img.id}
              className="absolute"
              style={{
                left: img.x,
                top: img.y,
                width: imageSize,
                height: renderItem ? "auto" : imageSize,
                transformStyle: enable3D ? "preserve-3d" : undefined,
              }}
              variants={getVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: animationDuration,
                ease: "easeOut",
              }}
            >
              <motion.div
                className={renderItem ? "w-full overflow-hidden" : "h-full w-full overflow-hidden"}
                style={{
                  borderRadius,
                  boxShadow: shadowStyle,
                  transform: `rotate(${img.rotation}deg) scale(${img.scale})`,
                }}
                animate={
                  enableGlide
                    ? {
                        x: img.glideX,
                        y: img.glideY,
                      }
                    : undefined
                }
                transition={
                  enableGlide
                    ? {
                        duration: imageLifetime / 1000,
                        ease: "easeOut",
                      }
                    : undefined
                }
              >
                {renderItem ? (
                  renderItem(img.src, img.index)
                ) : (
                  <img
                    src={img.src}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Content layer */}
      <div className="relative" style={{ zIndex: imageZIndex + 1 }}>
        {children}
      </div>
    </div>
  );
}

export default GlideImageTrail;
