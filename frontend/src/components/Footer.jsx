import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import { WHATSAPP_URL } from "@/i18n";

const Footer = () => {
  const { t } = useLanguage();
  const lenis = useLenis();

  const goTo = (id) => {
    if (lenis) lenis.scrollTo(id, { offset: -70, duration: 1.2 });
    else document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { id: "#about", label: t.nav.about, testid: "footer-link-about" },
    { id: "#vision", label: t.nav.vision, testid: "footer-link-vision" },
    { id: "#services", label: t.nav.services, testid: "footer-link-services" },
    { id: "#why", label: t.nav.why, testid: "footer-link-why" },
  ];

  return (
    <footer id="contact" data-testid="footer" className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-white p-1.5">
                <img src="/assets/logo.jpeg" alt="Logo CV Trinita Bahana Persada" className="h-10 w-auto" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-base font-bold tracking-wide">TRINITA</div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  Bahana Persada
                </div>
              </div>
            </div>
            <p data-testid="footer-desc" className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {t.footer.desc}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  data-testid="footer-whatsapp-link"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/75 transition-colors duration-300 hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  +62 812 6114 7333
                </a>
              </li>
              <li>
                <a
                  data-testid="footer-email-link"
                  href="mailto:admin@trinitabp.com"
                  className="group flex items-center gap-3 text-white/75 transition-colors duration-300 hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                  admin@trinitabp.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/75" data-testid="footer-website">
                <Globe className="h-4 w-4 text-gold" aria-hidden="true" />
                www.trinitabp.com
              </li>
              <li className="flex items-start gap-3 text-white/75" data-testid="footer-location">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="leading-relaxed">
                  Jalan Raya Bekasi Barat No. 14, RT 4/RW 2, Kel. Rawabunga, Kec. Jatinegara, Jakarta Timur 13350
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
              {t.footer.linksTitle}
            </h3>
            <ul className="mt-6 space-y-3 text-sm">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    data-testid={link.testid}
                    onClick={() => goTo(link.id)}
                    className="text-white/75 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/45 sm:flex-row sm:px-10 lg:px-20">
          <span data-testid="footer-rights">
            &copy; 2026 {t.footer.rights}
          </span>
          <span className="font-display italic text-gold/70">Since 2014</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
