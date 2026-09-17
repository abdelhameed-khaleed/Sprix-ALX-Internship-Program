import type { CSSProperties } from "react";
import { cx } from "@/components/ui";
import styles from "./Timeline3D.module.css";

type Timeline3DProps = {
  total: number;
  activeIndex: number;
  /** Pause the looping animations (set while the timeline is off-screen). */
  paused?: boolean;
};

const PATTERN_TILES = [
  { src: "/brand/patterns/Group-407.png", top: "10%", left: "10%", size: 70, duration: 9 },
  { src: "/brand/patterns/Group-453.png", top: "55%", left: "80%", size: 90, duration: 12 },
  { src: "/brand/patterns/Group-461.png", top: "82%", left: "16%", size: 60, duration: 10.5 },
];

/**
 * Decorative background layer for the program timeline: a receding glowing track with
 * per-week nodes, a travelling light pulse, a drifting grid floor, and faint floating
 * ALX pattern tiles. Purely presentational (aria-hidden); shares `activeIndex` state
 * with the foreground week cards so the scene reacts to the selected week.
 */
export function Timeline3D({ total, activeIndex, paused }: Timeline3DProps) {
  const safeTotal = Math.max(total, 1);
  const depth = safeTotal > 1 ? activeIndex / (safeTotal - 1) : 0;
  const stageStyle = { "--depth": depth } as CSSProperties;

  return (
    <div className={cx(styles.scene, paused && styles.paused)} aria-hidden="true">
      <div className={styles.stage} style={stageStyle}>
        <div className={styles.floor} />
        <div className={styles.track} />

        {Array.from({ length: safeTotal }).map((_, i) => {
          const t = safeTotal > 1 ? i / (safeTotal - 1) : 0;
          const top = 6 + t * 84;
          const isActive = i === activeIndex;
          const scale = (1.25 - t * 0.7) * (isActive ? 1.2 : 1);
          return (
            <span
              key={i}
              className={cx(styles.node, isActive && styles.nodeActive)}
              style={{ top: `${top}%`, transform: `translate(-50%, -50%) scale(${scale})` }}
            />
          );
        })}

        <span className={styles.pulseCarrier} style={{ animationDelay: `${-depth * 2.6}s` }}>
          <span className={styles.pulse} />
        </span>

        {PATTERN_TILES.map((tile, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={tile.src}
            alt=""
            className={styles.tile}
            style={{
              top: tile.top,
              left: tile.left,
              width: tile.size,
              animationDuration: `${tile.duration}s`,
              animationDelay: `${i * -1.4}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.glowActive} style={{ top: `${6 + depth * 84}%` }} />
    </div>
  );
}
