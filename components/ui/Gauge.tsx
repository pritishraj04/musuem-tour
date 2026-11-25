"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GaugeProps {
  orientation?: "arc" | "linear";
  value: number; // 0 to 100
  centerValue?: number | string;
  defaultLabel?: string;
  totalNotches?: number;
  spacing?: number; // spacing %
  notchCornerRadius?: number;
  notchWidthPercent?: number;
  startAngle?: number; // degrees, default 135
  endAngle?: number; // degrees, default 405
  linearHeight?: number;
  useGradient?: boolean;
  activeGradient?: [string, string];
  inactiveGradient?: [string, string];
  activeFill?: string;
  inactiveFill?: string;
  activeFillOpacity?: number;
  inactiveFillOpacity?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Gauge({
  orientation = "arc",
  value,
  centerValue,
  defaultLabel,
  totalNotches = 36,
  spacing = 25,
  notchCornerRadius = 3,
  startAngle = 135,
  endAngle = 405,
  linearHeight = 24,
  activeFill = "var(--primary, #f0d7ff)",
  inactiveFill = "var(--border, #1a1a1a)",
  activeFillOpacity = 1,
  inactiveFillOpacity = 0.3,
  prefix = "",
  suffix = "",
  className,
}: GaugeProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));
  const activeCount = Math.round((clampedValue / 100) * totalNotches);

  if (orientation === "linear") {
    return (
      <div className={cn("w-full flex flex-col gap-2", className)}>
        {defaultLabel || centerValue !== undefined ? (
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground">
            {defaultLabel ? <span>{defaultLabel}</span> : <div />}
            {centerValue !== undefined ? (
              <span>
                {prefix}
                {centerValue}
                {suffix}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Linear Notched Track */}
        <div 
          className="w-full flex items-center justify-between gap-1 p-1 rounded-2xl bg-card border-2 border-border"
          style={{ height: `${linearHeight + 8}px` }}
        >
          {Array.from({ length: totalNotches }).map((_, i) => {
            const isActive = i < activeCount;
            return (
              <motion.div
                key={i}
                initial={{ scaleY: 0.5, opacity: 0 }}
                animate={{ scaleY: 1, opacity: isActive ? activeFillOpacity : inactiveFillOpacity }}
                transition={{ delay: i * 0.015, duration: 0.2 }}
                className="flex-1 h-full"
                style={{
                  borderRadius: `${notchCornerRadius}px`,
                  backgroundColor: isActive ? activeFill : inactiveFill,
                  border: isActive ? "1px solid var(--border)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Radial Arc Notch Gauge
  const cx = 150;
  const cy = 150;
  const rOuter = 130;
  const rInner = 100;
  const sweepAngle = endAngle - startAngle;

  // Calculate notches geometry
  const notches = Array.from({ length: totalNotches }).map((_, i) => {
    const isActive = i < activeCount;
    const fraction = totalNotches > 1 ? i / (totalNotches - 1) : 0;
    const angleDeg = startAngle + fraction * sweepAngle;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Polar to Cartesian
    const x1 = cx + rInner * Math.cos(angleRad);
    const y1 = cy + rInner * Math.sin(angleRad);
    const x2 = cx + rOuter * Math.cos(angleRad);
    const y2 = cy + rOuter * Math.sin(angleRad);

    return {
      index: i,
      isActive,
      x1,
      y1,
      x2,
      y2,
      angleDeg,
    };
  });

  return (
    <div className={cn("relative flex flex-col items-center justify-center w-full max-w-[280px] mx-auto", className)}>
      <svg viewBox="0 0 300 300" className="w-full h-auto overflow-visible">
        {/* Render Notch Ticks */}
        <g>
          {notches.map((n) => (
            <motion.line
              key={n.index}
              x1={n.x1}
              y1={n.y1}
              x2={n.x2}
              y2={n.y2}
              stroke={n.isActive ? activeFill : inactiveFill}
              strokeWidth={Math.max(3, (360 / totalNotches) * (1 - spacing / 100))}
              strokeLinecap={notchCornerRadius > 0 ? "round" : "butt"}
              strokeOpacity={n.isActive ? activeFillOpacity : inactiveFillOpacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: n.isActive ? activeFillOpacity : inactiveFillOpacity }}
              transition={{ delay: n.index * 0.015, duration: 0.2 }}
            />
          ))}
        </g>
      </svg>

      {/* Center Label Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pt-2">
        {centerValue !== undefined ? (
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground leading-none tracking-tight"
          >
            {prefix}
            {centerValue}
            {suffix}
          </motion.span>
        ) : null}

        {defaultLabel ? (
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1.5">
            {defaultLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
