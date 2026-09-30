import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui";

const times = ["10:00", "11:30", "1:00", "2:30", "4:30", "6:00", "7:30"];

export default function CTA() {
  const [service, setService] = useState("The Ace · $60");
  const [time, setTime] = useState("4:30");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="book" className="noise relative overflow-hidden py-24 sm:py-32" aria-labelledby="book-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.16),transparent_60%)]" aria-hidden />
      <div className="grid-bg absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-[2.5rem] border-gold/20 p-8 sm:p-12 lg:p-16">
            <div className="animate-float absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-[100px]" aria-hidden />
            <div className="animate-float absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gold/10 blur-[90px] [animation-delay:-3s]" aria-hidden />

            <div className="relative grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> 3 chairs open today
                </span>
                <h2 id="book-title" className="mt-6 font-display text-4xl leading-[1.02] text-cream sm:text-5xl lg:text-6xl">
                  Your next-level cut is <em className="text-gradient not-italic">one tap away.</em>
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/60">
                  Lock in your chair now. First-timers get <span className="font-semibold text-cream">$10 off</span> with code FIRSTACE — and if you're not thrilled, the fix is on us.
                </p>

                <ul className="mt-10 space-y-4 text-sm text-cream/70">
                  <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-gold" /> 412 King Street, Suite 2 · Downtown</li>
                  <li className="flex items-center gap-3"><Clock className="h-5 w-5 text-gold" /> Mon–Sat 9am–9pm · Sun 11am–6pm</li>
                  <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /> <a href="tel:+15550002223" className="hover:text-gold">(555) 000-2223</a></li>
                </ul>
              </div>

              <div className="glass rounded-3xl p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[380px] flex-col items-center justify-center text-center">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}>
                        <CheckCircle2 className="h-16 w-16 text-gold" />
                      </motion.div>
                      <h3 className="mt-5 font-display text-3xl text-cream">You're on the books.</h3>
                      <p className="mt-3 text-sm text-cream/60">{service} at {time} today. We'll text you a confirmation and a reminder an hour before. See you soon, Ace.</p>
                      <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-gold hover:underline">Book another</button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={submit} className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <h3 className="font-display text-2xl text-cream">Reserve your chair</h3>

                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cream/50">Name</label>
                        <input id="name" required placeholder="Your name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cream/50">Phone</label>
                        <input id="phone" type="tel" required placeholder="(555) 000-0000" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-cream/30 transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30" />
                      </div>
                      <div>
                        <label htmlFor="service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cream/50">Service</label>
                        <select id="service" value={service} onChange={(e) => setService(e.target.value)} className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-cream transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/30">
                          {["The Cut · $35", "The Ace · $60", "The Royal · $95", "Hot Towel Shave · $40", "Beard Sculpt · $30"].map((s) => (
                            <option key={s} className="bg-ink-2">{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cream/50">Today's openings</p>
                        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Time slot">
                          {times.map((t) => (
                            <button
                              type="button"
                              key={t}
                              role="radio"
                              aria-checked={time === t}
                              onClick={() => setTime(t)}
                              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${time === t ? "bg-gold text-ink shadow-[0_0_20px_-4px_var(--color-gold)]" : "border border-white/10 text-cream/70 hover:border-gold/40 hover:text-cream"}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button type="submit" className="btn-gold group flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                        <span className="relative z-10 flex items-center gap-2">
                          Confirm booking <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </button>
                      <p className="text-center text-[11px] text-cream/40">No card required · Free cancellation up to 2h before</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
