"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { cn } from "../../lib/utils";

export interface InfiniteGridItem {
  id: string;
  src: string;
  alt?: string;
  href?: string;
}

export interface InfiniteGridProps {
  items: InfiniteGridItem[];
  /** Image width in pixels */
  imageWidth?: number;
  /** Image height in pixels */
  imageHeight?: number;
  /** Gap between images in pixels */
  gap?: number;
  /** Movement speed multiplier (higher = faster) */
  speed?: number;
  /** Hover magnification scale */
  hoverScale?: number;
  /** Magnification radius in pixels */
  magnificationRadius?: number;
  /** Spring stiffness for smooth movement */
  springStiffness?: number;
  /** Spring damping for smooth movement */
  springDamping?: number;
  /** Background color */
  backgroundColor?: string;
  /** Additional className */
  className?: string;
  /** Callback when an image is clicked */
  onItemClick?: (item: InfiniteGridItem) => void;
  /** Show edge gradients */
  showEdgeGradients?: boolean;
}

interface GridCell {
  item: InfiniteGridItem;
  row: number;
  col: number;
  key: string;
}

// Individual grid item component with magnification effect
const GridItemComponent = React.memo(function GridItemComponent({
  cell,
  imageWidth,
  imageHeight,
  mousePosition,
  containerOffset,
  magnificationRadius,
  hoverScale,
  onItemClick,
}: {
  cell: GridCell;
  imageWidth: number;
  imageHeight: number;
  mousePosition: { x: number; y: number } | null;
  containerOffset: { x: number; y: number };
  magnificationRadius: number;
  hoverScale: number;
  onItemClick?: (item: InfiniteGridItem) => void;
}) {
  const { item, row, col, key } = cell;

  // Calculate cell center position
  const cellCenterX = col * (imageWidth + 20) + imageWidth / 2 + containerOffset.x;
  const cellCenterY = row * (imageHeight + 20) + imageHeight / 2 + containerOffset.y;

  // Calculate scale based on distance from mouse
  let scale = 1;
  if (mousePosition) {
    const dx = mousePosition.x - cellCenterX;
    const dy = mousePosition.y - cellCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < magnificationRadius) {
      // Smooth falloff using cosine
      const normalizedDistance = distance / magnificationRadius;
      const scaleFactor = (1 + Math.cos(normalizedDistance * Math.PI)) / 2;
      scale = 1 + (hoverScale - 1) * scaleFactor;
    }
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg",
        item.href || onItemClick ? "cursor-pointer" : ""
      )}
      style={{
        width: imageWidth,
        height: imageHeight,
      }}
      animate={{
        scale,
        zIndex: scale > 1.05 ? 10 : 1,
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 30 },
      }}
      onClick={() => {
        if (item.href) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        }
        onItemClick?.(item);
      }}
      whileHover={{ 
        filter: "brightness(1.1)",
      }}
    >
      <img
        src={item.src}
        alt={item.alt || ""}
        className="h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
    </motion.div>
  );
});

export function InfiniteGrid({
  items,
  imageWidth = 200,
  imageHeight = 150,
  gap = 20,
  speed = 0.15,
  hoverScale = 1.15,
  magnificationRadius = 200,
  springStiffness = 50,
  springDamping = 20,
  backgroundColor = "transparent",
  className,
  onItemClick,
  showEdgeGradients = true,
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [containerOffset, setContainerOffset] = useState({ x: 0, y: 0 });

  // Calculate grid dimensions
  const cellWidth = imageWidth + gap;
  const cellHeight = imageHeight + gap;

  // How many cells we need to fill the screen + buffer
  const cols = useMemo(() => {
    if (containerSize.width === 0) return 5;
    return Math.ceil(containerSize.width / cellWidth) + 4;
  }, [containerSize.width, cellWidth]);

  const rows = useMemo(() => {
    if (containerSize.height === 0) return 5;
    return Math.ceil(containerSize.height / cellHeight) + 4;
  }, [containerSize.height, cellHeight]);

  // Total grid dimensions
  const gridWidth = cols * cellWidth;
  const gridHeight = rows * cellHeight;

  // Spring animations for smooth cursor following
  const springConfig = { stiffness: springStiffness, damping: springDamping };
  const springX = useSpring(0.5, springConfig);
  const springY = useSpring(0.5, springConfig);

  // Transform mouse position to grid offset
  const offsetX = useTransform(springX, (x) => {
    const maxOffset = gridWidth - containerSize.width;
    return -x * maxOffset - cellWidth;
  });

  const offsetY = useTransform(springY, (y) => {
    const maxOffset = gridHeight - containerSize.height;
    return -y * maxOffset - cellHeight;
  });

  // Subscribe to offset changes for magnification calculation
  useEffect(() => {
    const unsubX = offsetX.on("change", (x) => {
      setContainerOffset((prev) => ({ ...prev, x }));
    });
    const unsubY = offsetY.on("change", (y) => {
      setContainerOffset((prev) => ({ ...prev, y }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [offsetX, offsetY]);

  // Update container size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Store actual pixel position for magnification effect
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      springX.set(x * speed + (1 - speed) / 2);
      springY.set(y * speed + (1 - speed) / 2);
    },
    [speed, springX, springY]
  );

  // Handle mouse leave - return to center
  const handleMouseLeave = useCallback(() => {
    springX.set(0.5);
    springY.set(0.5);
    setMousePosition(null);
  }, [springX, springY]);

  // Generate grid items (repeat pattern to fill grid)
  const gridItems = useMemo(() => {
    if (items.length === 0) return [];

    const result: GridCell[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const itemIndex = (row * cols + col) % items.length;
        result.push({
          item: items[itemIndex],
          row,
          col,
          key: `${row}-${col}`,
        });
      }
    }

    return result;
  }, [items, rows, cols]);

  if (items.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-muted-foreground",
          className
        )}
        style={{ backgroundColor }}
      >
        No items to display
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute"
        style={{
          x: offsetX,
          y: offsetY,
          width: gridWidth,
          height: gridHeight,
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${imageWidth}px)`,
            gridTemplateRows: `repeat(${rows}, ${imageHeight}px)`,
            gap: `${gap}px`,
          }}
        >
          {gridItems.map((cell) => (
            <GridItemComponent
              key={cell.key}
              cell={cell}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              mousePosition={mousePosition}
              containerOffset={containerOffset}
              magnificationRadius={magnificationRadius}
              hoverScale={hoverScale}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </motion.div>

      {/* Gradient overlays for seamless edges */}
      {showEdgeGradients && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-24"
            style={{
              background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background: `linear-gradient(to top, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className="absolute inset-y-0 left-0 w-24"
            style={{
              background: `linear-gradient(to right, ${backgroundColor}, transparent)`,
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24"
            style={{
              background: `linear-gradient(to left, ${backgroundColor}, transparent)`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default InfiniteGrid;
