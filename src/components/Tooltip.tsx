import React from "react";
import type { HeaderTooltip } from "./types";

export const TooltipPortal: React.FC<{ tooltip: HeaderTooltip | null }> = ({
  tooltip,
}) => {
  if (!tooltip) return null;

  const { text, x, y } = tooltip;

  return (
    <div className="tooltip-wrapper" style={{ left: x, top: y }}>
      <div className="tooltip">
        <span className="tooltip-text">{text}</span>
      </div>
    </div>
  );
};
