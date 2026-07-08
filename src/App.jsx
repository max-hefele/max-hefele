import { useState, useEffect, useRef } from "react";

// ─── Config ───
const ARTIST_NAME = "MAXHEFELE";

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/max.hefele.music/", icon: "IG" },
  { name: "SoundCloud", url: "https://soundcloud.com/maxhefele", icon: "SC" },
  { name: "YouTube", url: "https://www.youtube.com/@MaxHefele", icon: "YT" },
  { name: "Mixcloud", url: "https://www.mixcloud.com/MaxHefele/", icon: "MC" },
  { name: "Spotify", url: "#", icon: "SP", soon: true },
  { name: "Beatport", url: "#", icon: "BP", soon: true },
];

const NAV_ITEMS = ["About", "Music", "Dates", "Contact"];

const GOOGLE_DRIVE = {
  videos: "https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0",
};

const VIDEO_IDS = [
  "1x1dK3ECiPqBgl3x9C4AkhDJRsvmdKetg",
  "1X9EQjdtchvJAmKsRb8YFbhk1AWN02iPH",
  "1S0OZCmvRVf6cTdqfnIeFgsohICHcvES1",
  "1lXFgUJirrz8qA-6Ni04iVpfkqiWXfH5g",
  "16V3xOlMDs817LPzNDWm9AZTJWZ1JMz8B",
  "1fqwwCK1xxJsohmpWcWlrFne-NBIWTAqj",
  "1icwk_hpgDJKz4J7ktGzfu5oth9huW0hI",
  "1zZ4PanhXvNvCT6TXVW9slITDBrMYtwIJ",
  "1t8rpnyLjV-pt-XFXS108gfDvomQTV1Gw",
  "1W4eYUtmmDKoGH5lSQP9gvhMdtTqM-ZGY",
];

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
  SP: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.59 14.42a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.11a.62.62 0 0 1 .21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.5c3.63-1.1 8.15-.56 11.24 1.34a.78.78 0 0 1 .25 1.07zm.11-2.84C14.8 8.99 9.4 8.78 6.3 9.72a.94.94 0 1 1-.54-1.8c3.56-1.08 9.52-.87 13.27 1.35a.94.94 0 0 1-.96 1.61z"/>
    </svg>
  ),
  BP: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5.5a1 1 0 0 1 2 0v4.05l3.04 1.76a1 1 0 0 1-1 1.73l-3.54-2.04A1 1 0 0 1 11 12V7.5z"/>
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
  .hero-line { width: 40px; height: 1px; background: var(--text-dim); margin: 32px 0; animation: heroIn 1.4s var(--ease) 0.15s forwards; opacity: 0; }
  .hero-socials { display: flex; gap: 14px; animation: heroIn 1.4s var(--ease) 0.25s forwards; opacity: 0; }
  .hero-socials a { color: var(--text-dim); display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border: 1px solid var(--border-light); border-radius: 50%; transition: all 0.3s var(--ease); text-decoration: none; }
  .hero-socials a:hover { color: var(--text); border-color: var(--text-mid); transform: translateY(-3px); }
  .hero-social-soon { color: #333; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border: 1px dashed var(--border-light); border-radius: 50%; cursor: default; opacity: 0.5; }
  .scroll-hint { position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%); animation: heroIn 1.4s var(--ease) 0.45s forwards, bob 2.5s ease-in-out 1.8s infinite; opacity: 0; color: var(--text-dim); cursor: pointer; }
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
  .video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .video-frame { width: 100%; aspect-ratio: 16/9; border: 1px solid var(--border); background: #000; overflow: hidden; }
  .video-frame iframe { width: 100%; height: 100%; border: none; }
  .video-more { margin-top: 20px; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); text-decoration: none; transition: color 0.3s; }
  .video-more:hover { color: var(--text); }

  /* DATES */
  .dates-empty { text-align: center; padding: 72px 0; }
  .dates-empty-title { font-family: var(--font-display); font-size: 28px; letter-spacing: 3px; color: var(--text-mid); margin-bottom: 10px; }
  .dates-empty-sub { font-size: 13px; color: var(--text-dim); }

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
  .contact-social-soon { color: #444; cursor: default; }
  .contact-social-soon:hover { padding-left: 0; color: #444; }
  .soon-badge { font-size: 9px; letter-spacing: 1px; padding: 3px 8px; border: 1px solid var(--border-light); color: var(--text-dim); border-radius: 2px; }

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
    .video-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .highlights { grid-template-columns: 1fr 1fr; }
    .hero-name { letter-spacing: 6px; }
  }
  @media (max-width: 480px) {
    .highlights { grid-template-columns: 1fr; }
    .section, .music-inner, .contact-inner { padding: 80px 20px; }
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
          <div className="hero-line" />
          <div className="hero-socials">
            {SOCIAL_LINKS.map(s => {
              const Icon = Icons[s.icon];
              if (s.soon) {
                return <span key={s.name} className="hero-social-soon" title={`${s.name} — bald verfügbar`}><Icon /></span>;
              }
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
                <p>Max Hefele steht für 20 Jahre Clubkultur.</p>
                <p>Als Resident unter dem Namen Mexx Pain kam er aus dem Hip-Hop und lernte früh: Zwei Plattenspieler sind mehr als nur Technik. Mit Instinkt, Präzision und perfektem Timing formte er ganze Nächte. Er weiß, wie man Crowds bewegt und die Energie eines Raumes lenkt.</p>
                <p>Genau diese Erfahrung prägt heute seine Melodic Techno Sets. Max Hefele spielt keine Setlisten von der Stange. Er liest den Raum, baut Spannung auf, hält sie aus und weiß exakt, wann ein Track sitzen muss.</p>
                <p>Nach zwei Jahrzehnten hinter den Decks macht der eigene Name sichtbar, was ihn geformt hat: der Weg vom Hip-Hop zur elektronischen Musik, ohne die Wurzeln zu kappen.</p>
                <p>Sein Sound setzt nicht auf Effekte. Er setzt auf Spannung, Tiefe und den richtigen Moment. Diese Souveränität hört man auch im Studio. Mit der Debüt-EP auf MYR Records beginnt das nächste Kapitel seiner Geschichte.</p>
                <p>Parallel dazu erscheint alle zwei Wochen seine musikalische Vision in der YouTube-Reihe „Rave in the City". Eine Stunde, die zeigt, worum es geht. Qualität statt Quantität. Erfahrung statt Zufall. Keine Show. Nur Musik.</p>
                <p>Max Hefele bringt etwas mit, das selten geworden ist: echte Club-Erfahrung und die Fähigkeit, komplette Nächte zu gestalten, ohne den roten Faden zu verlieren.</p>
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
              <a className="m-card" href="https://soundcloud.com/maxhefele" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.SC /></div>
                <div className="m-card-name">SOUNDCLOUD</div>
                <div className="m-card-desc">Mixes, eigene Tracks und die „Rave in the City" Reihe. Debüt-EP demnächst auf MYR Records.</div>
                <div className="m-card-link">Anhören <Icons.Arrow /></div>
              </a>
              <a className="m-card" href="https://www.youtube.com/@MaxHefele" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.YT /></div>
                <div className="m-card-name">YOUTUBE</div>
                <div className="m-card-desc">Rave in the City — kuratierte Ein-Stunden-Sets, alle zwei Wochen neu.</div>
                <div className="m-card-link">Ansehen <Icons.Arrow /></div>
              </a>
              <a className="m-card" href="https://www.mixcloud.com/MaxHefele/" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.MC /></div>
                <div className="m-card-name">MIXCLOUD</div>
                <div className="m-card-desc">Komplette DJ-Sets und Live-Mitschnitte — die volle musikalische Reise.</div>
                <div className="m-card-link">Anhören <Icons.Arrow /></div>
              </a>
            </div>
          </Rv>
          <Rv delay={150}>
            <div className="sc-embed">
              <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/maxhefele&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" style={{ border: 0 }} title="SoundCloud Player" />
            </div>
          </Rv>
          <Rv delay={200}>
            <div className="video-block">
              <div className="video-label">Videos</div>
              <div className="video-grid">
                {VIDEO_IDS.map((id, i) => (
                  <div className="video-frame" key={id}>
                    <iframe src={`https://drive.google.com/file/d/${id}/preview`} allow="autoplay; encrypted-media" allowFullScreen title={`Video ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
              <a className="video-more" href={GOOGLE_DRIVE.videos} target="_blank" rel="noopener noreferrer">
                Alle Videos auf Google Drive <Icons.Arrow />
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
                <a className="contact-email" href="mailto:info@maxhefele.de">
                  <Icons.Mail />
                  info@maxhefele.de
                </a>
              </Rv>
            </div>
            <div>
              <Rv delay={200}>
                {SOCIAL_LINKS.map(s => (
                  s.soon ? (
                    <span key={s.name} className="contact-social contact-social-soon">
                      {s.name} <span className="soon-badge">bald</span>
                    </span>
                  ) : (
                    <a key={s.name} className="contact-social" href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.name} <Icons.Arrow />
                    </a>
                  )
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
                    Max Hefele<br/>
                    Kapellenfeld 3 <br/>
                    86865 Markt Wald <br/>
                    Deutschland
                  </div>
                </div>

                <div className="legal-section">
                  <h3>Kontakt</h3>
                  <p>
                    E-Mail: <a href="mailto:info@maxhefele.de">info@maxhefele.de</a>
                  </p>
                  <div className="legal-placeholder">
                    
                  </div>
                </div>

                <div className="legal-section">
                  <h3>Inhaltlich verantwortlich gemäß § 55 Abs. 2 RStV</h3>
                  <div className="legal-placeholder">:
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
    <p className="legal-subtitle">Datenschutzerklärung (DSGVO)</p>

    <div className="legal-section">
      <h3>1. Datenschutz auf einen Blick</h3>
      <h4>Allgemeine Hinweise</h4>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen[cite: 1]. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können[cite: 1]. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung[cite: 1].
      </p>

      <h4>Datenerfassung auf dieser Website</h4>
      <h5>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h5>
      <p>
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber[cite: 1]. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen[cite: 1].
      </p>

      <h5>Wie erfassen wir Ihre Daten?</h5>
      <p>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen[cite: 1]. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben[cite: 1].
      </p>
      <p>
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst[cite: 1]. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs)[cite: 1]. Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten[cite: 1].
      </p>

      <h5>Wofür nutzen wir Ihre Daten?</h5>
      <p>
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten[cite: 1]. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden[cite: 1]. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet[cite: 1].
      </p>

      <h5>Welche Rechte haben Sie bezüglich Ihrer Daten?</h5>
      <p>
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten[cite: 1]. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen[cite: 1]. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen[cite: 1]. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen[cite: 1]. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu[cite: 1].
      </p>
      <p>
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden[cite: 1].
      </p>
    </div>

    <div className="legal-section">
      <h3>2. Hosting</h3>
      <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:[cite: 1]</p>
      <h4>Strato</h4>
      <p>
        Anbieter ist die Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend „Strato“)[cite: 1]. Wenn Sie unsere Website besuchen, erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen[cite: 1].
      </p>
      <p>
        Weitere Informationen entnehmen Sie der Datenschutzerklärung von Strato:{" "}
        <a href="https://www.strato.de/datenschutz/" target="_blank" rel="noopener noreferrer">
          https://www.strato.de/datenschutz/
        </a>[cite: 1].
      </p>
      <p>
        Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO[cite: 1]. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website[cite: 1]. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1].
      </p>
      <h4>Auftragsverarbeitung</h4>
      <p>
        Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen[cite: 1]. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet[cite: 1].
      </p>
    </div>

    <div className="legal-section">
      <h3>3. Allgemeine Hinweise und Pflichtinformationen</h3>
      <h4>Datenschutz</h4>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst[cite: 1]. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung[cite: 1].
      </p>
      <p>
        Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben[cite: 1]. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können[cite: 1]. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen[cite: 1]. Sie erläutert auch, wie und zu welchem Zweck das geschieht[cite: 1].
      </p>
      <p>
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann[cite: 1]. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich[cite: 1].
      </p>

      <h4>Hinweis zur verantwortlichen Stelle</h4>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:[cite: 1]<br />
        <strong>Max Hefele</strong>[cite: 1]<br />
        xxxasdsa[cite: 1]<br />
        Telefon: +49 xxx[cite: 1]<br />
        E-Mail: max.hefele@gmx.de[cite: 1]
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet[cite: 1].
      </p>

      <h4>Speicherdauer</h4>
      <p>
        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt[cite: 1]. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe[cite: 1].
      </p>

      <h4>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h4>
      <p>
        Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden[cite: 1]. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO[cite: 1]. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1]. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO[cite: 1]. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO[cite: 1]. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen[cite: 1]. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert[cite: 1].
      </p>

      <h4>Empfänger von personenbezogenen Daten</h4>
      <p>
        Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen[cite: 1]. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich[cite: 1]. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt[cite: 1]. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter[cite: 1]. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen[cite: 1].
      </p>

      <h4>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h4>
      <p>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich[cite: 1]. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen[cite: 1]. Die Rechtmäßigkeit der bis zum Widerruf erfolgte Datenverarbeitung bleibt vom Widerruf unberührt[cite: 1].
      </p>

      <h4>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h4>
      <blockquote>
        <p>
          <strong>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING[cite: 1]. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG[cite: 1]. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO)[cite: 1].</strong>
        </p>
        <p>
          <strong>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT[cite: 1]. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO)[cite: 1].</strong>
        </p>
      </blockquote>

      <h4>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h4>
      <p>
        Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu[cite: 1]. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe[cite: 1].
      </p>

      <h4>Recht auf Datenübertragbarkeit</h4>
      <p>
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen[cite: 1]. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist[cite: 1].
      </p>

      <h4>Auskunft, Berichtigung und Löschung</h4>
      <p>
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten[cite: 1]. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden[cite: 1].
      </p>

      <h4>Recht auf Einschränkung der Verarbeitung</h4>
      <p>
        Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen[cite: 1]. Hierzu können Sie sich jederzeit an uns wenden[cite: 1]. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:[cite: 1]
      </p>
      <ul>
        <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen[cite: 1]. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen[cite: 1].</li>
        <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen[cite: 1].</li>
        <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen[cite: 1].</li>
        <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden[cite: 1]. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen[cite: 1].</li>
      </ul>
      <p>
        Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten - von ihrer Speicherung abgesehen - nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden[cite: 1].
      </p>

      <h4>SSL- bzw. TLS-Verschlüsselung</h4>
      <p>
        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung[cite: 1]. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile[cite: 1].
      </p>
      <p>
        Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden[cite: 1].
      </p>
    </div>

    <div className="legal-section">
      <h3>4. Datenerfassung auf dieser Website</h3>
      <h4>Cookies</h4>
      <p>
        Unsere Internetseiten verwenden so genannte „Cookies“[cite: 1]. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an[cite: 1]. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert[cite: 1]. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht[cite: 1]. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt[cite: 1].
      </p>
      <p>
        Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies)[cite: 1]. Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen)[cite: 1].
      </p>
      <p>
        Cookies haben verschiedene Funktionen[cite: 1]. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos)[cite: 1]. Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden[cite: 1].
      </p>
      <p>
        Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird[cite: 1]. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste[cite: 1]. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar[cite: 1].
      </p>
      <p>
        Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren[cite: 1]. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein[cite: 1].
      </p>

      <h4>Kontaktformular</h4>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert[cite: 1]. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter[cite: 1].
      </p>
      <p>
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist[cite: 1]. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar[cite: 1].
      </p>
      <p>
        Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage)[cite: 1]. Zwingende gesetzliche Bestimmungen - insbesondere Aufbewahrungsfristen - bleiben unberührt[cite: 1].
      </p>

      <h4>Anfrage per E-Mail, Telefon oder Telefax</h4>
      <p>
        Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet[cite: 1]. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter[cite: 1].
      </p>
      <p>
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist[cite: 1]. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar[cite: 1].
      </p>
      <p>
        Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens)[cite: 1]. Zwingende gesetzliche Bestimmungen - insbesondere gesetzliche Aufbewahrungsfristen - bleiben unberührt[cite: 1].
      </p>
    </div>

    <div className="legal-section">
      <h3>5. Soziale Medien</h3>
      <h4>Facebook</h4>
      <p>
        Auf dieser Website sind Elemente des sozialen Netzwerks Facebook integriert[cite: 1]. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland[cite: 1]. Die erfassten Daten werden nach Aussage von Facebook jedoch auch in die USA und in andere Drittländer übertragen[cite: 1].
      </p>
      <p>
        Eine Übersicht über die Facebook Social-Media-Elemente finden Sie hier:{" "}
        <a href="https://developers.facebook.com/docs/plugins/?locale=de_DE" target="_blank" rel="noopener noreferrer">
          https://developers.facebook.com/docs/plugins/?locale=de_DE
        </a>[cite: 1].
      </p>
      <p>
        Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Facebook-Server hergestellt[cite: 1]. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse diese Website besucht haben[cite: 1]. Wenn Sie den Facebook „Like-Button“ anklicken, während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte dieser Website auf Ihrem Facebook-Profil verlinken[cite: 1]. Dadurch kann Facebook den Besuch dieser Website Ihrem Benutzerkonto zuordnen[cite: 1]. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten[cite: 1]. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter:{" "}
        <a href="https://de-de.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer">
          https://de-de.facebook.com/privacy/explanation
        </a>[cite: 1].
      </p>
      <p>
        Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1].
      </p>
      <p>
        Soweit mit Hilfe des hier beschriebenen Tools personenbezogene Daten auf unserer Website erfasst und an Facebook weitergeleitet werden, sind wir und die Meta Platforms Ireland Limited gemeinsam für diese Datenverarbeitung verantwortlich (Art. 26 DSGVO)[cite: 1]. Die gemeinsame Verantwortlichkeit beschränkt sich dabei ausschließlich auf die Erfassung der Daten und deren Weitergabe an Facebook[cite: 1]. Die nach der Weiterleitung erfolgende Verarbeitung durch Facebook ist nicht Teil der gemeinsamen Verantwortung[cite: 1]. Die uns gemeinsam obliegenden Verpflichtungen wurden in einer Vereinbarung über gemeinsame Verarbeitung festgehalten:{" "}
        <a href="https://www.facebook.com/legal/controller_addendum" target="_blank" rel="noopener noreferrer">
          https://www.facebook.com/legal/controller_addendum
        </a>[cite: 1].
      </p>
      <p>
        Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt[cite: 1]. Details finden Sie hier:{" "}
        <a href="https://www.facebook.com/legal/EU_data_transfer_addendum" target="_blank" rel="noopener noreferrer">
          https://www.facebook.com/legal/EU_data_transfer_addendum
        </a>[cite: 1].
      </p>
      <p>
        Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF)[cite: 1]. Weitere Informationen hierzu erhalten Sie unter:{" "}
        <a href="https://www.dataprivacyframework.gov/participant/4452" target="_blank" rel="noopener noreferrer">
          https://www.dataprivacyframework.gov/participant/4452
        </a>[cite: 1].
      </p>

      <h4>Instagram</h4>
      <p>
        Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden[cite: 1]. Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland[cite: 1].
      </p>
      <p>
        Wenn das Social-Media-Element aktiv ist, wird eine direkte Verbindung zwischen Ihrem Endgerät und dem Instagram-Server hergestellt[cite: 1]. Instagram erhält dadurch Informationen über den Besuch dieser Website durch Sie[cite: 1]. Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken des Instagram-Buttons die Inhalte dieser Website mit Ihrem Instagram-Profil verlinken[cite: 1].
      </p>
      <p>
        Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1]. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram:{" "}
        <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer">
          https://privacycenter.instagram.com/policy/
        </a>[cite: 1].
      </p>
    </div>

    <div className="legal-section">
      <h3>6. Plugins und Tools</h3>
      <h4>YouTube mit erweitertem Datenschutz</h4>
      <p>
        Diese Website bindet Videos der Website YouTube ein[cite: 1]. Betreiber der Website ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland[cite: 1].
      </p>
      <p>
        Wir nutzen YouTube im erweiterten Datenschutzmodus[cite: 1]. Videos, die im erweiterten Datenschutzmodus abgespielt werden, werden nach Aussage von YouTube nicht zur Personalisierung des Surfens auf YouTube eingesetzt[cite: 1]. Im erweiterten Datenschutzmodus werden keine Cookies gesetzt[cite: 1]. Stattdessen werden jedoch sogenannte Local Storage Elemente im Browser des Users gespeichert[cite: 1]. Details finden Sie hier:{" "}
        <a href="https://support.google.com/youtube/answer/171780" target="_blank" rel="noopener noreferrer">
          https://support.google.com/youtube/answer/171780
        </a>[cite: 1].
      </p>
      <p>
        Die Nutzung von YouTube erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1]. Weitere Informationen über Datenschutz bei YouTube finden Sie unter:{" "}
        <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">
          https://policies.google.com/privacy?hl=de
        </a>[cite: 1].
      </p>

      <h4>Google Fonts</h4>
      <p>
        Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden[cite: 1]. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen[cite: 1].
      </p>
      <p>
        Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO bzw. bei abgefragter Einwilligung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1].
      </p>

      <h4>SoundCloud</h4>
      <p>
        Auf dieser Website können Plugins des sozialen Netzwerks SoundCloud (SoundCloud Limited, Berners House, 47-48 Berners Street, London W1T 3NF, Großbritannien) integriert sein[cite: 1].
      </p>
      <p>
        Wenn Sie diese Website besuchen, wird nach Aktivierung des Plugins eine direkte Verbindung zwischen Ihrem Browser und dem SoundCloud-Server hergestellt[cite: 1]. Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, sofern eine Einwilligung abgefragt wurde[cite: 1]. Die Einwilligung ist jederzeit widerrufbar[cite: 1]. Weitere Informationen finden Sie unter:{" "}
        <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">
          https://soundcloud.com/pages/privacy
        </a>[cite: 1].
      </p>

      <h4>Spotify</h4>
      <p>
        Auf dieser Website sind Funktionen des Musik-Dienstes Spotify eingebunden[cite: 1]. Anbieter ist die Spotify AB, Birger Jarlsgatan 61, 113 56 Stockholm in Schweden[cite: 1].
      </p>
      <p>
        Beim Besuch dieser Website kann über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Spotify-Server hergestellt werden[cite: 1]. Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) oder auf Grundlage einer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)[cite: 1]. Weitere Informationen finden Sie in der Datenschutzerklärung von Spotify:{" "}
        <a href="https://www.spotify.com/de/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
          https://www.spotify.com/de/legal/privacy-policy/
        </a>[cite: 1].
      </p>
    </div>
    
    <p className="legal-source" style={{ marginTop: "20px", fontSize: "0.8rem", opacity: 0.7 }}>
      Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">https://www.e-recht24.de</a>[cite: 1]
    </p>
  </>
)}
                </div>

                <div className="legal-section">
                  <h3>8. Änderungen</h3>
                  <p>
                    Diese Datenschutzerklärung kann bei Bedarf angepasst werden, um gesetzlichen Änderungen Rechnung zu tragen.
                  </p>
                  <div className="legal-placeholder">
                    Stand 07.07.2026
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
