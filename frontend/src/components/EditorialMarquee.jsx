import Marquee from "react-fast-marquee";
import { Anchor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const EditorialMarquee = () => {
  const { t } = useLanguage();

  return (
    <div
      data-testid="editorial-marquee"
      className="border-y border-gold/25 bg-navy-950 py-7"
      aria-hidden="true"
    >
      <Marquee speed={25} gradient={false} pauseOnHover>
        {t.marquee.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-10 font-display text-2xl italic text-white/85 md:text-3xl">
              {item}
            </span>
            <Anchor className="h-4 w-4 text-gold" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default EditorialMarquee;
