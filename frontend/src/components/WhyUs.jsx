import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const WhyUs = () => {
  const { t } = useLanguage();

  return (
    <section id="why" data-testid="why-section" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        <ChapterHeading number={t.why.number} title={t.why.chapter} />

        <Reveal>
          <h2
            data-testid="why-title"
            className="mt-12 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl"
          >
            {t.why.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, i) => (
            <Reveal key={i} delay={0.07 * i}>
              <div
                data-testid={`why-item-${i}`}
                className="group flex h-full items-start gap-4 rounded-xl border border-navy/10 bg-mist/60 p-6 transition-[transform,box-shadow,background-color] duration-400 hover:-translate-y-1 hover:bg-mist hover:shadow-[0_16px_40px_rgba(0,43,91,0.10)]"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-950">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <p className="text-sm font-semibold leading-relaxed text-navy sm:text-base">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
