import { useState, useEffect, useRef } from "react";

// ─── Config ───
const ARTIST_NAME = "MAX HEFELE";

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/djmexxpain/", icon: "IG" },
  { name: "YouTube", url: "https://www.youtube.com/@djmexxpain", icon: "YT" },
  { name: "Facebook", url: "https://www.facebook.com/DjMexxPain/", icon: "FB" },
  { name: "SoundCloud", url: "https://soundcloud.com/dj-mexx-pain", icon: "SC" },
  { name: "Mixcloud", url: "https://www.mixcloud.com/mexxpain7/", icon: "MC" },
];

const NAV_ITEMS = ["About", "Music", "Dates", "Contact"];

const GOOGLE_DRIVE = {
  pressKit: "https://drive.google.com/drive/folders/1IWpYqmi32KSwJYzpufRnb0VvszaQtfL6",
  videos: "https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0",
  firstVideo: "https://drive.google.com/file/d/1W4eYUtmmDKoGH5lSQP9gvhMdtTqM-ZGY/preview",
};

const RESIDENCIES = [
  "Citrus Club Ulm '05–'11",
  "Pitu Memmingen '05–'12",
  "Goldcream Memmingen '12–'14",
  "Goldcream Heidenheim '13–'14",
  "Zollamt Stuttgart '16–'19",
  "Puls Club Günzburg '22–'23",
];

const HIGHLIGHTS = [
  { label: "Nature One", detail: "2018 & 2019" },
  { label: "Ikarus Festival", detail: "2023" },
  { label: "Bayern 3", detail: "Saturday Hot Mix" },
  { label: "egoFM", detail: "München" },
];

// ─── SVG Icons ───
const Icons = {
  IG: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  FB: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  SC: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 18V14h1v4H1zm2-5v5h1v-5H3zm2 2v3h1v-3H5zm2-4v7h1V11H7zm2 1v6h1v-6H9zm2-3v9h1V9h-1zm2 2v7h1v-7h-1zm3.5-2c-.28 0-.55.03-.81.1A5 5 0 0 0 11 5v14h7.5a3.5 3.5 0 0 0 0-7z"/>
    </svg>
  ),
  MC: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 14v-4h1v4H4zm3 1V9h1v6H7zm3 0V8h1v7h-1zm3 0V7h1v8h-1zm3 0V9h1v6h-1zm3 0v-4h1v4h-1z"/>
    </svg>
  ),
  YT: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
};

