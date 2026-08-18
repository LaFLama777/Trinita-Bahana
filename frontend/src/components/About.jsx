import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const ABOUT_IMG =
  "https://images.pexels.com/photos/35458829/pexels-photo-35458829/free-photo-of-sunset-over-bintulu-port-with-crane-and-cargo-ships.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" data-testid="about-section" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <span
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[14rem] font-bold leading-none text-navy/[0.04] lg:text-[20rem]"
        aria-hidden="true"
      >
        {t.about.number}
      </span>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        <ChapterHeading number={t.about.number} title={t.about.chapter} />

        <div className="mt-12 grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                data-testid="about-title"
                className="font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl"
              >
                {t.about.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p data-testid="about-p1" className="mt-8 text-base leading-relaxed text-ink/70">
                {t.about.p1}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p data-testid="about-p2" className="mt-5 text-base leading-relaxed text-ink/70">
                {t.about.p2}
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {t.about.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 + i * 0.08}>
                  <div data-testid={`about-stat-${i}`} className="border-l-2 border-gold pl-4">
                    <div className="font-display text-3xl font-bold text-navy lg:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink/50">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,43,91,0.18)]"
            >
              <img
                src={ABOUT_IMG}
                alt="Marine supply operations"
                className="h-full w-full object-cover"
                data-testid="about-image"
              />
              <div className="absolute inset-0 bg-navy/20 mix-blend-multiply" aria-hidden="true" />
            </motion.div>
            <Reveal delay={0.25}>
              <div className="mt-6 w-fit rounded-xl bg-navy px-7 py-5 shadow-[0_16px_48px_rgba(0,43,91,0.35)]">
                <div className="font-display text-lg italic text-gold">Since 2014</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Marine Supply · Maritime Support
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
