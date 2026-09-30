import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...(fadeUp.show as object), transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
      <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_var(--color-gold)]" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={cn("mx-auto max-w-3xl", align === "center" ? "text-center" : "text-left mx-0")}
    >
      <motion.div variants={fadeUp}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2 variants={fadeUp} className="mt-5 font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
        {title} {accent && <em className="text-gradient not-italic">{accent}</em>}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-cream/60 sm:text-lg">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export function GoldButton({ children, href = "#book", className, size = "md" }: { children: ReactNode; href?: string; className?: string; size?: "md" | "lg" }) {
  return (
    <a
      href={href}
      className={cn(
        "btn-gold group inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}

export function GhostButton({ children, href = "#", className }: { children: ReactNode; href?: string; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "glass group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        className,
      )}
    >
      {children}
    </a>
  );
}
