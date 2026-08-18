import { Anchor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const Vision = () => {
  const { t } = useLanguage();

  return (
    <section
      id="vision"
      data-testid="vision-section"
      className="relative overflow-hidden bg-navy py-24 lg:py-32"
    >
      <Anchor
        className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rotate-12 text-white/[0.04]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        <ChapterHeading number={t.vision.number} title={t.vision.chapter} dark />

        <div className="mt-14 grid gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div data-testid="vision-block" className="border-l-2 border-gold pl-7">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                {t.vision.visiTitle}
              </h3>
              <p className="mt-6 font-display text-2xl italic leading-snug text-white sm:text-3xl">
                &ldquo;{t.vision.visi}&rdquo;
              </p>
            </div>
          </Reveal>

          <div data-testid="mission-block">
            <Reveal delay={0.1}>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                {t.vision.misiTitle}
              </h3>
            </Reveal>
            <ol className="mt-8 space-y-6">
              {t.vision.misi.map((item, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <li data-testid={`mission-item-${i}`} className="group flex items-start gap-5">
                    <span className="font-display text-xl font-bold italic text-gold/80 transition-colors duration-300 group-hover:text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 translate-y-3.5 bg-white/20 transition-[width,background-color] duration-300 group-hover:w-10 group-hover:bg-gold/60" aria-hidden="true" />
                    <p className="flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
                      {item}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
