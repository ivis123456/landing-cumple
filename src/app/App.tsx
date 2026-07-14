import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { X, Gift, Camera } from "lucide-react";
import confetti from "canvas-confetti";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function FrogFace({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={className}>
      <ellipse cx="16" cy="21" rx="9" ry="9" fill="#148B22" />
      <ellipse cx="44" cy="21" rx="9" ry="9" fill="#148B22" />
      <ellipse cx="30" cy="38" rx="23" ry="17" fill="#148B22" />
      <ellipse cx="30" cy="41" rx="15" ry="11" fill="#1eb830" opacity="0.35" />
      <circle cx="16" cy="21" r="6" fill="white" />
      <circle cx="44" cy="21" r="6" fill="white" />
      <circle cx="17" cy="20" r="3.2" fill="#0d2b10" />
      <circle cx="45" cy="20" r="3.2" fill="#0d2b10" />
      <circle cx="18" cy="19" r="1.1" fill="white" />
      <circle cx="46" cy="19" r="1.1" fill="white" />
      <circle cx="26" cy="35" r="1.4" fill="#0a2009" opacity="0.4" />
      <circle cx="34" cy="35" r="1.4" fill="#0a2009" opacity="0.4" />
      <path d="M22 44 Q30 52 38 44" stroke="#0a2009" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="9" cy="50" rx="6" ry="4" fill="#148B22" />
      <ellipse cx="51" cy="50" rx="6" ry="4" fill="#148B22" />
    </svg>
  );
}

function FrogTiny({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg
      width="36" height="36" viewBox="0 0 60 60" fill="none"
      style={{ transform: `rotate(${rotate}deg)`, display: "inline-block" }}
    >
      <ellipse cx="16" cy="21" rx="9" ry="9" fill="#148B22" />
      <ellipse cx="44" cy="21" rx="9" ry="9" fill="#148B22" />
      <ellipse cx="30" cy="38" rx="23" ry="17" fill="#148B22" />
      <circle cx="16" cy="21" r="6" fill="white" />
      <circle cx="44" cy="21" r="6" fill="white" />
      <circle cx="17" cy="20" r="3" fill="#0d2b10" />
      <circle cx="45" cy="20" r="3" fill="#0d2b10" />
      <path d="M22 44 Q30 52 38 44" stroke="#0a2009" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BeeIcon({ size = 48, uid = "a" }: { size?: number; uid?: string }) {
  const clipId = `bee-body-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <ellipse cx="12" cy="22" rx="10" ry="6" fill="#B3E5FC" opacity="0.82" transform="rotate(-18 12 22)" />
      <ellipse cx="38" cy="22" rx="10" ry="6" fill="#B3E5FC" opacity="0.82" transform="rotate(18 38 22)" />
      <clipPath id={clipId}>
        <ellipse cx="25" cy="33" rx="10" ry="13" />
      </clipPath>
      <ellipse cx="25" cy="33" rx="10" ry="13" fill="#FDD835" />
      <rect x="15" y="28" width="20" height="5" fill="#1a1a1a" opacity="0.72" clipPath={`url(#${clipId})`} />
      <rect x="15" y="35" width="20" height="5" fill="#1a1a1a" opacity="0.72" clipPath={`url(#${clipId})`} />
      <circle cx="25" cy="16" r="8" fill="#FDD835" />
      <circle cx="22" cy="14" r="2.4" fill="#1a1a1a" />
      <circle cx="28" cy="14" r="2.4" fill="#1a1a1a" />
      <circle cx="22.8" cy="13.2" r="0.8" fill="white" />
      <circle cx="28.8" cy="13.2" r="0.8" fill="white" />
      <path d="M21 19.5 Q25 22.5 29 19.5" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="22" y1="9" x2="18" y2="3" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17.5" cy="2.5" r="2" fill="#148B22" />
      <line x1="28" y1="9" x2="32" y2="3" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32.5" cy="2.5" r="2" fill="#148B22" />
      <path d="M25 45 L23 49 L25 47 L27 49 Z" fill="#1a1a1a" opacity="0.55" />
    </svg>
  );
}

// SVG: small flower doodle
function FlowerSvg({ size = 48, color = "#148B22" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* petals */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse
          key={i}
          cx="30" cy="14" rx="6" ry="10"
          fill={i % 2 === 0 ? color : "#4caf50"}
          opacity="0.85"
          transform={`rotate(${deg} 30 30)`}
        />
      ))}
      {/* center */}
      <circle cx="30" cy="30" r="8" fill="#FDD835" />
      <circle cx="30" cy="30" r="5" fill="#f9a825" />
    </svg>
  );
}

