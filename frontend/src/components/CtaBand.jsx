import { ArrowUpRight, MessageCircle, Waves } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useQuote } from "@/context/QuoteContext";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP_URL } from "@/i18n";

const CtaBand = () => {
  const { t } = useLanguage();
  const { setOpen } = useQuote();

  return (
    <section
      data-testid="cta-section"
      className="relative overflow-hidden bg-navy py-24 lg:py-32"
    >
      <Waves
        className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 -rotate-12 text-white/[0.04]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-10">
        <Reveal>
          <h2
            data-testid="cta-title"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p data-testid="cta-desc" className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {t.cta.desc}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              data-testid="cta-quote-button"
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy-950 shadow-[0_12px_40px_rgba(200,155,60,0.35)] transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-gold-light"
            >
              {t.cta.quote}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
            <a
              data-testid="cta-whatsapp-button"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/35 px-8 py-4 text-sm font-bold text-white transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.cta.wa}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBand;
