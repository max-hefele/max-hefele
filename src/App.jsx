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
              </>
            )}

            {legalModal === "datenschutz" && (
              <>
                <h2 className="legal-title">DATENSCHUTZERKLÄRUNG</h2>
                <p className="legal-subtitle">Allgemeine Informationen</p>

                <div className="legal-section">
                  <h3>1. Datenschutz auf einen Blick</h3>
                  <p><strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung[cite: 27, 30, 31].</p>
                  <p><strong>Datenerfassung auf dieser Website:</strong> Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen[cite: 34]. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. in ein Kontaktformular)[cite: 36, 37]. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs)[cite: 38, 39, 40]. Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden[cite: 42, 43].</p>
                  <p><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong> Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen[cite: 45, 46, 47]. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung zu verlangen, und es steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu[cite: 48, 49].</p>
                </div>

                <div className="legal-section">
                  <h3>2. Hosting</h3>
                  <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
                  <p><strong>Strato:</strong> Anbieter ist die Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin. Wenn Sie unsere Website besuchen, erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen[cite: 53, 54, 55]. Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website[cite: 57, 58]. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 59, 60].</p>
                  <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag[cite: 64, 65, 66].</p>
                </div>

                <div className="legal-section">
                  <h3>3. Allgemeine Hinweise und Pflichtinformationen</h3>
                  <p><strong>Datenschutz:</strong> Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung[cite: 68, 69, 70]. Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann[cite: 75].</p>
                  <p><strong>Hinweis zur verantwortlichen Stelle:</strong><br />
                    Max Hefele<br />
                    Kapellenfeld 3<br />
                    86865 Markt Wald<br />
                    Deutschland<br />
                    E-Mail: max.hefele@gmx.de
                  </p>
                  <p><strong>Speicherdauer:</strong> Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt oder Sie ein berechtigtes Löschersuchen geltend machen[cite: 84, 85, 86].</p>
                  <p><strong>Rechtsgrundlagen &amp; Widerspruch:</strong> Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO[cite: 91, 92]. <strong>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN (Art. 21 DSGVO)[cite: 110, 111].</strong></p>
                  <p>Es steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu[cite: 119, 120]. Zudem haben Sie das Recht auf Datenübertragbarkeit sowie Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung[cite: 122, 125, 128, 129].</p>
                  <p><strong>SSL- bzw. TLS-Verschlüsselung:</strong> Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung[cite: 138, 139].</p>
                </div>

                <div className="legal-section">
                  <h3>4. Datenerfassung auf dieser Website</h3>
                  <p><strong>Cookies:</strong> Unsere Internetseiten verwenden so genannte „Cookies“[cite: 146, 147]. Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur Bereitstellung bestimmter Funktionen erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird[cite: 154, 155]. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden[cite: 159].</p>
                  <p><strong>Kontaktformular &amp; Anfragen:</strong> Wenn Sie uns per Kontaktformular, E-Mail oder Telefon Anfragen zukommen lassen, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage bei uns gespeichert und verarbeitet[cite: 162, 163, 174, 175]. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vertragliche/vorvertragliche Maßnahmen) oder auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO)[cite: 165, 166, 167, 177, 178, 179].</p>
                </div>

                <div className="legal-section">
                  <h3>5. Soziale Medien</h3>
                  <p><strong>Facebook:</strong> Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland[cite: 184, 186]. Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 193, 194]. Wir sind mit Meta gemeinsam für die Erfassung und Weiterleitung der Daten verantwortlich (Art. 26 DSGVO)[cite: 195, 196]. Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF)[cite: 208].</p>
                  <p><strong>Instagram:</strong> Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland[cite: 213, 214]. Die Nutzung erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG[cite: 220, 221]. Auch hier besteht eine gemeinsame Verantwortlichkeit für die Erfassung der Daten[cite: 223, 224]. Das Unternehmen ist nach dem DPF zertifiziert[cite: 239].</p>
                </div>

                <div className="legal-section">
                  <h3>6. Plugins und Tools</h3>
                  <p><strong>YouTube (mit erweitertem Datenschutz):</strong> Diese Website bindet Videos der Website YouTube ein. Betreiber ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland[cite: 244, 245]. Wir nutzen YouTube im erweiterten Datenschutzmodus, sodass laut YouTube keine Cookies gesetzt, sondern Local Storage Elemente im Browser gespeichert werden[cite: 250, 251, 252]. Die Nutzung erfolgt im Interesse einer ansprechenden Darstellung (Art. 6 Abs. 1 lit. f DSGVO) oder auf Grundlage Ihrer Einwilligung[cite: 256, 257, 258]. Google ist nach dem DPF zertifiziert[cite: 262].</p>
                  <p><strong>Google Fonts:</strong> Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Google Fonts, bereitgestellt von Google[cite: 267]. Hierbei erlangt Google Kenntnis über Ihre IP-Adresse[cite: 270]. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) oder basierend auf Ihrer Einwilligung[cite: 271, 272, 273].</p>
                  <p><strong>SoundCloud:</strong> Es können Plugins des sozialen Netzwerks SoundCloud (SoundCloud Limited, London, Großbritannien) integriert sein[cite: 281]. SoundCloud erhält dadurch Informationen über Ihre IP-Adresse[cite: 284]. Die Speicherung und Analyse erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO oder Ihrer Einwilligung[cite: 288, 290]. Großbritannien gilt als datenschutzrechtlich sicherer Drittstaat[cite: 292, 293].</p>
                  <p><strong>Spotify:</strong> Funktionen des Musik-Dienstes Spotify (Spotify AB, Stockholm, Schweden) sind eingebunden[cite: 296, 297]. Spotify erhält dadurch Kenntnis über Ihre IP-Adresse[cite: 300]. Bei der Nutzung von Spotify werden zudem Cookies von Google Analytics eingesetzt[cite: 303]. Die Speicherung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO oder Ihrer Einwilligung[cite: 306, 308].</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}