// SVG: sun doodle
function SunSvg({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <line
          key={i}
          x1="30" y1="5" x2="30" y2="12"
          stroke="#FDD835" strokeWidth="2.5" strokeLinecap="round"
          transform={`rotate(${deg} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="13" fill="#FDD835" />
      <circle cx="30" cy="30" r="10" fill="#ffee58" />
    </svg>
  );
}

// SVG: leaf / nature doodle
function LeafSvg({ size = 44, rotate = 0 }: { size?: number; rotate?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 60" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M25 55 C25 55 5 40 8 20 C10 5 25 2 25 2 C25 2 40 5 42 20 C45 40 25 55 25 55Z" fill="#148B22" opacity="0.85" />
      <path d="M25 55 C25 55 25 2 25 2" stroke="#0d2b10" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M25 30 C18 25 10 22 8 20" stroke="#0d2b10" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M25 40 C32 35 40 32 42 30" stroke="#0d2b10" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

// SVG: butterfly doodle
function ButterflySvg({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* left wings */}
      <ellipse cx="18" cy="22" rx="16" ry="11" fill="#4caf50" opacity="0.75" transform="rotate(-20 18 22)" />
      <ellipse cx="16" cy="38" rx="11" ry="8" fill="#148B22" opacity="0.65" transform="rotate(15 16 38)" />
      {/* right wings */}
      <ellipse cx="42" cy="22" rx="16" ry="11" fill="#4caf50" opacity="0.75" transform="rotate(20 42 22)" />
      <ellipse cx="44" cy="38" rx="11" ry="8" fill="#148B22" opacity="0.65" transform="rotate(-15 44 38)" />
      {/* body */}
      <ellipse cx="30" cy="30" rx="3" ry="14" fill="#0d2b10" opacity="0.7" />
      {/* antennae */}
      <path d="M28 18 C24 10 20 8 18 5" stroke="#0d2b10" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <circle cx="17.5" cy="4.5" r="1.8" fill="#0d2b10" opacity="0.6" />
      <path d="M32 18 C36 10 40 8 42 5" stroke="#0d2b10" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      <circle cx="42.5" cy="4.5" r="1.8" fill="#0d2b10" opacity="0.6" />
    </svg>
  );
}

// ─── Confetti temático ────────────────────────────────────────────────────────

function launchConfetti() {
  const colors = ["#148B22", "#FDD835", "#FF6B6B", "#4caf50", "#eaf7ea"];
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.6 },
    colors,
    ticks: 220,
    scalar: 0.9,
  });
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { y: 0.5 },
    colors,
    ticks: 220,
    scalar: 1.1,
    angle: 60,
  });
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { y: 0.5 },
    colors,
    ticks: 220,
    scalar: 1.1,
    angle: 120,
  });
}

// ─── Neubrutalismo Button ─────────────────────────────────────────────────────

function NeuButton({
  onClick, children, color = "#FDD835", textColor = "#0d2b10",
}: {
  onClick: () => void; children: React.ReactNode; color?: string; textColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="border-2 border-foreground px-6 py-3 font-bold text-sm uppercase tracking-wide
        transition-all duration-75 flex items-center gap-2 cursor-pointer
        hover:translate-x-[3px] hover:translate-y-[3px] active:translate-x-[5px] active:translate-y-[5px]"
      style={{
        fontFamily: "'Special Elite', monospace",
        borderRadius: 0,
        backgroundColor: color,
        color: textColor,
        boxShadow: "5px 5px 0px #0d2b10",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0px #0d2b10"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px #0d2b10"; }}
    >
      {children}
    </button>
  );
}

// ─── Reveal-on-scroll wrapper ─────────────────────────────────────────────────

function Reveal({
  children, className = "", delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function App() {
  const [showGift, setShowGift]     = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [beeHover, setBeeHover]     = useState(false);
  const [giftOpen, setGiftOpen]     = useState(false);

  const { scrollYProgress } = useScroll();
  const readingProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  function openGift() {
    setGiftOpen(true);
    launchConfetti();
  }

  function openSecret() {
    setShowSecret(true);
    launchConfetti();
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Special Elite', monospace" }}
    >
      {/* barra de progreso de lectura, como un hilo de tinta que avanza */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
        style={{ scaleX: readingProgress, background: "#148B22" }}
      />

      {/* ══════════════ MASTHEAD ══════════════ */}
      <header className="border-b-4 border-foreground bg-[#eaf7ea]">
        <div className="max-w-6xl mx-auto px-4">

          {/* top strip */}
          <div className="border-b border-foreground/25 py-[3px] flex flex-wrap justify-between gap-x-4 text-[11px] text-foreground/60">
            <span>VOL. 1, Nº 001 — EDICIÓN ESPECIAL DE CUMPLEAÑOS</span>
            <span className="capitalize hidden sm:block">{today}</span>
            <span>PRECIO: UN ABRAZO SINCERO</span>
          </div>

          {/* main masthead row */}
          <div className="py-5 flex items-center justify-between gap-6">
            {/* left: frog logo + motto */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.div
                role="button"
                aria-label="Rana saltarina"
                className="cursor-pointer"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 1.6, rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                whileHover={{ scale: 1.3 }}
              >
                <FrogFace size={70} />
              </motion.div>
              <div className="text-[10px] text-foreground/50 leading-snug max-w-[90px]">
                <em>"Croando las<br />noticias que<br />verdaderamente importan"</em>
              </div>
            </div>

            {/* center: newspaper name */}
            <div className="text-center flex-1 min-w-0">
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground leading-none tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Periódico UG
              </h1>
              <div className="mt-2 text-[10px] sm:text-xs tracking-[0.28em] uppercase text-primary font-bold">
                ✦ Diario Escolar Independiente ✦ Est. 2024 ✦ Distribución Gratuita ✦
              </div>
            </div>

            {/* right: in-this-issue (versión completa en desktop) */}
            <div className="text-right text-[11px] leading-5 text-foreground/55 shrink-0 hidden md:block">
              <div className="font-bold text-foreground mb-1">HOY EN PORTADA</div>
              <div>· Gran Celebración</div>
              <div>· Mensajes Secretos</div>
              <div>· Las Flores y el Sol</div>
              <div>· Sorpresas Ocultas</div>
            </div>
          </div>

          {/* in-this-issue condensado, solo en móvil */}
          <div className="md:hidden pb-4 text-[10.5px] text-foreground/55 flex flex-wrap gap-x-3 gap-y-1 justify-center">
            <span className="font-bold text-foreground">HOY EN PORTADA:</span>
            <span>Gran Celebración</span>
            <span>·</span>
            <span>Mensajes Secretos</span>
            <span>·</span>
            <span>Sorpresas Ocultas</span>
          </div>

          {/* accent band */}
          <div
            className="text-center text-[10px] tracking-[0.25em] uppercase font-bold text-white py-[3px]"
            style={{ background: "#148B22" }}
          >
            ★ NÚMERO ESPECIAL — ¡¡GRAN ANIVERSARIO PERSONAL!! ★
          </div>
        </div>
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section className="bg-[#eaf7ea] border-b-4 border-foreground">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10 items-start">

            {/* headline */}
            <div>
              <div className="text-[11px] uppercase tracking-widest text-primary font-bold mb-4 flex items-center gap-2">
                <span>🔔</span><span>NOTICIA DE ÚLTIMO MOMENTO</span><span>🔔</span>
              </div>
              <h2
                className="font-black text-foreground leading-[0.88] mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 10vw, 6rem)" }}
              >
                ¡FELIZ<br />
                <span style={{ color: "#148B22" }}>CUM</span>-<br />
                PLEA-<br />ÑOS!
              </h2>

              {/* frog strip */}
              <div className="flex gap-1 mb-5">
                {[-12, 4, 16, -5].map((rot, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.4, delay: i * 0.15, ease: "easeOut" }}
                  >
                    <FrogTiny rotate={rot} />
                  </motion.div>
                ))}
              </div>

              <p className="text-[16px] leading-relaxed text-foreground/85 max-w-lg italic"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Hoy en tu natalicio, disfruta de lo simple y de lo hermoso: las flores, los cambios y el sol.
              </p>
            </div>

            {/* polaroid — replaced with SVG illustration cluster */}
            <div className="flex justify-center md:justify-end items-center">
              <div className="relative w-64 h-64">
                {/* layered nature SVGs */}
                <motion.div
                  className="absolute top-0 left-0"
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FlowerSvg size={72} />
                </motion.div>
                <motion.div
                  className="absolute top-2 right-4"
                  animate={{ scale: [1, 1.12, 1], rotate: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <SunSvg size={60} />
                </motion.div>
                <div className="absolute bottom-4 left-6"><LeafSvg size={56} rotate={-20} /></div>
                <div className="absolute bottom-0 right-0"><LeafSvg size={48} rotate={30} /></div>
                <motion.div
                  className="absolute top-16 left-16"
                  animate={{ y: [0, -10, 0], x: [0, 4, 0], rotate: [0, 10, -6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ButterflySvg size={60} />
                </motion.div>
                <motion.div
                  className="absolute bottom-8 left-28"
                  animate={{ rotate: [4, -4, 4] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FlowerSvg size={44} color="#4caf50" />
                </motion.div>
                {/* rana que crece: empieza chiquita y va creciendo con cada salto */}
                <motion.div
                  className="absolute bottom-2 right-10"
                  initial={{ scale: 0.4 }}
                  animate={{ scale: [0.4, 0.7, 1, 0.4], y: [0, -6, -14, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.6, 1] }}
                >
                  <FrogTiny />
                </motion.div>
                {/* decorative border frame */}
                <div
                  className="absolute inset-0 border-2 border-dashed border-foreground/20 pointer-events-none"
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOTO DE PORTADA ══════════════ */}
      <section className="border-b-4 border-foreground bg-[#f5fcf5]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Reveal className="flex justify-center">
            <div className="w-full max-w-md">
              <div
                className="border-2 border-foreground p-3 bg-white"
                style={{ boxShadow: "7px 7px 0 #0d2b10" }}
              >
                <ImageWithFallback
                  src="https://i.pinimg.com/736x/af/98/40/af984059c74de7ffd95d789609feea5a.jpg"
                  alt="Foto de portada de Mar"
                  className="w-full h-72 object-cover"
                />
                <div className="pt-3 flex items-center gap-2 text-[11px] text-foreground/55">
                  <Camera size={14} />
                  <span>Foto de portada</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ ACTION BAR — solo regalo ══════════════ */}
      <section className="border-b-4 border-foreground" style={{ background: "#148B22" }}>
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex gap-3 justify-center items-center">
            <NeuButton onClick={() => setShowGift(true)} color="#FF6B6B" textColor="#ffffff">
              <Gift size={16} /> Abrir Regalo 🎁
            </NeuButton>
          </div>
        </div>
      </section>

      {/* ══════════════ EDITORIAL GRID ══════════════ */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* ── row 1: three columns ──────────────────────────────────────────── */}
        <Reveal className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] border-2 border-foreground">

          {/* col A: la nota principal */}
          <article className="p-8 md:border-r-2 border-b-2 md:border-b-0 border-foreground">
            <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-3 pb-2 border-b border-foreground/25">
              CARTA ESPECIAL
            </div>
            <h3
              className="text-3xl font-black leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Para Mar, en el día de sus 25
            </h3>

            {/* drop cap + nota */}
            <p className="text-[14.5px] leading-loose mb-0">
              <span
                className="float-left text-6xl font-black leading-none mr-3 mt-1 text-primary"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >Q</span>
              uerida Mar,
            </p>
            <p className="text-[14.5px] leading-loose mt-2 mb-5 clear-left">
              absolutamente todo en esta vida es un regalo, nuestra vida misma lo es.
              Espero que hagas de tu vida una increíble experiencia.
            </p>
            <p className="text-[14.5px] leading-loose mb-6">
              Disfruta mucho tus <strong className="text-primary" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1em" }}>25</strong>. 🐸💚
            </p>

            {/* SVG doodle row as separator */}
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-foreground/20">
              <FlowerSvg size={36} />
              <LeafSvg size={32} rotate={-10} />
              <BeeIcon size={34} uid="article" />
              <LeafSvg size={28} rotate={20} />
              <FlowerSvg size={30} color="#4caf50" />
              <FrogTiny rotate={8} />
            </div>
          </article>

          {/* col B: SVG decorative section */}
          <div className="md:border-r-2 border-foreground">
            <article className="p-5 border-b-2 border-foreground">
              <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-3">
                NATURALEZA DEL DÍA
              </div>
              <h3
                className="text-[18px] font-black leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Las Flores Anuncian Primavera
              </h3>
              {/* SVG flower cluster */}
              <div className="flex justify-center gap-2 my-4">
                <FlowerSvg size={50} />
                <FlowerSvg size={42} color="#2e7d32" />
                <FlowerSvg size={50} />
              </div>
              <p className="text-[12px] leading-relaxed text-foreground/70">
                Cada pétalo es un año de vida vivida con intensidad. Que florezca este nuevo ciclo con la misma gracia que tú lo haces.
              </p>
            </article>

            <article className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-3">
                SECCIÓN SOL
              </div>
              <h3
                className="text-[18px] font-black leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Brilla siempre, como hoy
              </h3>
              <div className="flex justify-center my-4">
                <SunSvg size={72} />
              </div>
              <p className="text-[12px] leading-relaxed text-foreground/70">
                Espero que el sol siempre brille para los dos. Para mí, el sol es como un abrazo: tiene
                calidez y una especie de humanidad.
              </p>
              <a
                href="https://www.youtube.com/watch?v=GR2yACBKiJU&list=RDGR2yACBKiJU&start_radio=1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 text-[11px] font-bold"
                style={{ background: "#FDD835", color: "#0d2b10", boxShadow: "3px 3px 0 #0d2b10" }}
              >
                ▶ Escuchar la canción
              </a>
            </article>
          </div>

          {/* col C: datos + easter egg */}
          <div>
            {/* datos curiosos con SVGs */}
            <article className="p-4 border-b-2 border-foreground bg-[#e8f5e8]">
              <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-3">
                LO SIMPLE Y LO HERMOSO
              </div>
              <ul className="space-y-3">
                {[
                  { icon: <FlowerSvg size={28} />, text: "Una flor que crece entre el asfalto" },
                  { icon: <SunSvg size={26} />, text: "El sol de la mañana en tu cara" },
                  { icon: <LeafSvg size={24} rotate={0} />, text: "El cambio de las hojas en otoño" },
                  { icon: <ButterflySvg size={30} />, text: "Una mariposa que te elige" },
                  { icon: <BeeIcon size={28} uid="list" />, text: "El zumbido de una abeja feliz" },
                ].map((item, i) => (
                  <li key={i} className="text-[12px] border-b border-dashed border-foreground/20 pb-2 last:border-0 leading-snug flex items-center gap-2">
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* ── EASTER EGG #1: secret classified ──────────────────── */}
            <article
              className="p-4 cursor-pointer transition-colors duration-200 group"
              onClick={openSecret}
              role="button"
              aria-label="Revelar mensaje secreto"
              style={{ background: "transparent" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(20,139,34,0.07)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div className="text-[10px] uppercase tracking-widest text-foreground/22 font-bold mb-1 group-hover:text-primary transition-colors">
                AVISOS CLASIFICADOS
              </div>
              <p className="text-[11.5px] text-foreground/22 group-hover:text-foreground/65 transition-colors leading-relaxed">
                SE BUSCA: persona especial para recibir mensaje muy importante. Requisito: haber
                nacido hoy. Presentarse en sección de sorpresas. Preguntar por la abeja dorada...
              </p>
              <p className="text-[10px] text-foreground/12 group-hover:text-primary mt-1 font-bold transition-colors">
                [HAGA CLIC PARA RECLAMAR SU SORPRESA] ↗
              </p>
            </article>
          </div>
        </Reveal>

        {/* ── row 2: SVG nature banner ──────────────────────────────────────── */}
        <Reveal delay={0.1} className="border-2 border-t-0 border-foreground p-8 bg-[#f5fcf5] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

            {/* left: butterfly + leaves composition */}
            <div className="flex justify-center">
              <div className="relative w-40 h-36">
                <div className="absolute top-0 left-4"><LeafSvg size={60} rotate={-30} /></div>
                <div className="absolute top-2 right-0"><LeafSvg size={50} rotate={25} /></div>
                <div className="absolute bottom-0 left-8"><ButterflySvg size={64} /></div>
              </div>
            </div>

            {/* center: editorial quote */}
            <div className="text-center px-4">
              <div className="flex justify-center mb-3">
                <SunSvg size={44} />
              </div>
              <h3
                className="text-2xl font-black mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "El Mejor Año<br />Está Por Venir"
              </h3>
              <p className="text-[11px] text-foreground/45 italic">Editorial · Periódico UG · Pág. 7</p>
            </div>

            {/* right: flowers composition */}
            <div className="flex justify-center">
              <div className="relative w-40 h-36">
                <div className="absolute top-0 left-0"><FlowerSvg size={56} /></div>
                <div className="absolute top-6 right-0"><FlowerSvg size={48} color="#2e7d32" /></div>
                <div className="absolute bottom-0 left-10"><FlowerSvg size={52} color="#4caf50" /></div>
              </div>
            </div>
          </div>

          {/* ── EASTER EGG #2: the bee ─────────────────────────────── */}
          <div
            className="absolute bottom-4 right-5 cursor-pointer"
            onMouseEnter={() => setBeeHover(true)}
            onMouseLeave={() => setBeeHover(false)}
          >
            <motion.div
              animate={beeHover ? { rotate: [-8, 8, -5, 5, 0], y: [-3, 0] } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BeeIcon size={48} uid="main" />
            </motion.div>

            {beeHover && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute bottom-full right-0 mb-2 p-3 w-52 border-2 border-foreground text-foreground"
                style={{ background: "#FDD835", boxShadow: "4px 4px 0 #0d2b10" }}
              >
                <p className="text-[11.5px] font-bold mb-1">🐝 ¡Mensaje secreto de la Abeja Dorada!</p>
                <p className="text-[11px] leading-snug text-foreground/80">
                  "Eres más dulce que la miel y más especial que cualquier flor del jardín. ¡Feliz cumpleaños, Mar!"
                </p>
                <p className="text-[10px] text-foreground/45 mt-1 italic">— Abeja Dorada, Corresponsal Especial</p>
              </motion.div>
            )}
          </div>
        </Reveal>
      </main>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t-4 border-foreground" style={{ background: "#0d2b10", color: "#eaf7ea" }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-[11px]">
            <div className="flex items-center gap-3">
              <FrogFace size={36} />
              <div>
                <div className="font-black text-[15px]" style={{ fontFamily: "'Playfair Display', serif", color: "#eaf7ea" }}>
                  Periódico UG
                </div>
                <div style={{ color: "rgba(234,247,234,0.5)" }}>
                  © {new Date().getFullYear()} — Todos los derechos reservados con mucho cariño
                </div>
              </div>
            </div>

            <div className="text-center" style={{ color: "rgba(234,247,234,0.6)" }}>
              <p>Publicado con amor · Impreso en papel de sueños · Tinta de felicidad</p>
              <p className="mt-1">Redacción: El Equipo de los Que Te Quieren Mucho</p>
            </div>

            <div className="text-right" style={{ color: "rgba(234,247,234,0.4)", fontSize: 10 }}>
              <p>Tirada: 1 ejemplar muy especial</p>
              <p>Depósito legal: Tu corazón</p>
              <p>ISSN: 🌸-🐸-🐝-☀️</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ══════════════ GIFT MODAL ══════════════ */}
      {showGift && (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md border-4 border-foreground text-center"
            style={{ background: "#eaf7ea", boxShadow: "9px 9px 0 #0d2b10" }}
          >
            <div
              className="border-b-2 border-foreground p-4 flex justify-between items-center"
              style={{ background: "#FF6B6B", color: "#fff" }}
            >
              <h2 className="text-xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                🎁 Tu Sorpresa Especial
              </h2>
              <button
                onClick={() => { setShowGift(false); setGiftOpen(false); }}
                className="hover:opacity-70 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              {!giftOpen ? (
                <div>
                  <motion.div
                    className="text-8xl mb-5 cursor-pointer select-none"
                    whileHover={{ scale: 1.12, rotate: [0, -6, 6, -4, 4, 0] }}
                    transition={{ duration: 0.45 }}
                    onClick={openGift}
                    role="button"
                    aria-label="Abrir regalo"
                  >
                    🎁
                  </motion.div>
                  <p className="text-lg font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ¡Hay algo especial esperándote!
                  </p>
                  <p className="text-[12.5px] text-foreground/55 mb-6">
                    Haz clic en el regalo para abrirlo
                  </p>
                  <button
                    onClick={openGift}
                    className="border-2 border-foreground px-8 py-3 font-bold text-[12.5px] uppercase cursor-pointer
                      hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
                    style={{
                      background: "#FF6B6B", color: "#fff", borderRadius: 0,
                      boxShadow: "4px 4px 0 #0d2b10", fontFamily: "'Special Elite', monospace",
                    }}
                  >
                    ¡Abrir Regalo! 🎊
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                >
                  <div className="text-5xl mb-4 select-none">🎉✨🎊</div>
                  <div className="flex justify-center gap-3 mb-5 flex-wrap">
                    <FrogFace size={52} />
                    <BeeIcon size={44} uid="gift" />
                    <FlowerSvg size={50} />
                    <SunSvg size={46} />
                  </div>
                  <h3
                    className="text-2xl font-black mb-3 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ¡Tu regalo es la vida misma, Mar!
                  </h3>
                  <p className="text-[13px] text-foreground/75 leading-relaxed">
                    Que este nuevo año de vida esté lleno de flores, sol, cambios hermosos,
                    ranas saltarinas y abejas doradas que te traigan solo buenas noticias.
                    ¡Disfruta mucho tus 25! 🐸💚
                  </p>
                  <div className="mt-4 text-2xl select-none">🌸 🐸 🐝 ☀️ 💚</div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* ══════════════ SECRET PANEL ══════════════ */}
      {showSecret && (
        <div className="fixed inset-0 bg-black/55 flex items-end justify-center z-50 p-4">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="w-full max-w-2xl border-4 border-b-0 border-foreground"
            style={{ background: "#FDD835", boxShadow: "0 -7px 0 #0d2b10" }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold mb-1">
                    ★ PANEL SECRETO — ACCESO RESTRINGIDO ★
                  </div>
                  <h2
                    className="text-3xl font-black text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    ¡Lo encontraste! 🐝
                  </h2>
                </div>
                <button
                  onClick={() => setShowSecret(false)}
                  className="border-2 border-foreground p-1.5 hover:opacity-70 cursor-pointer"
                  style={{ background: "#0d2b10", color: "#fff", borderRadius: 0 }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex gap-5 items-center flex-wrap">
                <div className="flex gap-2 shrink-0 items-center">
                  <BeeIcon size={58} uid="secret" />
                  <FrogFace size={60} />
                  <FlowerSvg size={52} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] leading-relaxed font-bold text-foreground">
                    ¡Felicitaciones, exploradora curiosa! Has descubierto el mensaje ultra-secreto del Periódico UG.
                  </p>
                  <p className="text-[13.5px] leading-relaxed mt-2 text-foreground/80">
                    Este mensaje estaba escondido especialmente para alguien como tú: alguien que presta
                    atención, que va más allá de lo evidente. Eso te hace extraordinaria, Mar.{" "}
                    <strong>¡Felices 25, detective del corazón!</strong> 💛
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=Iy6F_blVI10&list=RDIy6F_blVI10&start_radio=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 border-2 border-foreground px-3 py-1.5 text-[11px] font-bold"
                    style={{ background: "#148B22", color: "#fff", boxShadow: "3px 3px 0 #0d2b10" }}
                  >
                    ▶ Escuchar la canción
                  </a>
                </div>
              </div>

              <div className="mt-4 border-t-2 border-foreground/30 pt-3 text-[10.5px] text-foreground/45">
                Mensaje clasificado nivel: MÁXIMO CARIÑO · Desclasificado el {today}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
