import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, Plus, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "The shop", href: "#shop" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
];

const services = [
  { number: "01", name: "The precision cut", description: "A cut built around your hair, face, and the way you actually live.", duration: "45 min", price: "$35" },
  { number: "02", name: "The skin fade", description: "Seamless from skin to style. Every line considered, every detail finished.", duration: "45 min", price: "$45" },
  { number: "03", name: "Beard work", description: "Shape, line, and clean up. The difference is in the details.", duration: "30 min", price: "$30" },
  { number: "04", name: "The full service", description: "A precise cut, beard work, and a hot towel finish. The whole thing.", duration: "75 min", price: "$65" },
];

const testimonials = [
  { quote: "Finally found a barber who listens, gets it right, and doesn't rush the details. The kind of cut that makes the rest of your week feel better.", author: "Marcus T.", service: "Skin fade" },
  { quote: "The first time I sat down, they asked the right questions. Now I don't have to explain my cut every time. It just works.", author: "Daniel R.", service: "Precision cut" },
  { quote: "Clean shop, good people, and easily the sharpest beard line I've had. You can tell these guys care about what leaves their chair.", author: "Jordan K.", service: "Beard work" },
];

const faqs = [
  { question: "Do I need an appointment?", answer: "Appointments are the best way to make sure a chair is ready for you. Walk-ins are welcome when we have availability, but we recommend booking ahead." },
  { question: "What if I'm not sure what cut I want?", answer: "That's completely fine. Every service starts with a conversation about your hair, your routine, and what you're going for. We'll help you find a cut that makes sense for you." },
  { question: "How long does a haircut take?", answer: "Most cuts take around 45 minutes. Our full service takes about 75 minutes. We leave enough time to do the work properly, without rushing you out the door." },
  { question: "Can I request the same barber?", answer: "Absolutely. Mention your preferred barber in your booking request and we'll do our best to match you with them." },
  { question: "Can I reschedule?", answer: "Of course. Just reply to your booking confirmation as early as possible and we'll help find another time that works." },
];

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div {...reveal} transition={{ ...reveal.transition, delay }} className={className}>{children}</motion.div>;
}

function Brand() {
  return <a href="#top" className="brand" aria-label="Ace of Bladez, back to top">ACE <span>OF</span> BLADEZ<span className="brand-period">.</span></a>;
}

function ButtonLink({ children, href = "#book" }: { children: ReactNode; href?: string }) {
  return <a className="button-link" href={href}>{children}<ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className={`site-header ${scrolled || open ? "site-header-solid" : ""}`}>
    <div className="header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">{navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <a href="#book" className="header-book">Book a chair <ArrowUpRight size={17} strokeWidth={1.8} /></a>
      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={25} strokeWidth={1.7} /> : <Menu size={25} strokeWidth={1.7} />}</button>
    </div>
    <AnimatePresence>
      {open && <motion.nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
        {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} strokeWidth={1.8} /></a>)}
        <a href="#book" onClick={() => setOpen(false)}>Book a chair<ArrowUpRight size={18} strokeWidth={1.8} /></a>
      </motion.nav>}
    </AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="hero-photo" aria-hidden="true" /><div className="hero-shade" aria-hidden="true" />
    <div className="hero-content page-width">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A better barbershop experience</p>
        <h1 id="hero-title">ACE OF<br /><span>BLADEZ.</span></h1>
        <div className="hero-bottom"><div><p className="hero-tagline">Good hair is no accident.</p><p className="hero-description">Sharp cuts. Good conversation. No rushing the details. Come in as you are, leave looking like yourself on your best day.</p></div><ButtonLink>Book your chair</ButtonLink></div>
      </motion.div>
      <a className="hero-scroll" href="#intro" aria-label="Scroll to discover more"><span>Scroll to explore</span><ArrowDown size={17} strokeWidth={1.6} /></a>
    </div><div className="hero-index" aria-hidden="true">01 / 05</div>
  </section>;
}

function Intro() {
  return <section id="intro" className="intro section-pad"><div className="page-width intro-grid">
    <Reveal><p className="eyebrow">THE ACE STANDARD <span className="section-index">/ 01</span></p></Reveal>
    <Reveal delay={0.08}><h2 className="intro-headline">It's not just a haircut.<br /><span>It's how you show up.</span></h2><div className="intro-lower"><p>We believe the best cuts happen when there's time to do them right. No assembly line. No guesswork. Just skilled hands, honest advice, and a result you'll want to come back for.</p><a href="#shop" className="text-link">Get to know us <ArrowUpRight size={18} strokeWidth={1.8} /></a></div></Reveal>
  </div></section>;
}

