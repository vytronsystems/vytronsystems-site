'use client';

import { useEffect, useMemo, useState } from 'react';

const LABELS = [
  'AI Framework',
  'Data Framework',
  'Automation Framework',
  'Database Infrastructure',
  'MRI Framework',
  'Software Factory',
];

// Icosahedron-like points on a sphere (simplified for performance)
function spherePoints(radius: number, segments: number): Array<{ x: number; y: number; z: number }> {
  const points: Array<{ x: number; y: number; z: number }> = [];
  for (let lat = 0; lat <= segments; lat++) {
    const phi = (lat / segments) * Math.PI;
    const ring = lat === 0 || lat === segments ? 1 : Math.floor(segments * Math.sin(phi)) + 1;
    for (let lng = 0; lng < ring; lng++) {
      const theta = (lng / ring) * Math.PI * 2;
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      });
    }
  }
  return points;
}

function project(p: { x: number; y: number; z: number }, angleY: number): { x: number; y: number; z: number } {
  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);
  const x = p.x * cos - p.z * sin;
  const z = p.x * sin + p.z * cos;
  const s = 160 / (160 + z);
  return { x: x * s, y: p.y * s, z };
}

type HeroNebulaProps = {
  className?: string;
  reducedMotion?: boolean;
  compact?: boolean; // fewer nodes for mobile
};

export default function HeroNebula({ className = '', reducedMotion: reducedMotionProp = false, compact = false }: HeroNebulaProps) {
  const [angle, setAngle] = useState(0);
  const [labelIndex, setLabelIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(reducedMotionProp);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches || reducedMotionProp);
    const handler = () => setReducedMotion(mq.matches || reducedMotionProp);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [reducedMotionProp]);

  const segments = compact ? 4 : 6;
  const radius = 1.2;
  const points = useMemo(() => spherePoints(radius, segments), [segments]);
  const projected = useMemo(() => points.map((p) => project(p, angle)), [points, angle]);

  // Slow rotation
  useEffect(() => {
    if (!mounted || reducedMotion) return;
    const t = setInterval(() => {
      setAngle((a) => a + 0.002);
    }, 20);
    return () => clearInterval(t);
  }, [reducedMotion]);

  // Rotating labels
  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setLabelIndex((i) => (i + 1) % LABELS.length);
    }, 3200);
    return () => clearInterval(t);
  }, [reducedMotion]);

  const centerX = 160;
  const centerY = 160;
  const scale = 120;

  // Edges: connect points that are close (simplified - connect consecutive rings)
  const edges: Array<[number, number]> = [];
  let offset = 0;
  for (let lat = 0; lat <= segments; lat++) {
    const ring = lat === 0 || lat === segments ? 1 : Math.floor(segments * Math.sin((lat / segments) * Math.PI)) + 1;
    for (let lng = 0; lng < ring; lng++) {
      const i = offset + lng;
      const next = offset + ((lng + 1) % ring);
      if (next < points.length) edges.push([i, next]);
      if (lat < segments) {
        const nextRingSize = lat === segments - 1 ? 1 : Math.floor(segments * Math.sin(((lat + 1) / segments) * Math.PI)) + 1;
        const j = offset + ring + Math.floor((lng / ring) * nextRingSize);
        if (j < offset + ring + nextRingSize) edges.push([i, j]);
      }
    }
    offset += ring;
  }

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full max-w-[320px] max-h-[320px] mx-auto opacity-90"
        style={{ filter: 'drop-shadow(0 0 40px rgba(16,185,129,0.12))' }}
      >
        <defs>
          <radialGradient id="nebula-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
            <stop offset="60%" stopColor="rgba(34, 211, 238, 0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Soft glow behind sphere */}
        <ellipse cx={centerX} cy={centerY} rx={100} ry={100} fill="url(#nebula-glow)" />
        {/* Edges */}
        <g stroke="rgba(16, 185, 129, 0.25)" strokeWidth="0.5" fill="none">
          {edges.slice(0, compact ? 30 : undefined).map(([i, j], k) => {
            if (i >= projected.length || j >= projected.length) return null;
            const a = projected[i];
            const b = projected[j];
            if (!a || !b || (a.z + b.z) / 2 < -0.3) return null;
            const opacity = Math.max(0, 0.15 + (a.z + b.z) / 2);
            return (
              <line
                key={k}
                x1={centerX + a.x * scale}
                y1={centerY + a.y * scale}
                x2={centerX + b.x * scale}
                y2={centerY + b.y * scale}
                strokeOpacity={mounted ? opacity : 0}
                className="transition-opacity duration-700"
              />
            );
          })}
        </g>
        {/* Nodes */}
        {projected.map((p, i) => {
          if (p.z < -0.4) return null;
          const size = p.z > 0.3 ? 2.5 : p.z > 0 ? 2 : 1.5;
          const opacity = 0.4 + (p.z + 0.5) * 0.5;
          return (
            <circle
              key={i}
              cx={centerX + p.x * scale}
              cy={centerY + p.y * scale}
              r={size}
              fill="rgba(16, 185, 129, 0.7)"
              fillOpacity={mounted ? opacity : 0}
              className="transition-opacity duration-500"
              style={{ filter: 'url(#glow)' }}
            />
          );
        })}
      </svg>
      {/* Rotating label */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center"
        style={{ textShadow: '0 0 20px rgba(16,185,129,0.4)' }}
      >
        <p
          key={labelIndex}
          className="text-sm font-medium text-emerald-300/90 tabular-nums animate-hero-label"
          style={reducedMotion ? { animation: 'none' } : undefined}
        >
          {LABELS[labelIndex]}
        </p>
      </div>
    </div>
  );
}
