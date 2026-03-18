import type React from "react";

/**
 * Shared glassmorphism style object used across glass components.
 * Import this instead of defining it locally in each component.
 */
export const glassStyle: React.CSSProperties = {
  background:
    "linear-gradient(10deg, rgba(255,255,255,0.405) 6.7%, rgba(255,255,255,0.72) 97.09%)",
  backdropFilter: "blur(35.5px)",
  WebkitBackdropFilter: "blur(35.5px)",
  boxShadow: "0px 0px 31.1px 0px rgba(0,0,0,0.25)",
  border: "1px solid #e9e9e9",
  borderRadius: "20px",
};
