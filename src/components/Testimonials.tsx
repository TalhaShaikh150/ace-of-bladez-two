import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./ui";

const reviews = [
  { name: "Marcus T.", role: "Software Engineer", text: "I've been to 'premium' barbershops that charge double and deliver half. Ace is the first place my fade has ever been perfect two weeks later. I'm a lifer now.", cut: "Skin fade + beard" },
  { name: "Daniel R.", role: "Attorney", text: "Booked at 3:52, in the chair at 4:00, out at 4:45 looking like I'd just stepped off a magazine shoot. That reliability alone is worth it.", cut: "Executive cut" },
  { name: "Jordan K.", role: "Creative Director", text: "The hot towel shave is genuinely the best 30 minutes of my month. The attention to detail is on another level — they even fixed a cowlick I've had since I was 12.", cut: "Hot towel shave" },
  { name: "Andre W.", role: "Groom, 2024", text: "Took my entire groomsmen party of 8. Every single guy walked out looking sharp, and the photos prove it. Couldn't have asked for a better wedding morning.", cut: "Groom package" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % reviews.length), 5500);
    return () => clearInterval(id);
  }, [paused]);

  const r = reviews[i];

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink-2/50 py-24 sm:py-32" aria-labelledby="reviews-title">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-gold/8 blur-[130px]" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Reviews" title="Don't take our word." accent="Take theirs." />

        <div
          className="relative mx-auto mt-16 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <Quote className="absolute right-8 top-8 h-20 w-20 text-gold/10" aria-hidden />
            <div className="flex items-center gap-1 text-gold" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, k) => (
                <motion.span key={k} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 * k, type: "spring" }}>
                  <Star className="h-5 w-5 fill-current" />
                </motion.span>
              ))}
            </div>
            <div className="relative mt-6 min-h-[160px] sm:min-h-[130px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-display text-xl leading-relaxed text-cream sm:text-2xl lg:text-[1.75rem]">"{r.text}"</p>
                  <footer className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-gold-2 to-gold-3 font-bold text-ink">{r.name[0]}</span>
                      <div>
                        <p className="font-semibold text-cream">{r.name}</p>
                        <p className="text-xs text-cream/50">{r.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium text-gold">{r.cut}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Choose review">
              {reviews.map((_, k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={k === i}
                  aria-label={`Review ${k + 1}`}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setI((i - 1 + reviews.length) % reviews.length)} aria-label="Previous review" className="glass grid h-10 w-10 place-items-center rounded-full text-cream transition hover:border-gold/40 hover:text-gold">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setI((i + 1) % reviews.length)} aria-label="Next review" className="glass grid h-10 w-10 place-items-center rounded-full text-cream transition hover:border-gold/40 hover:text-gold">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
