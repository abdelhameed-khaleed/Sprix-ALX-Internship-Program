"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Award, Medal, Trophy } from "lucide-react";
import type { Standing } from "@/lib/leaderboard";
import { cx } from "@/components/ui";
import { PointsCounter } from "./PointsCounter";
import styles from "./fire.module.css";

type PodiumProps = {
  /** Ranked learners; only ranks 1–3 are shown here. */
  entries: Standing[];
};

type RankConfig = {
  rank: 1 | 2 | 3;
  label: string;
  Icon: typeof Trophy;
  cardClass: string;
  /** Step block under the card: descending height so 1st → 2nd → 3rd reads left to right. */
  stepClass: string;
  /** Card size: 1st is the biggest box, then 2nd, then 3rd. */
  sizeClass: string;
  nameTextClass: string;
  pointsTextClass: string;
  iconTileClass: string;
  auraClass: string;
};

const rankConfigs: RankConfig[] = [
  {
    rank: 1,
    label: "1st Place",
    Icon: Trophy,
    cardClass: "bg-jasmine border-sun/50 shadow-e3",
    stepClass: "md:h-40 bg-navy",
    sizeClass: "min-h-80 p-8 md:min-h-[26rem]",
    nameTextClass: "text-2xl sm:text-3xl",
    pointsTextClass: "text-6xl sm:text-7xl",
    iconTileClass: "bg-sun/40 text-navy size-12",
    auraClass: styles.fireAura,
  },
  {
    rank: 2,
    label: "2nd Place",
    Icon: Medal,
    cardClass: "bg-icy border-line shadow-e2",
    stepClass: "md:h-28 bg-blue",
    sizeClass: "min-h-64 p-6 md:min-h-[21rem]",
    nameTextClass: "text-xl sm:text-2xl",
    pointsTextClass: "text-5xl sm:text-6xl",
    iconTileClass: "bg-sky text-navy size-11",
    auraClass: styles.icyAura,
  },
  {
    rank: 3,
    label: "3rd Place",
    Icon: Award,
    cardClass: "bg-lavender border-line shadow-e1",
    stepClass: "md:h-16 bg-purple",
    sizeClass: "min-h-52 p-5 md:min-h-[17rem]",
    nameTextClass: "text-lg sm:text-xl",
    pointsTextClass: "text-4xl sm:text-5xl",
    iconTileClass: "bg-purple/20 text-navy size-11",
    auraClass: styles.lavenderAura,
  },
];

/** Fires once the referenced element scrolls into view; stays true afterwards. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function PodiumTile({ config, learners, delayMs, inView }: { config: RankConfig; learners: Standing[]; delayMs: number; inView: boolean }) {
  const { Icon } = config;
  const isTied = learners.length > 1;
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  const tiltStyle: CSSProperties = tilt ? { transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` } : {};

  return (
    <li className={cx(styles.riser, "flex flex-col")} data-in={inView || undefined} style={{ transitionDelay: `${delayMs}ms` }}>
      <div
        className={cx("relative flex flex-col rounded-card border text-navy", config.sizeClass, config.cardClass, styles.tile, config.rank === 1 && styles.tileFirst)}
        style={tiltStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt(null)}
      >
        <span aria-hidden="true" className={cx(styles.aura, config.auraClass)} />
        {config.rank === 1 && (
          <>
            <span aria-hidden="true" className={styles.embers}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className={styles.ember} style={{ animationDelay: `${i * 0.35}s`, left: `${10 + i * 14}%` }} />
              ))}
            </span>
            <span aria-hidden="true" className={styles.sweep} />
          </>
        )}

        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
            {config.label}
            {isTied && " (tie)"}
          </span>
          <div className={cx("flex items-center justify-center rounded-full", config.iconTileClass, config.rank === 1 && styles.iconBounce)} aria-hidden="true">
            <Icon className="size-6 text-navy" />
          </div>
        </div>

        <div className="relative z-10 mt-6 divide-y divide-navy/15">
          {learners.map((learner) => (
            <div key={learner.name} className="py-2 first:pt-0 last:pb-0">
              <h3 className={cx("truncate font-bold text-navy", config.nameTextClass)} title={learner.name}>
                {learner.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <PointsCounter value={learner.points} play={inView} className={cx("font-light tracking-tight text-navy", config.pointsTextClass)} />
                <span className="text-xs font-bold tracking-wider text-navy/70 uppercase">pts</span>
              </div>
              {learner.badge && (
                <span className="mt-2 inline-flex rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">{learner.badge}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Podium step with the place number: tallest for 1st, descending to the right (md+ only). */}
      <div
        aria-hidden="true"
        className={cx("mt-3 hidden items-start justify-center rounded-t-card pt-3 text-4xl font-bold text-white md:flex", config.stepClass)}
      >
        {config.rank}
      </div>
    </li>
  );
}

/**
 * Top-3 podium shown strictly in rank order: 1st, 2nd, 3rd from left to right (top to bottom
 * on mobile), with step heights descending so the order is obvious at a glance.
 */
export function Podium({ entries }: PodiumProps) {
  const { ref, inView } = useInView<HTMLOListElement>();

  const places = rankConfigs
    .map((config) => ({ config, learners: entries.filter((e) => e.rank === config.rank) }))
    .filter((place) => place.learners.length > 0);

  if (places.length === 0) return null;

  return (
    <ol ref={ref} aria-label="Top 3, in order" className="grid grid-cols-1 items-end gap-6 md:grid-cols-[1.3fr_1fr_0.8fr]">
      {places.map(({ config, learners }, idx) => (
        <PodiumTile key={config.rank} config={config} learners={learners} delayMs={idx * 130} inView={inView} />
      ))}
    </ol>
  );
}
