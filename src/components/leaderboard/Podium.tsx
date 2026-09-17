"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Award, Medal, Trophy } from "lucide-react";
import type { RankedEntry } from "@/lib/leaderboard";
import { cx } from "@/components/ui";
import { PointsCounter } from "./PointsCounter";
import styles from "./fire.module.css";

type PodiumProps = {
  entries: RankedEntry[];
};

type RankConfig = {
  rank: number;
  label: string;
  Icon: typeof Trophy;
  cardClass: string;
  orderClass: string;
  pointsTextClass: string;
  iconTileClass: string;
  auraClass?: string;
};

const rankConfigs: Record<number, RankConfig> = {
  1: {
    rank: 1,
    label: "1st Place",
    Icon: Trophy,
    cardClass: "bg-jasmine border-sun/50 shadow-e2 md:shadow-e3 md:-mt-6 md:pb-8",
    orderClass: "order-1 md:order-2",
    pointsTextClass: "text-5xl sm:text-6xl",
    iconTileClass: "bg-sun/40 text-navy size-12",
    auraClass: styles.fireAura,
  },
  2: {
    rank: 2,
    label: "2nd Place",
    Icon: Medal,
    cardClass: "bg-icy border-line shadow-e1",
    orderClass: "order-2 md:order-1",
    pointsTextClass: "text-4xl sm:text-5xl",
    iconTileClass: "bg-sky text-navy size-11",
    auraClass: styles.icyAura,
  },
  3: {
    rank: 3,
    label: "3rd Place",
    Icon: Award,
    cardClass: "bg-lavender border-line shadow-e1",
    orderClass: "order-3 md:order-3",
    pointsTextClass: "text-4xl sm:text-5xl",
    iconTileClass: "bg-purple/20 text-navy size-11",
    auraClass: styles.lavenderAura,
  },
};

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

function PodiumTile({
  config,
  learners,
  delayMs,
  inView,
}: {
  config: RankConfig;
  learners: RankedEntry[];
  delayMs: number;
  inView: boolean;
}) {
  const { Icon } = config;
  const isTied = learners.length > 1;
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  const tiltStyle: CSSProperties = tilt
    ? { transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }
    : {};

  return (
    <div
      className={cx(styles.riser, config.orderClass)}
      data-in={inView || undefined}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div
        className={cx(
          "flex flex-col justify-between rounded-card border p-6 text-navy",
          config.cardClass,
          styles.tile,
          config.rank === 1 && styles.tileFirst,
        )}
        style={tiltStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt(null)}
      >
        {config.auraClass && (
          <span aria-hidden="true" className={cx(styles.aura, config.auraClass)} />
        )}
        {config.rank === 1 && (
          <span aria-hidden="true" className={styles.embers}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={styles.ember}
                style={{ animationDelay: `${i * 0.35}s`, left: `${10 + i * 14}%` }}
              />
            ))}
          </span>
        )}
        {config.rank === 1 && <span aria-hidden="true" className={styles.sweep} />}

        {/* Top row: Rank badge + Icon */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
            {config.label}
            {isTied && " (Tie)"}
          </span>
          <div
            className={cx(
              "flex items-center justify-center rounded-full",
              config.iconTileClass,
              config.rank === 1 && styles.iconBounce,
            )}
            aria-hidden="true"
          >
            <Icon className="size-6 text-navy" />
          </div>
        </div>

        {/* Learners list for this rank */}
        <div className="relative z-10 mt-6 divide-y divide-navy/15">
          {learners.map((learner, idx) => (
            <div key={idx} className={idx > 0 ? "pt-4" : ""}>
              <h3
                className="truncate text-xl font-bold text-navy sm:text-2xl"
                title={learner.name}
              >
                {learner.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-1.5">
                <PointsCounter
                  value={learner.points}
                  play={inView}
                  className={cx("font-light text-navy tracking-tight", config.pointsTextClass)}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-navy/70">
                  pts
                </span>
              </div>

              {learner.badge && (
                <div className="mt-2">
                  <span className="inline-flex rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
                    {learner.badge}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Podium({ entries }: PodiumProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const rank1 = entries.filter((e) => e.rank === 1);
  const rank2 = entries.filter((e) => e.rank === 2);
  const rank3 = entries.filter((e) => e.rank === 3);

  const ranksToRender = [
    { config: rankConfigs[1], learners: rank1 },
    { config: rankConfigs[2], learners: rank2 },
    { config: rankConfigs[3], learners: rank3 },
  ].filter((item) => item.learners.length > 0);

  if (ranksToRender.length === 0) return null;

  return (
    <div ref={ref} className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
      {ranksToRender.map(({ config, learners }, idx) => (
        <PodiumTile
          key={config.rank}
          config={config}
          learners={learners}
          delayMs={idx * 130}
          inView={inView}
        />
      ))}
    </div>
  );
}
