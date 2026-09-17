"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

type HeroBackgroundProps = {
  video?: string;
  poster?: string;
};

/**
 * Layered hero background: an optional muted looping video (or an animated fallback of
 * drifting ALX pattern tiles + soft colour glows), a navy gradient overlay for text
 * contrast, and a faint grain texture. Everything here is decorative (aria-hidden).
 * Motion is paused/frozen under prefers-reduced-motion.
 */
export function HeroBackground({ video, poster }: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reducedMotion || !playing) v.pause();
    else v.play().catch(() => {});
  }, [reducedMotion, playing]);

  // Slight parallax as the hero scrolls out from under the next section.
  useEffect(() => {
    if (reducedMotion) return;
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
        if (layerRef.current) {
          layerRef.current.style.transform = `translate3d(0, ${progress * 60}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        {video ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-70"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
          />
        ) : (
          <FallbackLayers />
        )}
      </div>

      {/* Navy gradient overlay for AA text contrast */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

      {/* Subtle grain texture */}
      <div aria-hidden="true" className="hero-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {video && (
        <button
          type="button"
          onClick={() => setPlaying((prev) => !prev)}
          className="absolute right-4 bottom-24 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:bottom-6"
          aria-label={playing ? "Pause background video" : "Play background video"}
        >
          {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5" aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

function FallbackLayers() {
  return (
    <div className="absolute inset-0">
      {/* Soft blurred colour glows */}
      <div aria-hidden="true" className="absolute -top-32 -left-24 size-[420px] rounded-full bg-blue/30 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/3 -right-24 size-[380px] rounded-full bg-purple/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 left-1/4 size-[360px] rounded-full bg-green/20 blur-3xl" />

      {/* Drifting ALX pattern tiles */}
      <Image
        src="/brand/patterns/Group-459.png"
        alt=""
        aria-hidden="true"
        width={260}
        height={260}
        className="motion-safe:[animation:float-slow_11s_ease-in-out_infinite] absolute top-16 right-[6%] size-40 rounded-card object-cover opacity-20 sm:size-56"
      />
      <Image
        src="/brand/patterns/Group-407.png"
        alt=""
        aria-hidden="true"
        width={220}
        height={220}
        style={{ animationDelay: "1.5s" }}
        className="motion-safe:[animation:float-slow_13s_ease-in-out_infinite] absolute bottom-10 left-[6%] size-32 rounded-card object-cover opacity-15 sm:size-48"
      />
      <Image
        src="/brand/patterns/Group-461.png"
        alt=""
        aria-hidden="true"
        width={180}
        height={180}
        style={{ animationDelay: "3s" }}
        className="motion-safe:[animation:float-slow_15s_ease-in-out_infinite] absolute top-1/2 left-[42%] hidden size-28 rounded-card object-cover opacity-10 md:block"
      />
    </div>
  );
}