// ─── Styles ───
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #060606;
    --bg-elevated: #0a0a0a;
    --bg-card: #0f0f0f;
    --text: #ededed;
    --text-dim: #555;
    --text-mid: #888;
    --accent: #c8c8c8;
    --border: #181818;
    --border-light: #222;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Syne', sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #333 transparent; }
  body, #root { background: var(--bg); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  ::selection { background: rgba(255,255,255,0.12); color: #fff; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; transition: all 0.5s var(--ease); }
  .nav.scrolled { background: rgba(6,6,6,0.88); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); padding: 16px 48px; border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: var(--font-display); font-size: 20px; letter-spacing: 4px; color: var(--text); text-decoration: none; opacity: 0; transition: opacity 0.4s; cursor: pointer; }
  .nav.scrolled .nav-logo { opacity: 1; }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a { color: var(--text-dim); text-decoration: none; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; transition: color 0.3s; position: relative; }
  .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--text); transition: width 0.4s var(--ease); }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { width: 100%; }
  .menu-btn { display: none; background: none; border: none; color: var(--text); cursor: pointer; padding: 8px; z-index: 101; }
  .menu-btn span { display: block; width: 24px; height: 1.5px; background: var(--text); margin: 6px 0; transition: all 0.3s; }
  .menu-btn.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
  .menu-btn.open span:nth-child(2) { opacity: 0; }
  .menu-btn.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  .mobile-nav { display: none; position: fixed; inset: 0; background: rgba(6,6,6,0.97); backdrop-filter: blur(30px); z-index: 99; flex-direction: column; justify-content: center; align-items: center; gap: 36px; }
  .mobile-nav.open { display: flex; }
  .mobile-nav a { color: var(--text); text-decoration: none; font-family: var(--font-display); font-size: 52px; letter-spacing: 6px; transition: opacity 0.3s; }
  .mobile-nav a:hover { opacity: 0.4; }

  /* HERO */
  .hero { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, rgba(25,22,18,0.5) 0%, rgba(6,6,6,0.85) 60%, rgba(6,6,6,1) 100%); }
  .hero-grain { position: absolute; inset: 0; opacity: 0.035; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 256px; pointer-events: none; }
  .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
  .hero-name { font-family: var(--font-display); font-size: clamp(64px, 13vw, 160px); letter-spacing: clamp(8px, 2vw, 18px); line-height: 0.9; text-align: center; animation: heroIn 1.4s var(--ease) forwards; opacity: 0; }
  .hero-sub { margin-top: 20px; font-size: 10px; letter-spacing: 6px; text-transform: uppercase; color: var(--text-dim); animation: heroIn 1.4s var(--ease) 0.15s forwards; opacity: 0; font-weight: 600; }
  .hero-line { width: 40px; height: 1px; background: var(--text-dim); margin: 32px 0; animation: heroIn 1.4s var(--ease) 0.3s forwards; opacity: 0; }
  .hero-socials { display: flex; gap: 14px; animation: heroIn 1.4s var(--ease) 0.4s forwards; opacity: 0; }
  .hero-socials a { color: var(--text-dim); display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border: 1px solid var(--border-light); border-radius: 50%; transition: all 0.3s var(--ease); text-decoration: none; }
  .hero-socials a:hover { color: var(--text); border-color: var(--text-mid); transform: translateY(-3px); }
  .scroll-hint { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); animation: heroIn 1.4s var(--ease) 0.6s forwards, bob 2.5s ease-in-out 2s infinite; opacity: 0; color: var(--text-dim); cursor: pointer; }
  @keyframes heroIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes bob { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(10px); } }

  /* SECTIONS */
  .section { padding: 140px 48px; max-width: 1140px; margin: 0 auto; }
  .section-label { font-size: 10px; letter-spacing: 6px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 10px; font-weight: 600; }
  .section-title { font-family: var(--font-display); font-size: clamp(52px, 8vw, 88px); letter-spacing: 4px; line-height: 0.95; margin-bottom: 16px; }
  .section-line { width: 48px; height: 1px; background: var(--border-light); margin-bottom: 56px; }

  /* ABOUT */
  .about-layout { display: grid; grid-template-columns: 320px 1fr; gap: 72px; align-items: start; }
  .about-photo { width: 100%; aspect-ratio: 2/3; background: var(--bg-card); border: 1px solid var(--border); position: relative; overflow: hidden; }
  .about-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .about-text p { color: var(--text-mid); font-size: 14.5px; line-height: 1.85; margin-bottom: 20px; }
  .about-text p:first-child { color: var(--accent); font-size: 15.5px; }
  .about-note { font-size: 12.5px !important; color: var(--text-dim) !important; font-style: italic; padding-top: 8px; border-top: 1px solid var(--border); margin-top: 12px; }
  .highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 40px; }
  .h-card { background: var(--bg-card); border: 1px solid var(--border); padding: 22px 24px; transition: all 0.3s var(--ease); }
  .h-card:hover { border-color: var(--border-light); transform: translateY(-2px); }
  .h-card-label { font-family: var(--font-display); font-size: 20px; letter-spacing: 1px; }
  .h-card-detail { font-size: 11px; color: var(--text-dim); letter-spacing: 1px; margin-top: 2px; }
  .residencies { margin-top: 36px; }
  .res-title { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 14px; font-weight: 600; }
  .res-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .res-tag { font-size: 11px; color: var(--text-dim); padding: 5px 12px; border: 1px solid var(--border); letter-spacing: 0.3px; transition: all 0.3s; }
  .res-tag:hover { border-color: var(--text-dim); color: var(--text-mid); }

  /* MUSIC */
  .music-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .music-inner { max-width: 1140px; margin: 0 auto; padding: 140px 48px; }
  .music-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .m-card { background: var(--bg-card); border: 1px solid var(--border); padding: 28px; transition: all 0.3s var(--ease); cursor: pointer; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 14px; }
  .m-card:hover { border-color: var(--border-light); transform: translateY(-3px); }
  .m-card-icon { color: var(--text-dim); }
  .m-card-name { font-family: var(--font-display); font-size: 22px; letter-spacing: 1px; }
  .m-card-desc { font-size: 12.5px; color: var(--text-dim); line-height: 1.65; flex: 1; }
  .m-card-link { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim); display: flex; align-items: center; gap: 6px; transition: color 0.3s; }
  .m-card:hover .m-card-link { color: var(--text); }
  .sc-embed { margin-top: 32px; border: 1px solid var(--border); overflow: hidden; }

  /* VIDEO */
  .video-block { margin-top: 56px; }
  .video-label { font-size: 10px; letter-spacing: 5px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 16px; font-weight: 600; }
  .video-frame { width: 100%; aspect-ratio: 16/9; border: 1px solid var(--border); background: #000; overflow: hidden; }
  .video-frame iframe { width: 100%; height: 100%; border: none; }
  .video-more { margin-top: 14px; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); text-decoration: none; transition: color 0.3s; }
  .video-more:hover { color: var(--text); }

  /* DATES */
  .dates-empty { text-align: center; padding: 72px 0; }
  .dates-empty-title { font-family: var(--font-display); font-size: 28px; letter-spacing: 3px; color: var(--text-mid); margin-bottom: 10px; }
  .dates-empty-sub { font-size: 13px; color: var(--text-dim); }

  /* EPK */
  .epk-bar { margin-top: 64px; padding: 32px 36px; background: var(--bg-card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 24px; transition: border-color 0.3s; }
  .epk-bar:hover { border-color: var(--border-light); }
  .epk-info h3 { font-family: var(--font-display); font-size: 22px; letter-spacing: 2px; margin-bottom: 4px; }
  .epk-info p { font-size: 12px; color: var(--text-dim); letter-spacing: 0.5px; }
  .epk-btn { display: inline-flex; align-items: center; gap: 10px; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--text); text-decoration: none; padding: 12px 28px; border: 1px solid var(--border-light); transition: all 0.3s; white-space: nowrap; font-family: var(--font-body); font-weight: 600; }
  .epk-btn:hover { background: var(--text); color: var(--bg); border-color: var(--text); }

  /* CONTACT */
  .contact-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); }
  .contact-inner { max-width: 1140px; margin: 0 auto; padding: 140px 48px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; }
  .contact-email { display: flex; align-items: center; gap: 14px; color: var(--text); text-decoration: none; font-size: 14px; letter-spacing: 0.5px; padding: 20px 0; border-bottom: 1px solid var(--border); transition: all 0.3s; }
  .contact-email:hover { padding-left: 8px; }
  .contact-email svg { color: var(--text-dim); flex-shrink: 0; }
  .contact-social { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text-dim); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; transition: all 0.3s; font-weight: 500; }
  .contact-social:first-child { border-top: 1px solid var(--border); }
  .contact-social:hover { color: var(--text); padding-left: 8px; }

  /* FOOTER */
  .footer { padding: 36px 48px; text-align: center; font-size: 10px; color: var(--text-dim); letter-spacing: 3px; border-top: 1px solid var(--border); }
  .footer-links { margin-top: 12px; display: flex; justify-content: center; gap: 24px; }
  .footer-link { background: none; border: none; color: var(--text-dim); font-family: var(--font-body); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: color 0.3s; padding: 0; }
  .footer-link:hover { color: var(--text-mid); }

  /* LEGAL MODAL */
  .legal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; justify-content: center; align-items: flex-start; padding: 60px 24px; overflow-y: auto; }
  .legal-box { background: var(--bg); border: 1px solid var(--border-light); max-width: 720px; width: 100%; padding: 56px 48px; position: relative; }
  .legal-close { position: absolute; top: 20px; right: 20px; background: none; border: 1px solid var(--border); color: var(--text-dim); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; transition: all 0.3s; font-family: var(--font-body); }
  .legal-close:hover { color: var(--text); border-color: var(--text-mid); }
  .legal-title { font-family: var(--font-display); font-size: 36px; letter-spacing: 3px; margin-bottom: 8px; }
  .legal-subtitle { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 36px; font-weight: 600; }
  .legal-section { margin-bottom: 28px; }
  .legal-section h3 { font-family: var(--font-display); font-size: 20px; letter-spacing: 1px; margin-bottom: 10px; color: var(--accent); }
  .legal-section p, .legal-section li { color: var(--text-mid); font-size: 13px; line-height: 1.8; }
  .legal-section ul { list-style: none; padding: 0; }
  .legal-section ul li::before { content: '—'; color: var(--text-dim); margin-right: 10px; }
  .legal-section a { color: var(--text-mid); text-decoration: underline; text-underline-offset: 3px; transition: color 0.3s; }
  .legal-section a:hover { color: var(--text); }
  .legal-placeholder { background: var(--bg-card); border: 1px dashed var(--border-light); padding: 20px 24px; color: var(--text-dim); font-size: 12px; line-height: 1.7; letter-spacing: 0.3px; margin-top: 8px; }

  /* GRAIN */
  .grain { position: fixed; inset: 0; pointer-events: none; z-index: 200; opacity: 0.02; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 256px; }

  /* REVEAL */
  .rv { opacity: 0; transform: translateY(36px); transition: all 0.9s var(--ease); }
  .rv.vis { opacity: 1; transform: translateY(0); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .nav { padding: 18px 24px; }
    .nav.scrolled { padding: 14px 24px; }
    .nav-links { display: none; }
    .menu-btn { display: block; }
    .section, .music-inner, .contact-inner { padding: 100px 24px; }
    .about-layout { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { max-width: 300px; }
    .music-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .highlights { grid-template-columns: 1fr 1fr; }
    .epk-bar { flex-direction: column; align-items: flex-start; }
    .hero-name { letter-spacing: 6px; }
  }
  @media (max-width: 480px) {
    .highlights { grid-template-columns: 1fr; }
    .section, .music-inner, .contact-inner { padding: 80px 20px; }
    .hero-sub { font-size: 9px; letter-spacing: 4px; }
  }
`;

// ─── Reveal Hook ───
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Rv({ children, delay = 0, className = "" }) {
  const [ref, vis] = useReveal();
  return <div ref={ref} className={`rv ${vis ? "vis" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

// ─── Main ───
export default function MaxHefele() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // null | "impressum" | "datenschutz"

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <style>{css}</style>
      <div className="grain" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{ARTIST_NAME}</span>
        <ul className="nav-links">
          {NAV_ITEMS.map(item => (
            <li key={item}><a href={`#${item.toLowerCase()}`} onClick={e => { e.preventDefault(); go(item.toLowerCase()); }}>{item}</a></li>
          ))}
        </ul>
        <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={e => { e.preventDefault(); go(item.toLowerCase()); }}>{item}</a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" style={{ background: `linear-gradient(180deg, rgba(6,6,6,0.3) 0%, rgba(6,6,6,0.15) 40%, rgba(6,6,6,0.7) 80%, rgba(6,6,6,1) 100%), url('${import.meta.env.BASE_URL}images/hero.jpg') center 30% / cover no-repeat` }} />
        <div className="hero-grain" />
        <div className="hero-content">
          <h1 className="hero-name">{ARTIST_NAME}</h1>
          <p className="hero-sub">Melodic Techno &nbsp;·&nbsp; Indie Dance &nbsp;·&nbsp; Süddeutschland</p>
          <div className="hero-line" />
          <div className="hero-socials">
            {SOCIAL_LINKS.map(s => {
              const Icon = Icons[s.icon];
              return <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}><Icon /></a>;
            })}
          </div>
        </div>
        <div className="scroll-hint" onClick={() => go("about")}><Icons.ChevronDown /></div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <Rv>
          <p className="section-label">About</p>
          <h2 className="section-title">{ARTIST_NAME}</h2>
          <div className="section-line" />
        </Rv>
        <div className="about-layout">
          <Rv delay={100}>
            <div className="about-photo">
              <img src={`${import.meta.env.BASE_URL}images/about.jpg`} alt="Max Hefele Press Photo" loading="lazy" />
            </div>
          </Rv>
          <div>
            <Rv delay={150}>
              <div className="about-text">
                <p>Max Hefele steht für melodischen Techno mit einem klaren Fokus auf Atmosphäre und musikalischen Aufbau. Mit einem guten Gespür für Timing und Dynamik schafft er einen Flow, der den Dancefloor trägt — von ruhigen, hypnotischen Momenten bis zu treibender Energie.</p>
                <p>Der aus Süddeutschland stammende DJ ist seit vielen Jahren Teil der elektronischen Clubkultur. Seine musikalische Reise begann früh hinter den Decks und führte ihn über zahlreiche Clubnächte und Events, bei denen er sich einen Ruf für stilvolle, dramaturgisch aufgebaute Sets erspielt hat.</p>
                <p>Neben seiner Arbeit als DJ produziert Max Hefele seit Jahren eigene Tracks und hat über die Zeit ein umfangreiches Repertoire an Produktionen aufgebaut. Erste Veröffentlichungen aus diesem Fundus erscheinen demnächst auf dem Label MYR-Recordings.</p>
                <p className="about-note">Bis 2026 trat er unter dem Künstlernamen Mexx Pain auf.</p>
              </div>
            </Rv>
            <Rv delay={250}>
              <div className="highlights">
                {HIGHLIGHTS.map(h => (
                  <div className="h-card" key={h.label}>
                    <div className="h-card-label">{h.label}</div>
                    <div className="h-card-detail">{h.detail}</div>
                  </div>
                ))}
              </div>
            </Rv>
            <Rv delay={300}>
              <div className="residencies">
                <div className="res-title">Residencies</div>
                <div className="res-list">
                  {RESIDENCIES.map(r => <span className="res-tag" key={r}>{r}</span>)}
                </div>
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section className="music-wrap" id="music">
        <div className="music-inner">
          <Rv>
            <p className="section-label">Listen</p>
            <h2 className="section-title">MUSIC</h2>
            <div className="section-line" />
          </Rv>
          <Rv delay={100}>
            <div className="music-grid">
              <a className="m-card" href="https://soundcloud.com/dj-mexx-pain" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.SC /></div>
                <div className="m-card-name">SOUNDCLOUD</div>
                <div className="m-card-desc">Mixes, eigene Tracks und der „Rave in the City" Podcast. Erste Releases demnächst auf MYR-Recordings.</div>
                <div className="m-card-link">Anhören <Icons.Arrow /></div>
              </a>
              <a className="m-card" href="https://www.youtube.com/@djmexxpain" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.YT /></div>
                <div className="m-card-name">YOUTUBE</div>
                <div className="m-card-desc">Rave in the City — der Video-Podcast mit Sets und visuellen Erlebnissen alle zwei Wochen.</div>
                <div className="m-card-link">Ansehen <Icons.Arrow /></div>
              </a>
              <a className="m-card" href="https://www.mixcloud.com/mexxpain7/" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.MC /></div>
                <div className="m-card-name">MIXCLOUD</div>
                <div className="m-card-desc">Komplette DJ-Sets und Live-Mitschnitte — die volle musikalische Reise.</div>
                <div className="m-card-link">Anhören <Icons.Arrow /></div>
              </a>
            </div>
          </Rv>
          <Rv delay={150}>
            <div className="sc-embed">
              <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/dj-mexx-pain&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" style={{ border: 0 }} title="SoundCloud Player" />
            </div>
          </Rv>
          <Rv delay={200}>
            <div className="video-block">
              <div className="video-label">Latest Video</div>
              <div className="video-frame">
                <iframe src={GOOGLE_DRIVE.firstVideo} allow="autoplay; encrypted-media" allowFullScreen title="Latest Video" />
              </div>
              <a className="video-more" href={GOOGLE_DRIVE.videos} target="_blank" rel="noopener noreferrer">
                Alle Videos ansehen <Icons.Arrow />
              </a>
            </div>
          </Rv>
        </div>
      </section>

      {/* DATES */}
      <section className="section" id="dates">
        <Rv>
          <p className="section-label">Live</p>
          <h2 className="section-title">DATES</h2>
          <div className="section-line" />
        </Rv>
        <Rv delay={100}>
          <div className="dates-empty">
            <div className="dates-empty-title">NEUE TERMINE WERDEN BALD BEKANNTGEGEBEN</div>
            <div className="dates-empty-sub">Für Booking-Anfragen bitte Kontakt aufnehmen.</div>
          </div>
        </Rv>
        <Rv delay={200}>
          <div className="epk-bar">
            <div className="epk-info">
              <h3>PRESS KIT / EPK</h3>
              <p>Bio, Pressefotos, Logo, Technical Rider — alles zum Download.</p>
            </div>
            <a className="epk-btn" href={GOOGLE_DRIVE.pressKit} target="_blank" rel="noopener noreferrer">
              <Icons.Download /> Press Kit
            </a>
          </div>
        </Rv>
      </section>

      {/* CONTACT */}
      <section className="contact-wrap" id="contact">
        <div className="contact-inner">
          <Rv>
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">CONTACT</h2>
            <div className="section-line" />
          </Rv>
          <div className="contact-grid">
            <div>
              <Rv delay={100}>
                <p style={{ color: "var(--text-dim)", fontSize: "13.5px", lineHeight: "1.8", marginBottom: "28px" }}>
                  Für Booking-Anfragen, Kooperationen oder allgemeine Fragen — einfach eine Nachricht schicken.
                </p>
                <a className="contact-email" href="mailto:booking.djmexxpain@gmail.com">
                  <Icons.Mail />
                  booking.djmexxpain@gmail.com
                </a>
              </Rv>
            </div>
            <div>
              <Rv delay={200}>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.name} className="contact-social" href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.name} <Icons.Arrow />
                  </a>
                ))}
              </Rv>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>© {new Date().getFullYear()} {ARTIST_NAME} — ALL RIGHTS RESERVED</div>
        <div className="footer-links">
          <button className="footer-link" onClick={() => setLegalModal("impressum")}>Impressum</button>
          <button className="footer-link" onClick={() => setLegalModal("datenschutz")}>Datenschutz</button>
        </div>
      </footer>

      {/* LEGAL MODALS */}
      {legalModal && (
        <div className="legal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setLegalModal(null); }}>
          <div className="legal-box">
            <button className="legal-close" onClick={() => setLegalModal(null)}>×</button>

            {legalModal === "impressum" && (
              <>
                <h2 className="legal-title">IMPRESSUM</h2>
                <p className="legal-subtitle">Angaben gemäß § 5 TMG</p>

                <div className="legal-section">
                  <h3>Verantwortlich</h3>
                  <div className="legal-placeholder">
                    ⚠️ PLATZHALTER — Bitte mit echten Daten ersetzen:<br/><br/>
                    Max Hefele<br/>
                    [Straße und Hausnummer]<br/>
                    [PLZ Ort]<br/>
                    Deutschland
                  </div>
                </div>

                <div className="legal-section">
                  <h3>Kontakt</h3>
                  <p>
                    E-Mail: <a href="mailto:booking.djmexxpain@gmail.com">booking.djmexxpain@gmail.com</a>
                  </p>
                  <div className="legal-placeholder">
                    ⚠️ Optional: Telefonnummer ergänzen
                  </div>
                </div>

                <div className="legal-section">
                  <h3>Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV</h3>
                  <div className="legal-placeholder">
                    ⚠️ PLATZHALTER:<br/><br/>
                    Max Hefele<br/>
                    [Adresse wie oben]
                  </div>
                </div>

                <div className="legal-section">
                  <h3>Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter ist der Betreiber gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG besteht jedoch keine Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen.
                  </p>
                </div>

                <div className="legal-section">
                  <h3>Haftung für Links</h3>
                  <p>
                    Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div className="legal-section">
                  <h3>Urheberrecht</h3>
                  <p>
                    Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </>
            )}

            {legalModal === "datenschutz" && (
              <>
                <h2 className="legal-title">DATENSCHUTZ</h2>
                <p className="legal-subtitle">Datenschutzerklärung</p>

                <div className="legal-section">
                  <h3>1. Verantwortlicher</h3>
                  <div className="legal-placeholder">
                    ⚠️ PLATZHALTER — Bitte mit echten Daten ersetzen:<br/><br/>
                    Max Hefele<br/>
                    [Straße und Hausnummer]<br/>
                    [PLZ Ort]<br/>
                    E-Mail: booking.djmexxpain@gmail.com
                  </div>
                </div>

                <div className="legal-section">
                  <h3>2. Allgemeines zur Datenverarbeitung</h3>
                  <p>
                    Der Schutz personenbezogener Daten ist dem Betreiber ein wichtiges Anliegen. Die Nutzung dieser Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich.
                  </p>
                </div>

                <div className="legal-section">
                  <h3>3. Hosting</h3>
                  <div className="legal-placeholder">
                    ⚠️ PLATZHALTER — Je nach Hosting-Anbieter anpassen:<br/><br/>
                    Diese Website wird bei [Netlify / GitHub Pages / Cloudflare Pages] gehostet. Der Hosting-Anbieter erhebt in sog. Logfiles folgende Daten: IP-Adresse, Datum und Uhrzeit der Anfrage, Zeitzonendifferenz zur GMT, Inhalt der Anforderung, HTTP-Statuscode, übertragene Datenmenge, Referrer-URL, Browser-Typ und -Version, Betriebssystem.<br/><br/>
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der Website).
                  </div>
                </div>

                <div className="legal-section">
                  <h3>4. Eingebettete Inhalte</h3>
                  <p>
                    Diese Website bindet Inhalte von externen Plattformen ein. Beim Laden dieser Inhalte werden Daten an den jeweiligen Anbieter übertragen:
                  </p>
                  <ul>
                    <li><strong>SoundCloud</strong> (SoundCloud Limited, Berlin) — Eingebetteter Audio-Player. <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a></li>
                    <li><strong>Google Drive / Google Fonts</strong> (Google Ireland Limited) — Eingebettete Videos und Schriften. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a></li>
                  </ul>
                  <p style={{ marginTop: "12px" }}>
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Darstellung von Musikinhalten).
                  </p>
                  <div className="legal-placeholder">
                    ⚠️ HINWEIS: Da externe Embeds Daten an Drittanbieter übermitteln, sollte ggf. ein Cookie-Consent-Banner implementiert werden, der diese Embeds erst nach Einwilligung lädt.
                  </div>
                </div>

                <div className="legal-section">
                  <h3>5. Links zu externen Websites</h3>
                  <p>
                    Diese Website enthält Links zu externen Plattformen (Instagram, Facebook, YouTube, SoundCloud, Mixcloud). Die Datenverarbeitung auf diesen Plattformen unterliegt den jeweiligen Datenschutzerklärungen der Anbieter.
                  </p>
                </div>

                <div className="legal-section">
                  <h3>6. Kontaktaufnahme per E-Mail</h3>
                  <p>
                    Bei der Kontaktaufnahme per E-Mail werden die von Ihnen mitgeteilten Daten zur Bearbeitung der Anfrage gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                  </p>
                </div>

                <div className="legal-section">
                  <h3>7. Ihre Rechte</h3>
                  <p>Sie haben das Recht auf:</p>
                  <ul>
                    <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
                    <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                    <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                    <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                  </ul>
                  <p style={{ marginTop: "12px" }}>
                    Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
                  </p>
                </div>

                <div className="legal-section">
                  <h3>8. Änderungen</h3>
                  <p>
                    Diese Datenschutzerklärung kann bei Bedarf angepasst werden, um gesetzlichen Änderungen Rechnung zu tragen.
                  </p>
                  <div className="legal-placeholder">
                    ⚠️ Stand: [Datum einfügen, z.B. März 2026]
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
