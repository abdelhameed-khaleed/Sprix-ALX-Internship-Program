import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { CareerCircleForm } from "@/components/career-circle/CareerCircleForm";

export const metadata: Metadata = {
  title: "Career Circle",
  description: "Choose your two career preferences for Career Circle day.",
};

export default function CareerCirclePage() {
  return (
    <>
      <PageHero
        eyebrow="Career Circle"
        title="Choose your career preferences"
        intro="Pick the two tracks you want to explore on Career Circle day: Software Engineering, Data or Product."
      />
      <Section tone="alt">
        <div className="mx-auto max-w-2xl">
          <CareerCircleForm />
        </div>
      </Section>
    </>
  );
}