function Services() {
  return <section id="services" className="services section-pad" aria-labelledby="services-title"><div className="page-width">
    <Reveal className="section-heading"><div><p className="eyebrow">WHAT WE DO <span className="section-index">/ 02</span></p><h2 id="services-title">The right cut.<br /><span>Nothing extra.</span></h2></div><p>Considered cuts and clean finishes. Choose the service that fits, and we'll take care of the rest.</p></Reveal>
    <div className="service-list">{services.map((service, i) => <Reveal key={service.number} delay={i * 0.05}><a className="service-row" href="#book" aria-label={`Book ${service.name}, ${service.price}`}><span className="service-number">{service.number}</span><div className="service-main"><h3>{service.name}</h3><p>{service.description}</p></div><span className="service-duration">{service.duration}</span><span className="service-price">{service.price}</span><ArrowUpRight className="service-arrow" size={24} strokeWidth={1.5} aria-hidden="true" /></a></Reveal>)}</div>
    <p className="services-note">Not sure what to book? <a href="#book">Tell us what you have in mind <ArrowRight size={15} strokeWidth={1.8} /></a></p>
  </div></section>;
}

function Shop() {
  return <section id="shop" className="shop" aria-labelledby="shop-title"><div className="shop-image"><img src="https://images.pexels.com/photos/39559303/pexels-photo-39559303.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Barber carefully cutting a client's hair with scissors" loading="lazy" /></div><div className="shop-copy"><div className="shop-copy-inner"><Reveal><p className="eyebrow">THE WAY WE WORK <span className="section-index">/ 03</span></p><h2 id="shop-title">The details<br />are <em>the point.</em></h2><p className="shop-lead">The consultation. The first line. The last look in the mirror. We pay attention to all of it.</p><p className="shop-body">A great cut isn't about doing more. It's about knowing what matters to you, then doing that exceptionally well. That's the standard we bring to every chair, every day.</p><ButtonLink>Find your next cut</ButtonLink></Reveal></div></div></section>;
}

function Difference() {
  const points = [
    { number: "01", title: "Your cut, not a template.", text: "We start by listening. Your hair type, your routine, your idea of a good cut. Then we get to work." },
    { number: "02", title: "Time to get it right.", text: "A proper cut takes time. We make space for the small things that make a big difference." },
    { number: "03", title: "Good when you leave. Good weeks later.", text: "We cut for the way hair grows out, so your style holds up long after you leave the chair." },
  ];
  return <section className="difference section-pad" aria-labelledby="difference-title"><div className="page-width"><Reveal><p className="eyebrow">WHY IT FEELS DIFFERENT <span className="section-index">/ 04</span></p><h2 id="difference-title">No shortcuts.<br /><span>No bad hair days.</span></h2></Reveal><div className="difference-grid">{points.map((point, i) => <Reveal key={point.number} delay={i * 0.1} className="difference-item"><span>{point.number}</span><h3>{point.title}</h3><p>{point.text}</p></Reveal>)}</div></div></section>;
}

function Reviews() {
  const [active, setActive] = useState(0);
  const next = () => setActive((active + 1) % testimonials.length);
  const previous = () => setActive((active - 1 + testimonials.length) % testimonials.length);
  return <section id="reviews" className="reviews section-pad" aria-labelledby="reviews-title"><div className="page-width reviews-grid"><div><Reveal><p className="eyebrow">FROM THE CHAIR <span className="section-index">/ 05</span></p><h2 id="reviews-title">Word gets<br /><span>around.</span></h2><p className="reviews-description">A good cut speaks for itself. So do the people who keep coming back.</p></Reveal></div><div className="review-content"><div className="review-mark" aria-hidden="true">“</div><div className="review-stage" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }}><blockquote>{testimonials[active].quote}</blockquote><p className="review-author">{testimonials[active].author} <span>— {testimonials[active].service}</span></p></motion.div></AnimatePresence></div><div className="review-controls"><span>0{active + 1} <span className="muted">/ 0{testimonials.length}</span></span><div><button type="button" onClick={previous} aria-label="Previous review"><ChevronLeft size={21} strokeWidth={1.7} /></button><button type="button" onClick={next} aria-label="Next review"><ChevronRight size={21} strokeWidth={1.7} /></button></div></div></div></div></section>;
}

