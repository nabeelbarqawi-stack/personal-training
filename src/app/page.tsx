"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────
   Fade-up hook (scroll-triggered)
───────────────────────────────────────── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────
   TICKER
───────────────────────────────────────── */
function Ticker() {
  const items = ["STRENGTH", "AESTHETICS", "DISCIPLINE", "RESULTS", "MINDSET", "CONSISTENCY", "ELITE COACHING"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#c9a84c] py-3">
      <div className="ticker-left flex gap-12 text-black font-bold tracking-widest text-sm uppercase">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            {item}
            <span className="text-black/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Coaching", href: "#coaching" },
    { label: "Programs", href: "#programs" },
    { label: "Results", href: "#results" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm border-b border-[#222]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#hero" className="flex flex-col leading-none">
          <span
            style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif" }}
            className="text-3xl tracking-widest text-white"
          >
            JAVIER
          </span>
          <span
            style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif" }}
            className="text-3xl tracking-widest gold-text -mt-1"
          >
            GOMEZ
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#coaching" className="hidden md:inline-block btn-gold-solid text-sm px-6 py-3">
          Apply Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/98 border-t border-[#222] px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-lg py-2"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#coaching" className="btn-gold-solid text-center mt-2">
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "80% center",
      }}
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full">
        <div className="max-w-3xl">
          <p
            className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-6"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Elite Personal Training
          </p>

          <h1
            className="section-title text-white leading-none mb-4"
            style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}
          >
            BUILD THE{" "}
            <span className="gold-text">BODY</span>
            <br />
            YOU DESERVE
          </h1>

          <p className="text-gray-300 text-lg max-w-xl mb-10 leading-relaxed" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            No gimmicks. No shortcuts. Just a proven system built on science,
            discipline, and real results — designed specifically for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#coaching" className="btn-gold-solid text-center">
              Apply for Coaching
            </a>
            <a href="#programs" className="btn-gold text-center">
              View Programs
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-12 mt-16 border-t border-[#222] pt-10">
            {[
              { num: "200+", label: "Clients Transformed" },
              { num: "5+", label: "Years Experience" },
              { num: "100%", label: "Personalized Plans" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="section-title text-4xl gold-text"
                >
                  {s.num}
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#c9a84c] to-transparent" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
function About() {
  const ref = useFadeUp();
  return (
    <section id="about" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0">
            <Image
              src="/images/profile.jpg"
              alt="Javier Gomez"
              fill
              className="object-cover object-top"
              onError={() => {}}
            />
            {/* Gold frame accent */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#c9a84c] -z-10" />
            {/* Tag */}
            <div className="absolute top-6 left-6 bg-[#c9a84c] text-black px-4 py-2">
              <span style={{ fontFamily: "var(--font-bebas), sans-serif" }} className="text-sm tracking-widest uppercase">
                Miami-Based Trainer
              </span>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div ref={ref} className="fade-up">
          <p
            className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-4"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            About Javier
          </p>
          <h2 className="section-title text-white text-6xl md:text-7xl leading-none mb-6">
            NOT JUST A
            <br />
            <span className="gold-text">TRAINER.</span>
            <br />
            A SYSTEM.
          </h2>
          <div className="gold-divider" />
          <p className="text-gray-300 leading-relaxed mb-5 mt-6" style={{ fontFamily: "var(--font-inter)" }}>
            I&apos;m Javier Gomez — a certified personal trainer based in Miami with
            a passion for helping people unlock their full physical potential.
            My approach goes beyond sets and reps. I build complete athletes:
            stronger, leaner, and more confident in every aspect of life.
          </p>
          <p className="text-gray-300 leading-relaxed mb-10" style={{ fontFamily: "var(--font-inter)" }}>
            Whether you&apos;re starting from zero or looking to break through a
            plateau, I create a personalized roadmap tailored to your body,
            your goals, and your lifestyle — and I coach you every step of the
            way.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {[
              { label: "Strength Training" },
              { label: "Body Recomposition" },
              { label: "Nutrition Coaching" },
              { label: "Online & In-Person" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-[#c9a84c] text-lg">✦</span>
                <span className="text-gray-200 text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a href="#coaching" className="btn-gold-solid">
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COACHING PLANS
───────────────────────────────────────── */
function Coaching() {
  const ref = useFadeUp();
  const plans = [
    {
      name: "Elite 1-on-1",
      tag: "Most Popular",
      tagColor: "bg-[#c9a84c] text-black",
      price: "Custom",
      desc: "Fully personalized training and nutrition, weekly check-ins, direct messaging, and form reviews. This is the full Javier Gomez experience.",
      features: [
        "Customized workout program",
        "Personalized nutrition plan",
        "Weekly video check-ins",
        "Unlimited direct messaging",
        "Form check & feedback videos",
        "Monthly program adjustments",
      ],
      cta: "Apply Now",
      highlight: true,
    },
    {
      name: "Online Coaching",
      tag: "Flexible",
      tagColor: "bg-[#222] text-[#c9a84c] border border-[#c9a84c]",
      price: "From $197/mo",
      desc: "Train anywhere in the world with a fully remote coaching experience. Same programming quality, delivered digitally.",
      features: [
        "Monthly custom program",
        "Nutrition guidelines",
        "Bi-weekly check-ins",
        "App-based tracking",
        "Progress analytics",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Group Training",
      tag: "Miami Only",
      tagColor: "bg-[#222] text-gray-300 border border-[#333]",
      price: "From $97/mo",
      desc: "Train alongside a curated group on Miami Beach. High energy, accountability, and Javier&apos;s personal coaching in a group setting.",
      features: [
        "4x weekly group sessions",
        "Miami Beach locations",
        "Community accountability",
        "Monthly programming",
        "Nutrition basics guide",
      ],
      cta: "Join the Group",
      highlight: false,
    },
  ];

  return (
    <section id="coaching" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-16">
          <p
            className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-4"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Coaching Options
          </p>
          <h2 className="section-title text-white text-6xl md:text-8xl leading-none">
            CHOOSE YOUR{" "}
            <span className="gold-text">PATH</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Every plan is built around you. No cookie-cutter templates, no wasted time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 border transition-all duration-300 hover:-translate-y-2 ${
                plan.highlight
                  ? "border-[#c9a84c] bg-[#0d0d0d]"
                  : "border-[#222] bg-[#0a0a0a] hover:border-[#c9a84c]/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-px left-0 right-0 h-0.5 bg-[#c9a84c]" />
              )}
              <span className={`self-start text-xs px-3 py-1 uppercase tracking-widest ${plan.tagColor} mb-6`} style={{ fontFamily: "var(--font-inter)" }}>
                {plan.tag}
              </span>
              <h3 className="section-title text-white text-4xl mb-2">{plan.name}</h3>
              <p className="text-[#c9a84c] text-xl mb-4 section-title">{plan.price}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-inter)" }}>
                {plan.desc.replace("&apos;", "'")}
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300" style={{ fontFamily: "var(--font-inter)" }}>
                    <span className="text-[#c9a84c] mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={plan.highlight ? "btn-gold-solid text-center" : "btn-gold text-center"}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROGRAMS
───────────────────────────────────────── */
function Programs() {
  const ref = useFadeUp();
  const programs = [
    {
      title: "FOUNDATION",
      duration: "8 Weeks",
      level: "Beginner",
      desc: "Build the base. Master movement patterns, build strength from scratch, and develop habits that last.",
      gradient: "from-[#c9a84c]/30 to-black",
    },
    {
      title: "SHRED",
      duration: "12 Weeks",
      level: "Intermediate",
      desc: "Strip the fat, keep the muscle. A precision-cut program built for maximum definition.",
      gradient: "from-[#8B0000]/30 to-black",
    },
    {
      title: "ELITE",
      duration: "16 Weeks",
      level: "Advanced",
      desc: "For those who are already strong and want to push into elite-level performance and aesthetics.",
      gradient: "from-[#1a1a4e]/30 to-black",
    },
  ];

  return (
    <section id="programs" className="py-28 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="fade-up mb-16">
          <p
            className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-4"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Training Programs
          </p>
          <h2 className="section-title text-white text-6xl md:text-8xl leading-none">
            FIND YOUR{" "}
            <span className="gold-text">PROGRAM</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.title}
              className="program-card bg-[#111] border border-[#222] aspect-[4/5] flex flex-col justify-end p-8 hover:border-[#c9a84c]/50 transition-colors duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${p.gradient}`} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-[#c9a84c] uppercase tracking-widest border border-[#c9a84c] px-2 py-1" style={{ fontFamily: "var(--font-inter)" }}>
                    {p.level}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
                    {p.duration}
                  </span>
                </div>
                <h3 className="section-title text-white text-5xl mb-2">{p.title}</h3>
                <div className="card-desc">
                  <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                    {p.desc}
                  </p>
                </div>
                <a href="#coaching" className="btn-gold text-sm px-5 py-2.5 inline-block">
                  View Program
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   RESULTS / TESTIMONIALS
───────────────────────────────────────── */
function Results() {
  const ref = useFadeUp();
  const testimonials = [
    {
      name: "Marcus D.",
      result: "Lost 28 lbs in 12 weeks",
      quote:
        "Javier completely changed how I think about fitness. The program wasn't just about working out — it was a lifestyle overhaul. Best investment I've ever made.",
      initials: "MD",
    },
    {
      name: "Sofia R.",
      result: "Gained 12 lbs of muscle",
      quote:
        "I've worked with trainers before but nobody like Javier. He's detail-oriented, knowledgeable, and genuinely cares about your progress. Incredible results.",
      initials: "SR",
    },
    {
      name: "Andre T.",
      result: "Went from 18% to 9% body fat",
      quote:
        "Six months with Javier and I look and feel completely different. The nutrition coaching alone was worth it. I finally understand how to eat for my goals.",
      initials: "AT",
    },
  ];

  return (
    <section id="results" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-16">
          <p
            className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-4"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Client Results
          </p>
          <h2 className="section-title text-white text-6xl md:text-8xl leading-none">
            REAL PEOPLE.
            <br />
            <span className="gold-text">REAL RESULTS.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#111] border border-[#222] p-8 hover:border-[#c9a84c]/40 transition-colors duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#c9a84c] flex items-center justify-center">
                  <span
                    className="text-black font-bold text-sm"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold" style={{ fontFamily: "var(--font-inter)" }}>
                    {t.name}
                  </p>
                  <p className="text-[#c9a84c] text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-inter)" }}>
                    {t.result}
                  </p>
                </div>
              </div>
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#c9a84c] text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-sm italic" style={{ fontFamily: "var(--font-inter)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function CTABanner() {
  return (
    <section
      className="relative py-32 overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />

      {/* Gold accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#c9a84c]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="section-title text-white leading-none mb-4" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
          STOP WAITING.
          <br />
          <span className="gold-text">START WINNING.</span>
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-10 text-lg" style={{ fontFamily: "var(--font-inter)" }}>
          Spots are limited. Every day you wait is a day you could&apos;ve already started. Apply now and let&apos;s build something together.
        </p>
        <a href="#contact" className="btn-gold-solid text-lg px-10 py-5">
          Apply for Coaching
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT / APPLY FORM
───────────────────────────────────────── */
function Contact() {
  const ref = useFadeUp();
  return (
    <section id="contact" className="py-28 bg-[#050505]">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={ref} className="fade-up text-center mb-12">
          <p
            className="text-[#c9a84c] tracking-[0.3em] text-sm uppercase mb-4"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            Let&apos;s Work Together
          </p>
          <h2 className="section-title text-white text-6xl md:text-7xl leading-none">
            APPLY FOR{" "}
            <span className="gold-text">COACHING</span>
          </h2>
          <p className="text-gray-400 mt-4" style={{ fontFamily: "var(--font-inter)" }}>
            Fill out the form below and I&apos;ll reach out within 24 hours.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="bg-[#111] border border-[#222] text-white px-5 py-4 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-gray-600"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-[#111] border border-[#222] text-white px-5 py-4 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-gray-600"
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="bg-[#111] border border-[#222] text-white px-5 py-4 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-gray-600"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="bg-[#111] border border-[#222] text-white px-5 py-4 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-gray-600"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <select
            className="bg-[#111] border border-[#222] text-gray-400 px-5 py-4 focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <option value="">Select Coaching Option</option>
            <option value="1on1">Elite 1-on-1 Coaching</option>
            <option value="online">Online Coaching</option>
            <option value="group">Group Training (Miami)</option>
          </select>
          <textarea
            rows={4}
            placeholder="Tell me about your goals and current fitness level..."
            className="bg-[#111] border border-[#222] text-white px-5 py-4 focus:outline-none focus:border-[#c9a84c] transition-colors placeholder-gray-600 resize-none"
            style={{ fontFamily: "var(--font-inter)" }}
          />
          <button type="submit" className="btn-gold-solid text-center py-5 text-lg mt-2">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-black border-t border-[#1a1a1a] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span
                style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif" }}
                className="text-4xl tracking-widest text-white block"
              >
                JAVIER
              </span>
              <span
                style={{ fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif" }}
                className="text-4xl tracking-widest gold-text block -mt-2"
              >
                GOMEZ
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              Elite personal training based in Miami, FL. Building stronger bodies and sharper minds.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="section-title text-[#c9a84c] text-xl mb-5 tracking-widest"
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {["Home", "About", "Coaching", "Programs", "Results", "Apply Now"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 hover:text-[#c9a84c] text-sm transition-colors uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="section-title text-[#c9a84c] text-xl mb-5 tracking-widest">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Instagram", handle: "@javiergomezfit" },
                { label: "TikTok", handle: "@javiergomezfit" },
                { label: "Email", handle: "train@javiergomez.com" },
                { label: "Location", handle: "Miami Beach, FL" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-[#c9a84c] text-xs uppercase tracking-widest w-20" style={{ fontFamily: "var(--font-inter)" }}>
                    {s.label}
                  </span>
                  <span className="text-gray-300 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    {s.handle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Javier Gomez Fitness. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
            Privacy Policy · Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Coaching />
      <Programs />
      <Results />
      <CTABanner />
      <Contact />
      <Footer />
    </>
  );
}
