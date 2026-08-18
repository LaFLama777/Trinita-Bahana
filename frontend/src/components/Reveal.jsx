import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 32 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const ChapterHeading = ({ number, title, dark = false }) => (
  <Reveal>
    <div className="flex items-center gap-4" data-testid={`chapter-${number}`}>
      <span className="font-display text-sm italic text-gold">{number}</span>
      <span className="h-px w-10 bg-gold" aria-hidden="true" />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${
          dark ? "text-white/70" : "text-navy/70"
        }`}
      >
        {title}
      </span>
    </div>
  </Reveal>
);