function Pricing() {
  const plans = [
    { label: "THE ESSENTIAL", title: "Cut", price: "$35", detail: "A clean, considered cut made for you.", included: ["Personal consultation", "Precision cut & style", "Neck clean-up"] },
    { label: "THE FAVORITE", title: "Fade", price: "$45", detail: "Sharp transitions. Clean edges. No compromises.", included: ["Personal consultation", "Skin fade & line-up", "Finished style"] },
    { label: "THE WHOLE THING", title: "Cut + Beard", price: "$65", detail: "The full reset, from top to bottom.", included: ["Precision cut or fade", "Beard shape & line-up", "Hot towel finish"] },
  ];
  return <section id="pricing" className="pricing section-pad" aria-labelledby="pricing-title"><div className="page-width"><Reveal className="section-heading"><div><p className="eyebrow">STRAIGHT-UP PRICING <span className="section-index">/ 06</span></p><h2 id="pricing-title">Good work.<br /><span>Fair price.</span></h2></div><p>Know what you're paying before you sit down. Every service includes a consultation and a finished style.</p></Reveal><div className="pricing-grid">{plans.map((plan, i) => <Reveal key={plan.title} delay={i * 0.08} className="price-plan"><div className="price-plan-top"><p className="eyebrow">{plan.label}</p><span>0{i + 1}</span></div><div><h3>{plan.title}</h3><p className="plan-detail">{plan.detail}</p><p className="plan-price">{plan.price}<span> / visit</span></p><ul>{plan.included.map(item => <li key={item}><Check size={17} strokeWidth={1.7} />{item}</li>)}</ul></div><a href="#book" className="plan-link">Book this service <ArrowUpRight size={19} strokeWidth={1.7} /></a></Reveal>)}</div><p className="price-footnote">Looking for something else? Beard work starts at $30. <a href="#book">Ask us about it <ArrowUpRight size={15} strokeWidth={1.8} /></a></p></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="faq section-pad" aria-labelledby="faq-title"><div className="page-width faq-grid"><Reveal><p className="eyebrow">BEFORE YOU SIT DOWN <span className="section-index">/ 07</span></p><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2><p className="faq-intro">Something else on your mind? Send us a note with your booking request.</p></Reveal><div className="faq-list">{faqs.map((faq, index) => <Reveal key={faq.question} delay={index * 0.04}><div className="faq-item"><button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index} aria-controls={`answer-${index}`}><span>{faq.question}</span><Plus size={22} strokeWidth={1.5} className={open === index ? "faq-plus open" : "faq-plus"} /></button><AnimatePresence initial={false}>{open === index && <motion.div id={`answer-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="faq-answer"><p>{faq.answer}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></div></section>;
}

function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Booking request - ${data.get("service")}`;
    const body = `Hi Ace of Bladez,\n\nI'd like to request an appointment.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nService: ${data.get("service")}\nPreferred date: ${data.get("date")}\nPreferred time: ${data.get("time")}\n\nPlease let me know what is available. Thanks!`;
    window.location.href = `mailto:hello@aceofbladez.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };
  return <section id="book" className="booking section-pad" aria-labelledby="booking-title"><div className="page-width booking-grid"><Reveal className="booking-copy"><p className="eyebrow">TAKE THE NEXT STEP <span className="section-index">/ 08</span></p><h2 id="booking-title">Your chair<br />is <em>waiting.</em></h2><p>Tell us when you'd like to come in. We'll get back to you to confirm the details. Simple as that.</p><div className="booking-small"><span>COME IN. SIT DOWN. LOOK SHARP.</span><ArrowRight size={24} strokeWidth={1.4} /></div></Reveal><Reveal delay={0.12} className="booking-form-wrap"><form onSubmit={onSubmit} className="booking-form"><h3>Request a booking</h3><p>Choose your service and preferred time. We'll confirm availability by phone or email.</p><div className="form-grid"><label>YOUR NAME<input name="name" type="text" autoComplete="name" placeholder="Full name" required /></label><label>PHONE NUMBER<input name="phone" type="tel" autoComplete="tel" placeholder="Your number" required /></label><label>SERVICE<select name="service" defaultValue="The precision cut" required><option>The precision cut</option><option>The skin fade</option><option>Beard work</option><option>The full service</option></select></label><label>PREFERRED DATE<input name="date" type="date" min={today} required /></label><label className="form-full">PREFERRED TIME<select name="time" defaultValue="" required><option value="" disabled>Choose a time window</option><option>Morning (9am-12pm)</option><option>Afternoon (12pm-5pm)</option><option>Evening (5pm-9pm)</option></select></label></div><button type="submit" className="booking-submit">Open booking email <ArrowUpRight size={19} strokeWidth={1.8} /></button><p className="form-note">This opens your email app with your request ready to send. Your appointment is not confirmed until we reply.</p>{submitted && <p className="form-feedback" role="status">Your email app should open now. Please send the message to complete your request.</p>}</form></Reveal></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="page-width"><div className="footer-top"><div><Brand /><p>Good cuts. Good people. A chair that's yours.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#services">Services</a><a href="#shop">The shop</a><a href="#reviews">Reviews</a><a href="#pricing">Pricing</a></div><div><span>GET IN TOUCH</span><a href="mailto:hello@aceofbladez.com">Email us <ArrowUpRight size={15} strokeWidth={1.7} /></a><a href="#faq">Questions</a><a href="#book">Book a chair</a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Ace of Bladez. All rights reserved.</span><span>Made for the way you show up.</span><a href="#top">Back to top ↑</a></div></div></footer>;
}

export default function App() {
  return <><a href="#main" className="skip-link">Skip to content</a><Header /><main id="main"><Hero /><Intro /><Services /><Shop /><Difference /><Reviews /><Pricing /><FAQ /><Booking /></main><Footer /></>;
}