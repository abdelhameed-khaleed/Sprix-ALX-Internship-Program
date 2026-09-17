import { GraduationCap, Handshake, Rocket } from "lucide-react";
import { Card, IconTile } from "@/components/ui";
import { Reveal } from "@/components/motion/Reveal";
import { outcomes, site } from "@/content/site";
import { StackSection } from "./StackSection";

// IconTile's tone prop isn't exported from ui/index.tsx; this local union mirrors it structurally.
type IconTone = "blue" | "green" | "sun" | "purple" | "navy";

const OUTCOME_STYLE: { icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>; tone: IconTone }[] = [
  { icon: GraduationCap, tone: "blue" },
  { icon: Rocket, tone: "purple" },
  { icon: Handshake, tone: "green" },
];

export function SpecialSauce() {
  return (
    <StackSection id="special-sauce" tone="white" index={1} className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-sm font-semibold tracking-wide text-blue uppercase">What you&#39;ll gain</p>
          <h2 className="text-3xl md:text-4xl">The ALX Special Sauce</h2>
          <p className="mt-4 text-lg text-muted">{site.description}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {outcomes.map((outcome, idx) => {
            const { icon: Icon, tone } = OUTCOME_STYLE[idx] ?? OUTCOME_STYLE[0];
            return (
              <Reveal key={outcome.title} variant="up" delay={idx * 100}>
                <Card interactive className="lift flex h-full flex-col justify-between">
                  <div>
                    <IconTile tone={tone}>
                      <Icon className="size-6 text-navy" aria-hidden />
                    </IconTile>
                    <span className="mt-4 block text-xs font-bold tracking-wider text-blue uppercase">0{idx + 1}</span>
                    <h3 className="mt-2 text-xl font-bold text-navy">{outcome.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{outcome.detail}</p>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </StackSection>
  );
}
