import Image from "next/image";
import { cx } from "@/components/ui";

export type LockupProps = {
  size?: "sm" | "md";
  tone?: "light" | "dark";
  priority?: boolean;
  className?: string;
};

export function Lockup({ size = "md", tone = "light", priority = false, className }: LockupProps) {
  const isDark = tone === "dark";
  const isSm = size === "sm";

  const alxSrc = isDark ? "/brand/alx-logo-white.svg" : "/brand/alx-logo.svg";
  const alxWidth = isSm ? 47 : 63;
  const alxHeight = isSm ? 24 : 32;

  const sprixWidth = isSm ? 81 : 112;
  const sprixHeight = isSm ? 16 : 22;

  return (
    <div className={cx("inline-flex items-center gap-2 select-none", className)}>
      <Image
        src={alxSrc}
        alt="ALX"
        width={alxWidth}
        height={alxHeight}
        priority={priority}
        className={cx("shrink-0", isSm ? "h-6 w-auto" : "h-8 w-auto")}
      />
      <span
        aria-hidden="true"
        className={cx("font-bold text-blue", isSm ? "text-xs px-0.5" : "text-sm px-1")}
      >
        ×
      </span>
      {isDark ? (
        <span className={cx("inline-flex items-center rounded-full bg-white", isSm ? "px-1.5 py-0.5" : "px-2 py-0.5")}>
          <Image
            src="/brand/sprix-logo.png"
            alt="SPRIX"
            width={sprixWidth}
            height={sprixHeight}
            priority={priority}
            className={cx("shrink-0", isSm ? "h-4 w-auto" : "h-[22px] w-auto")}
          />
        </span>
      ) : (
        <Image
          src="/brand/sprix-logo.png"
          alt="SPRIX"
          width={sprixWidth}
          height={sprixHeight}
          priority={priority}
          className={cx("shrink-0", isSm ? "h-4 w-auto" : "h-[22px] w-auto")}
        />
      )}
    </div>
  );
}
