import Image from "next/image";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-16rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 md:py-24">
      <div className="relative z-10 mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold tracking-wide uppercase text-blue">404 Error</p>
        <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Sorry, we couldn&#39;t find the page you&#39;re looking for. It might have moved or the link may be broken.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" variant="primary">
            Return home
          </ButtonLink>
          <ButtonLink href="/program" variant="secondary">
            Explore the program
          </ButtonLink>
        </div>
      </div>

      <Image
        src="/brand/patterns/Group-459.png"
        alt=""
        aria-hidden="true"
        width={320}
        height={320}
        className="pointer-events-none absolute -bottom-16 -right-16 size-64 opacity-15 select-none md:size-80"
      />
    </div>
  );
}
