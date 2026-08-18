import { Ship, Anchor, HardHat, FileCheck2, Stamp, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useQuote } from "@/context/QuoteContext";
import { Reveal, ChapterHeading } from "@/components/Reveal";

const IMG_MARINE =
  "https://images.pexels.com/photos/6585817/pexels-photo-6585817.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const IMG_CHANDLER =
  "https://images.pexels.com/photos/28447623/pexels-photo-28447623/free-photo-of-securing-container-latches-on-a-cargo-ship.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const IMG_GEAR =
  "https://images.pexels.com/photos/30169171/pexels-photo-30169171/free-photo-of-maritime-worker-in-orange-uniform-on-ship-deck.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const IMG_CREW =
  "https://images.pexels.com/photos/37171408/pexels-photo-37171408/free-photo-of-crew-members-on-a-ship-deck-in-indonesia.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const IMG_VISA =
  "https://images.pexels.com/photos/4922356/pexels-photo-4922356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Services = () => {
  const { t } = useLanguage();
  const { setOpen } = useQuote();

  const icons = [Ship, Anchor, HardHat, FileCheck2, Stamp];
  const images = [IMG_MARINE, IMG_CHANDLER, IMG_GEAR, IMG_CREW, IMG_VISA];
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
                  className="group relative flex h-full min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl border border-navy/10 transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(0,43,91,0.28)]"
                >
                  <img
                    src={image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/55 to-navy-900/10" aria-hidden="true" />
                  <span className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-gold backdrop-blur-md transition-colors duration-500 group-hover:bg-gold group-hover:text-navy-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="absolute right-6 top-6 font-display text-sm italic text-white/60" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative p-7">
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-white/75 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-32 group-hover:opacity-100 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
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
