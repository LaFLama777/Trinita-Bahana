import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useQuote } from "@/context/QuoteContext";
import { WHATSAPP_URL } from "@/i18n";

const HERO_IMG =
  "https://images.pexels.com/photos/14810115/pexels-photo-14810115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Hero = () => {
  const { t, lang } = useLanguage();
  const { setOpen } = useQuote();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy-950"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110" aria-hidden="true">
        <img src={HERO_IMG} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/80 to-navy-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 w-full px-6 pb-28 pt-36 sm:px-10 lg:px-20"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-9 flex items-center gap-4"
          >
            <span className="rounded-lg bg-white p-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <img
                src="/assets/logo.jpeg"
                alt="Logo CV Trinita Bahana Persada"
                className="h-14 w-auto sm:h-16"
                data-testid="hero-logo"
              />
            </span>
            <span className="hidden text-[10px] font-semibold uppercase leading-relaxed tracking-[0.3em] text-white/50 sm:block">
              Marine Supply · Working Gear
              <br />
              Crew Documentation · Visa Services
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-testid="hero-tagline"
            className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-gold sm:text-xs"
          >
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {t.hero.tagline}
          </motion.p>

          <h1
            key={lang}
            data-testid="hero-headline"
            className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t.hero.headlineLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? (
                    <span className="italic text-gold">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            data-testid="hero-description"
            className="mt-7 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-quote-button"
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy-950 shadow-[0_12px_40px_rgba(200,155,60,0.35)] transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-gold-light"
            >
              {t.hero.quote}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
            <a
              data-testid="hero-whatsapp-button"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/35 px-8 py-4 text-sm font-bold text-white transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.hero.wa}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/45"
        aria-hidden="true"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.35em]">{t.hero.scroll}</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Hero;
