import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import { useQuote } from "@/context/QuoteContext";

const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { setOpen } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    if (lenis) lenis.scrollTo(id, { offset: -70, duration: 1.2 });
    else document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { id: "#about", label: t.nav.about, testid: "nav-link-about" },
    { id: "#vision", label: t.nav.vision, testid: "nav-link-vision" },
    { id: "#services", label: t.nav.services, testid: "nav-link-services" },
    { id: "#why", label: t.nav.why, testid: "nav-link-why" },
    { id: "#contact", label: t.nav.contact, testid: "nav-link-contact" },
  ];

  const textColor = scrolled ? "text-navy" : "text-white";

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-white/85 shadow-[0_8px_32px_rgba(0,43,91,0.10)] backdrop-blur-xl"
          : "bg-gradient-to-b from-navy-950/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          data-testid="nav-logo-button"
          onClick={() => goTo("#home")}
          className="flex items-center gap-3"
          aria-label="Trinita Bahana Persada - Home"
        >
          <span className="rounded-md bg-white p-1.5 shadow-sm">
            <img src="/assets/logo.jpeg" alt="Logo CV Trinita Bahana Persada" className="h-9 w-auto" />
          </span>
          <span className={`hidden flex-col leading-tight md:flex ${textColor}`}>
            <span className="font-display text-sm font-bold tracking-wide">TRINITA</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] opacity-70">
              Bahana Persada
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.id}
              data-testid={link.testid}
              onClick={() => goTo(link.id)}
              className={`group relative text-[13px] font-semibold tracking-wide transition-colors duration-300 ${textColor} hover:text-gold`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" aria-hidden="true" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            data-testid="language-toggle"
            className={`flex items-center rounded-full border p-0.5 text-[11px] font-bold ${
              scrolled ? "border-navy/20" : "border-white/30"
            }`}
          >
            {["id", "en"].map((l) => (
              <button
                key={l}
                data-testid={`lang-${l}`}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors duration-300 ${
                  lang === l
                    ? "bg-gold text-navy-950"
                    : scrolled
                      ? "text-navy/60 hover:text-navy"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            data-testid="nav-quote-button"
            onClick={() => setOpen(true)}
            className="group hidden items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-[13px] font-bold text-navy-950 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-light sm:flex"
          >
            {t.nav.quote}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>

          <button
            data-testid="nav-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden ${textColor}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map((link) => (
                <button
                  key={link.id}
                  data-testid={`mobile-${link.testid}`}
                  onClick={() => goTo(link.id)}
                  className="py-2.5 text-left text-sm font-semibold text-navy transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </button>
              ))}
              <button
                data-testid="mobile-quote-button"
                onClick={() => {
                  setMenuOpen(false);
                  setOpen(true);
                }}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy-950"
              >
                {t.nav.quote}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
