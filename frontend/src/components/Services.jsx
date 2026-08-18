import { Ship, Anchor, HardHat, FileCheck2, Stamp, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useQuote } from "@/context/QuoteContext";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const IMG_SHIP =
  "https://images.pexels.com/photos/14810115/pexels-photo-14810115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const IMG_CREW =
  "https://images.unsplash.com/photo-1748997484521-70c8563e3510?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtYXJpdGltZSUyMGNyZXclMjBzYWlsb3IlMjB1bmlmb3JtfGVufDB8fHx8MTc4NzAyMzU4MXww&ixlib=rb-4.1.0&q=85";
const IMG_VISA =
  "https://images.pexels.com/photos/4922356/pexels-photo-4922356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Services = () => {
  const { t } = useLanguage();
  const { setOpen } = useQuote();

  const icons = [Ship, Anchor, HardHat, FileCheck2, Stamp];
  const images = [null, IMG_SHIP, null, IMG_CREW, IMG_VISA];
  const spans = [
    "md:col-span-4",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
  ];

  return (
    <section
      id="services"
      data-testid="services-section"
      className="bg-mist py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        <ChapterHeading number={t.services.number} title={t.services.chapter} />

        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <h2
              data-testid="services-title"
              className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl lg:text-5xl"
            >
              {t.services.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p data-testid="services-desc" className="max-w-sm text-sm leading-relaxed text-ink/60">
              {t.services.desc}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-6">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            const image = images[i];
            return (
              <Reveal key={item.title} delay={0.08 * i} className={spans[i]}>
                <article
                  data-testid={`service-card-${i}`}
                  className={`group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl border transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 ${
                    image
                      ? "border-navy/10 hover:shadow-[0_24px_56px_rgba(0,43,91,0.28)]"
                      : "border-navy/10 bg-white p-8 hover:shadow-[0_24px_56px_rgba(0,43,91,0.14)]"
                  }`}
                >
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/55 to-navy-900/10 transition-opacity duration-500" aria-hidden="true" />
                      <div className="relative p-7">
                        <span className="font-display text-sm italic text-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-white/75 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-32 group-hover:opacity-100 sm:text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute right-6 top-6 font-display text-5xl font-bold italic text-navy/[0.07] transition-colors duration-500 group-hover:text-gold/25" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="mb-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/[0.06] text-navy transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-950">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-8 font-display text-xl font-bold text-navy sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/60">{item.desc}</p>
                      <span className="mt-5 block h-0.5 w-0 bg-gold transition-[width] duration-500 group-hover:w-16" aria-hidden="true" />
                    </>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <button
              data-testid="services-quote-button"
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full border-2 border-navy px-8 py-3.5 text-sm font-bold text-navy transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white"
            >
              {t.services.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
