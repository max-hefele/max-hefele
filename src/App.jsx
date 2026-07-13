import { useState, useEffect, useRef } from "react";

// ─── Translations ───
const T = {
  de: {
    nav: [
      { id: "about", label: "About" },
      { id: "music", label: "Music" },
      { id: "news", label: "News" },
      { id: "dates", label: "Dates" },
      { id: "contact", label: "Contact" }
    ],
    soon: "bald",
    aboutLabel: "About",
    aboutTitle: "MAX HEFELE",
    aboutText: [
      "Max Hefele steht für 20 Jahre Clubkultur.",
      "Als Resident unter dem Namen Mexx Pain kam er aus dem Hip-Hop und lernte früh: Zwei Plattenspieler sind mehr als nur Technik. Mit Instinkt, Präzision und perfektem Timing formte er ganze Nächte. Er weiß, wie man Crowds bewegt und die Energie eines Raumes lenkt.",
      "Genau diese Erfahrung prägt heute seine Melodic Techno Sets. Max Hefele spielt keine Setlisten von der Stange. Er liest den Raum, baut Spannung auf, hält sie aus und weiß exakt, wann ein Track sitzen muss.",
      "Nach zwei Jahrzehnten hinter den Decks macht der eigene Name sichtbar, was ihn geformt hat: der Weg vom Hip-Hop zur elektronischen Musik, ohne die Wurzeln zu kappen.",
      "Sein Sound setzt nicht auf Effekte. Er setzt auf Spannung, Tiefe und den richtigen Moment. Diese Souveränität hört man auch im Studio. Mit der Debüt-EP auf MYR Records beginnt das nächste Kapitel seiner Geschichte.",
      "Parallel dazu erscheint alle zwei Wochen seine musikalische Vision in der YouTube-Reihe „Rave in the City\". Eine Stunde, die zeigt, worum es geht. Qualität statt Quantität. Erfahrung statt Zufall. Keine Show. Nur Musik.",
      "Max Hefele brings etwas mit, das selten geworden ist: echte Club-Erfahrung und die Fähigkeit, komplette Nächte zu gestalten, ohne den roten Faden zu verlieren."
    ],
    resTitle: "Residencies",
    musicLabel: "Listen",
    musicTitle: "MUSIC",
    scDesc: "Mixes, eigene Tracks und die „Rave in the City\" Reihe. Debüt-EP demnächst auf MYR Records.",
    ytDesc: "Rave in the City — kuratierte Ein-Stunden-Sets, alle zwei Wochen neu.",
    mcDesc: "Komplette DJ-Sets und Live-Mitschnitte — die volle musikalische Reise.",
    listenBtn: "Anhören",
    watchBtn: "Ansehen",
    consentSC: {
      title: "SoundCloud Audio",
      text: "Laden des Players überträgt Daten an SoundCloud.",
      link: "Datenschutzerklärung lesen",
      btn: "Player laden"
    },
    consentVD: {
      title: (count) => `${count} Videos ansehen`,
      text: "Zum Abspielen werden Inhalte von Google Drive geladen.",
      link: "Datenschutzerklärung lesen",
      btnLoad: "Videos laden & öffnen",
      btnExpand: "Jetzt aufklappen"
    },
    videoLabel: "Videos",
    videoMore: "Alle Videos auf Google Drive",
    newsLabel: "Latest Updates",
    newsTitle: "NEWS",
    readMore: "Mehr lesen auf",
    datesLabel: "Live",
    datesTitle: "DATES",
    datesEmpty: "NEUE TERMINE WERDEN BALD BEKANNTGEGEBEN",
    datesSub: "Für Booking-Anfragen bitte Kontakt aufnehmen.",
    contactLabel: "Get in Touch",
    contactTitle: "CONTACT",
    contactText: "Für Booking-Anfragen, Kooperationen oder allgemeine Fragen — einfach eine Nachricht schicken.",
    footerRights: "ALL RIGHTS RESERVED",
    imprintBtn: "Impressum",
    privacyBtn: "Datenschutz",
    revokeBtn: "Einwilligungen hier widerrufen",
    revokeAlert: "Deine Cookie- und Streaming-Einwilligungen wurden erfolgreich widerrufen.",
    legalTitleImprint: "IMPRESSUM",
    legalSubtitleImprint: "Angaben gemäß § 5 DDG",
    legalTitlePrivacy: "DATENSCHUTZ",
    legalSubtitlePrivacy: "Datenschutzerklärung",
  },
  en: {
    nav: [
      { id: "about", label: "About" },
      { id: "music", label: "Music" },
      { id: "news", label: "News" },
      { id: "dates", label: "Dates" },
      { id: "contact", label: "Contact" }
    ],
    soon: "soon",
    aboutLabel: "About",
    aboutTitle: "MAX HEFELE",
    aboutText: [
      "Max Hefele stands for 20 years of club culture.",
      "As a resident under the name Mexx Pain, he came from hip-hop and learned early on: two turntables are more than just technology. With instinct, precision, and perfect timing, he shaped entire nights. He knows how to move crowds and direct the energy of a room.",
      "Exactly this experience characterizes his Melodic Techno sets today. Max Hefele doesn't play stock setlists. He reads the room, builds tension, sustains it, and knows exactly when a track needs to hit.",
      "After two decades behind the decks, his own name makes visible what shaped him: the journey from hip-hop to electronic music, without cutting ties to his roots.",
      "His sound doesn't rely on effects. It relies on tension, depth, and the right moment. This sovereignty is also audible in the studio. With his debut EP on MYR Records, the next chapter of his story begins.",
      "In parallel, his musical vision appears every two weeks in the YouTube series 'Rave in the City'. An hour that shows what it's all about. Quality over quantity. Experience over chance. No show. Just music.",
      "Max Hefele brings something that has become rare: genuine club experience and the ability to craft entire nights without losing the thread."
    ],
    resTitle: "Residencies",
    musicLabel: "Listen",
    musicTitle: "MUSIC",
    scDesc: "Mixes, own tracks and the 'Rave in the City' series. Debut EP coming soon on MYR Records.",
    ytDesc: "Rave in the City — curated one-hour sets, new every two weeks.",
    mcDesc: "Complete DJ sets and live recordings — the full musical journey.",
    listenBtn: "Listen",
    watchBtn: "Watch",
    consentSC: {
      title: "SoundCloud Audio",
      text: "Loading the player transfers data to SoundCloud.",
      link: "Read Privacy Policy",
      btn: "Load Player"
    },
    consentVD: {
      title: (count) => `Watch ${count} Videos`,
      text: "Content from Google Drive is loaded for playback.",
      link: "Read Privacy Policy",
      btnLoad: "Load & open videos",
      btnExpand: "Expand now"
    },
    videoLabel: "Videos",
    videoMore: "All videos on Google Drive",
    newsLabel: "Latest Updates",
    newsTitle: "NEWS",
    readMore: "Read more on",
    datesLabel: "Live",
    datesTitle: "DATES",
    datesEmpty: "NEW DATES WILL BE ANNOUNCED SOON",
    datesSub: "For booking inquiries please get in touch.",
    contactLabel: "Get in Touch",
    contactTitle: "CONTACT",
    contactText: "For booking inquiries, collaborations or general questions — just send a message.",
    footerRights: "ALL RIGHTS RESERVED",
    imprintBtn: "Imprint",
    privacyBtn: "Privacy Policy",
    revokeBtn: "Revoke consents here",
    revokeAlert: "Your cookie and streaming consents have been successfully revoked.",
    legalTitleImprint: "IMPRINT",
    legalSubtitleImprint: "Information according to § 5 DDG",
    legalTitlePrivacy: "PRIVACY POLICY",
    legalSubtitlePrivacy: "Privacy Statement",
  }
};

// ─── Config ───
const ARTIST_NAME = "MAXHEFELE";

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/max.hefele.music/", icon: "IG" },
  { name: "SoundCloud", url: "https://soundcloud.com/maxhefele", icon: "SC" },
  { name: "YouTube", url: "https://www.youtube.com/@MaxHefele", icon: "YT" },
  { name: "Mixcloud", url: "https://www.mixcloud.com/MaxHefele/", icon: "MC" },
  { name: "Spotify", url: "#", icon: "SP", soon: true },
  { name: "Beatport", url: "#", icon: "BP", soon: true }
];

const GOOGLE_DRIVE = {
  videos: "https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0",
};

const NEWS_ITEMS = [
  {
    id: 1,
    date: "09.07.2026",
    category: "Interview",
    title: "Max Hefele presents Call Me [MYR]",
    excerpt: "Meine Vision für die kommende EP auf MYR Records.",
    link: "https://www.chromatic-club.com/post/max-hefele-presents-call-me-myr", 
    image: "images/chromatic-club.jpg",   
  },
  {
    id: 2,
    date: "09.07.2026",
    category: "Interview with the last future",
    title: "Max Hefele presents Call Me [MYR]",
    excerpt: "Hier ein kleiner einblick in meine neue EP.",
    link: "https://thelastfuture.wixsite.com/thelastfuture/post/max-hefele-presents-call-me-myr",
    image: "images/thelastfuture.jpg", 
  },
  {
    id: 3,
    date: "10.07.2026",
    category: "New Episode Rave in the City",
    title: "Rave in the City Vol. 52| Sunset Session | Melodic Techno • Indie Dance • House Mix",
    excerpt: "Eine neue Episode Rave in the City ab jetzt Online.",
    link: "https://youtu.be/xGbPAuIDj6o?si=xGAMJ8hxRATiVSKM",
    image: "images/episode.jpg", 
  },
];

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
  Play: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
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
  .nav-right { display: flex; align-items: center; gap: 36px; }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a { color: var(--text-dim); text-decoration: none; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; transition: color 0.3s; position: relative; }
  .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--text); transition: width 0.4s var(--ease); }
  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { width: 100%; }
  
  /* LANGUAGE SWITCHER */
  .lang-switch { display: flex; gap: 8px; align-items: center; }
  .lang-switch button { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 10px; letter-spacing: 2px; transition: color 0.3s; font-weight: 600; padding: 0; }
  .lang-switch button.active { color: var(--text); }
  .lang-switch span { color: var(--border-light); font-size: 10px; }

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

  /* PRIVACY OVERLAY & GLASSMORPHISM */
  .privacy-wrapper { position: relative; width: 100%; border: 1px solid var(--border); overflow: hidden; background: #080808; }
  .privacy-blur-overlay { position: absolute; inset: 0; z-index: 12; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
  .media-consent-inner { display: flex; align-items: center; gap: 20px; background: rgba(20, 20, 20, 0.9); padding: 24px 32px; border-radius: 8px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
  .media-consent-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #111; border-radius: 50%; color: var(--text-mid); border: 1px solid #333; }
  .media-consent-text-wrap { text-align: left; }
  .media-consent-title { font-family: var(--font-display); font-size: 20px; letter-spacing: 1px; color: var(--text); margin-bottom: 4px; line-height: 1; }
  .media-consent-text { font-size: 11px; color: #aaa; line-height: 1.5; margin: 0; letter-spacing: 0.2px; }
  .media-consent-link { background: none; border: none; padding: 0; color: var(--text-mid); font-family: var(--font-body); font-size: 11px; text-decoration: underline; text-underline-offset: 2px; cursor: pointer; transition: color 0.3s; }
  .media-consent-link:hover { color: var(--text); }
  .media-consent-btn { background: var(--text); border: 1px solid var(--text); color: var(--bg); padding: 10px 24px; font-family: var(--font-body); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s var(--ease); white-space: nowrap; }
  .media-consent-btn:hover { background: transparent; color: var(--text); }

  /* FAKE BACKGROUNDS FOR BLUR */
  .fake-waveform-bg { position: absolute; inset: 0; display: flex; align-items: center; gap: 4px; padding: 0 32px; opacity: 0.85; background: #111; }
  .fake-waveform-bg > div { flex: 1; background: linear-gradient(180deg, #ff7700 0%, #ff3300 100%); border-radius: 2px; }
  
  .fake-video-bg { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px; opacity: 0.85; background: #111; }
  .fake-video-bg > div { background: #444; border-radius: 4px; border: 1px solid #555; }

  /* VIDEO GRID KOMPAKT */
  .video-block { margin-top: 56px; }
  .video-label { font-size: 10px; letter-spacing: 5px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 16px; font-weight: 600; }
  .video-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; width: 100%; }
  .video-frame { width: 100%; aspect-ratio: 16/9; border: 1px solid var(--border); background: #000; overflow: hidden; }
  .video-frame iframe { width: 100%; height: 100%; border: none; }
  .video-more { margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); text-decoration: none; transition: color 0.3s; }
  .video-more:hover { color: var(--text); }

  /* NEWS SECTION */
  .news-grid { 
    display: flex; 
    gap: 24px; 
    margin-top: 20px; 
    overflow-x: auto; 
    padding-bottom: 24px; 
    scroll-snap-type: x mandatory; 
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; 
  }
  .news-grid::-webkit-scrollbar {
    display: none; 
  }
  .n-card { 
    background: var(--bg-card); 
    border: 1px solid var(--border); 
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 
    text-decoration: none; 
    color: inherit; 
    transition: all 0.3s var(--ease); 
    flex: 0 0 320px; 
    scroll-snap-align: start; 
  }
  .n-card:hover { border-color: var(--border-light); transform: translateY(-4px); }
  .n-img-wrap { width: 100%; aspect-ratio: 16/10; background: var(--bg-elevated); border-bottom: 1px solid var(--border); overflow: hidden; position: relative; }
  .n-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
  .n-card:hover .n-img { transform: scale(1.02); }
  .n-content { padding: 28px; display: flex; flex-direction: column; flex: 1; }
  .n-meta { display: flex; justify-content: space-between; align-items: center; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 14px; }
  .n-cat { color: var(--text); font-weight: 600; border: 1px solid var(--border-light); padding: 3px 10px; font-size: 9px; letter-spacing: 1.5px; }
  .n-title { font-family: var(--font-display); font-size: 26px; letter-spacing: 1px; margin-bottom: 12px; line-height: 1.15; }
  .n-excerpt { font-size: 13.5px; color: var(--text-mid); line-height: 1.7; flex: 1; margin-bottom: 24px; }
  .n-link { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim); display: flex; align-items: center; gap: 6px; transition: color 0.3s; font-weight: 600; }
  .n-card:hover .n-link { color: var(--text); }

  /* DATES & CONTACT & FOOTER & LEGAL */
  .dates-empty { text-align: center; padding: 72px 0; }
  .dates-empty-title { font-family: var(--font-display); font-size: 28px; letter-spacing: 3px; color: var(--text-mid); margin-bottom: 10px; }
  .dates-empty-sub { font-size: 13px; color: var(--text-dim); }
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
  .footer { padding: 36px 48px; text-align: center; font-size: 10px; color: var(--text-dim); letter-spacing: 3px; border-top: 1px solid var(--border); }
  .footer-links { margin-top: 12px; display: flex; justify-content: center; gap: 24px; }
  .footer-link { background: none; border: none; color: var(--text-dim); font-family: var(--font-body); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: color 0.3s; padding: 0; }
  .footer-link:hover { color: var(--text-mid); }
  .legal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; justify-content: center; align-items: flex-start; padding: 60px 24px; overflow-y: auto; }
  .legal-box { background: var(--bg); border: 1px solid var(--border-light); max-width: 720px; width: 100%; padding: 56px 48px; position: relative; }
  .legal-close { position: absolute; top: 20px; right: 20px; background: none; border: 1px solid var(--border); color: var(--text-dim); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; transition: all 0.3s; font-family: var(--font-body); }
  .legal-close:hover { color: var(--text); border-color: var(--text-mid); }
  .legal-title { font-family: var(--font-display); font-size: 36px; letter-spacing: 3px; margin-bottom: 8px; }
  .legal-subtitle { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 36px; font-weight: 600; }
  .legal-section { margin-bottom: 28px; }
  .legal-section h3 { font-family: var(--font-display); font-size: 20px; letter-spacing: 1px; margin-bottom: 10px; color: var(--accent); }
  .legal-section p, .legal-section li { color: var(--text-mid); font-size: 13px; line-height: 1.8; margin-bottom: 12px; }
  .legal-section ul { list-style: none; padding: 0; }
  .legal-section ul li::before { content: '—'; color: var(--text-dim); margin-right: 10px; }
  .legal-section a { color: var(--text-mid); text-decoration: underline; text-underline-offset: 3px; transition: color 0.3s; }
  .legal-section a:hover { color: var(--text); }
  .legal-placeholder { background: var(--bg-card); border: 1px dashed var(--border-light); padding: 20px 24px; color: var(--text-dim); font-size: 12px; line-height: 1.7; letter-spacing: 0.3px; margin-top: 8px; }
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
    .video-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .highlights { grid-template-columns: 1fr 1fr; }
    .hero-name { letter-spacing: 6px; }
    .media-consent-inner { flex-direction: column; text-align: center; gap: 16px; padding: 24px; }
    .media-consent-text-wrap { text-align: center; }
  }
  @media (max-width: 480px) {
    .highlights { grid-template-columns: 1fr; }
    .video-grid { grid-template-columns: 1fr; }
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

export default function MaxHefele() {
  const [lang, setLang] = useState('de');
  const t = T[lang];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);
  const [videosExpanded, setVideosExpanded] = useState(false);
  
  const [allowSoundCloud, setAllowSoundCloud] = useState(() => 
    localStorage.getItem("consent-soundcloud") === "true"
  );
  const [allowGoogleDrive, setAllowGoogleDrive] = useState(() => 
    localStorage.getItem("consent-googledrive") === "true"
  );

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const resetConsent = () => {
    localStorage.removeItem("consent-soundcloud");
    localStorage.removeItem("consent-googledrive");
    setAllowSoundCloud(false);
    setAllowGoogleDrive(false);
    setVideosExpanded(false);
    alert(t.revokeAlert);
  };

  return (
    <>
      <style>{css}</style>
      <div className="grain" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{ARTIST_NAME}</span>
        
        <div className="nav-right">
          <ul className="nav-links">
            {t.nav.map(item => (
              <li key={item.id}><a href={`#${item.id}`} onClick={e => { e.preventDefault(); go(item.id); }}>{item.label}</a></li>
            ))}
          </ul>
          
          <div className="lang-switch">
            <button onClick={() => setLang('de')} className={lang === 'de' ? 'active' : ''}>DE</button>
            <span>|</span>
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
          </div>

          <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {t.nav.map(item => (
          <a key={item.id} href={`#${item.id}`} onClick={e => { e.preventDefault(); go(item.id); }}>{item.label}</a>
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
                return <span key={s.name} className="hero-social-soon" title={`${s.name} — ${t.soon}`}><Icon /></span>;
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
          <p className="section-label">{t.aboutLabel}</p>
          <h2 className="section-title">{t.aboutTitle}</h2>
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
                {t.aboutText.map((para, i) => <p key={i}>{para}</p>)}
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
                <div className="res-title">{t.resTitle}</div>
                <div className="res-list">
                  {RESIDENCIES.map(r => <span className="res-tag" key={r}>{r}</span>)}
                </div>
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* MUSIC & VIDEOS */}
      <section className="music-wrap" id="music">
        <div className="music-inner">
          <Rv>
            <p className="section-label">{t.musicLabel}</p>
            <h2 className="section-title">{t.musicTitle}</h2>
            <div className="section-line" />
          </Rv>
          <Rv delay={100}>
            <div className="music-grid">
              <a className="m-card" href="https://soundcloud.com/maxhefele" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.SC /></div>
                <div className="m-card-name">SOUNDCLOUD</div>
                <div className="m-card-desc">{t.scDesc}</div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>
              <a className="m-card" href="https://www.youtube.com/@MaxHefele" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.YT /></div>
                <div className="m-card-name">YOUTUBE</div>
                <div className="m-card-desc">{t.ytDesc}</div>
                <div className="m-card-link">{t.watchBtn} <Icons.Arrow /></div>
              </a>
              <a className="m-card" href="https://www.mixcloud.com/MaxHefele/" target="_blank" rel="noopener noreferrer">
                <div className="m-card-icon"><Icons.MC /></div>
                <div className="m-card-name">MIXCLOUD</div>
                <div className="m-card-desc">{t.mcDesc}</div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>
            </div>
          </Rv>
          
          {/* SOUNDCLOUD-BEREICH */}
          <Rv delay={150}>
            <div className="privacy-wrapper" style={{ height: '166px', marginTop: '32px' }}>
              {!allowSoundCloud ? (
                <>
                  <div className="fake-waveform-bg">
                    {Array.from({ length: 45 }).map((_, i) => (
                      <div key={i} style={{ height: `${Math.max(10, Math.random() * 100)}%` }} />
                    ))}
                  </div>
                  <div className="privacy-blur-overlay">
                    <div className="media-consent-inner">
                      <div className="media-consent-icon"><Icons.SC /></div>
                      <div className="media-consent-text-wrap">
                        <h4 className="media-consent-title">{t.consentSC.title}</h4>
                        <p className="media-consent-text">{t.consentSC.text} <br/><button className="media-consent-link" onClick={() => setLegalModal("datenschutz")}>{t.consentSC.link}</button></p>
                      </div>
                      <button className="media-consent-btn" onClick={() => {
                        setAllowSoundCloud(true);
                        localStorage.setItem("consent-soundcloud", "true");
                      }}>{t.consentSC.btn}</button>
                    </div>
                  </div>
                </>
              ) : (
                <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/maxhefele&color=%23333333&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" style={{ border: 0, display: 'block' }} title="SoundCloud Player" />
              )}
            </div>
          </Rv>

          {/* VIDEO-BEREICH */}
          <Rv delay={200}>
            <div className="video-block" id="videos">
              <div className="video-label">{t.videoLabel}</div>
              
              {(!allowGoogleDrive || !videosExpanded) ? (
                <div className="privacy-wrapper" style={{ height: '220px', cursor: allowGoogleDrive ? 'pointer' : 'default' }} onClick={() => { if(allowGoogleDrive) setVideosExpanded(true); }}>
                  <div className="fake-video-bg">
                    {Array.from({ length: 3 }).map((_, i) => <div key={i} />)}
                  </div>
                  <div className="privacy-blur-overlay">
                    <div className="media-consent-inner">
                      <div className="media-consent-icon"><Icons.Play /></div>
                      <div className="media-consent-text-wrap">
                        <h4 className="media-consent-title">{t.consentVD.title(VIDEO_IDS.length)}</h4>
                        {!allowGoogleDrive && (
                          <p className="media-consent-text">
                            {t.consentVD.text} <br/>
                            <button className="media-consent-link" onClick={(e) => { e.stopPropagation(); setLegalModal("datenschutz"); }}>{t.consentVD.link}</button>
                          </p>
                        )}
                      </div>
                      {!allowGoogleDrive ? (
                        <button className="media-consent-btn" onClick={(e) => { 
                          e.stopPropagation(); 
                          setAllowGoogleDrive(true); 
                          setVideosExpanded(true);
                          localStorage.setItem("consent-googledrive", "true"); 
                        }}>{t.consentVD.btnLoad}</button>
                      ) : (
                        <button className="media-consent-btn">{t.consentVD.btnExpand}</button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="video-grid">
                  {VIDEO_IDS.map((id, i) => (
                    <div className="video-frame" key={id}>
                      <iframe src={`https://drive.google.com/file/d/${id}/preview`} allow="autoplay; encrypted-media" allowFullScreen title={`Video ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
              
              <a className="video-more" href={GOOGLE_DRIVE.videos} target="_blank" rel="noopener noreferrer">
                {t.videoMore} <Icons.Arrow />
              </a>
            </div>
          </Rv>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section className="section" id="news">
        <Rv>
          <p className="section-label">{t.newsLabel}</p>
          <h2 className="section-title">{t.newsTitle}</h2>
          <div className="section-line" />
        </Rv>
        <Rv delay={100}>
          <div className="news-grid">
            {NEWS_ITEMS.map(item => (
              <a key={item.id} className="n-card" href={item.link} target="_blank" rel="noopener noreferrer">
                <div className="n-img-wrap">
                  <img 
                    className="n-img" 
                    src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL}${item.image}`} 
                    alt={item.title} 
                    loading="lazy" 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                </div>
                <div className="n-content">
                  <div className="n-meta">
                    <span className="n-date">{item.date}</span>
                    <span className="n-cat">{item.category}</span>
                  </div>
                  <h3 className="n-title">{item.title}</h3>
                  <p className="n-excerpt">{item.excerpt}</p>
                  <div className="n-link">{t.readMore} {new URL(item.link).hostname.replace('www.', '')} <Icons.Arrow /></div>
                </div>
              </a>
            ))}
          </div>
        </Rv>
      </section>

      {/* DATES */}
      <section className="section" id="dates">
        <Rv>
          <p className="section-label">{t.datesLabel}</p>
          <h2 className="section-title">{t.datesTitle}</h2>
          <div className="section-line" />
        </Rv>
        <Rv delay={100}>
          <div className="dates-empty">
            <div className="dates-empty-title">{t.datesEmpty}</div>
            <div className="dates-empty-sub">{t.datesSub}</div>
          </div>
        </Rv>
      </section>

      {/* CONTACT */}
      <section className="contact-wrap" id="contact">
        <div className="contact-inner">
          <Rv>
            <p className="section-label">{t.contactLabel}</p>
            <h2 className="section-title">{t.contactTitle}</h2>
            <div className="section-line" />
          </Rv>
          <div className="contact-grid">
            <div>
              <Rv delay={100}>
                <p style={{ color: "var(--text-dim)", fontSize: "13.5px", lineHeight: "1.8", marginBottom: "28px" }}>
                  {t.contactText}
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
                      {s.name} <span className="soon-badge">{t.soon}</span>
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
        <div>© {new Date().getFullYear()} {ARTIST_NAME} — {t.footerRights}</div>
        <div className="footer-links">
          <button className="footer-link" onClick={() => setLegalModal("impressum")}>{t.imprintBtn}</button>
          <button className="footer-link" onClick={() => setLegalModal("datenschutz")}>{t.privacyBtn}</button>
        </div>
      </footer>

      {/* LEGAL MODALS */}
      {legalModal && (
        <div className="legal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setLegalModal(null); }}>
          <div className="legal-box">
            <button className="legal-close" onClick={() => setLegalModal(null)}>×</button>

            {legalModal === "impressum" && (
              <>
                <h2 className="legal-title">{t.legalTitleImprint}</h2>
                <p className="legal-subtitle">{t.legalSubtitleImprint}</p>

                <div className="legal-section">
                  <h3>Verantwortlich</h3>
                  <div className="legal-placeholder">
                    Max Hefele<br />
                    Kapellenfeld 3<br />
                    86865 Markt Wald<br />
                    Deutschland
                  </div>
                </div>

                <div className="legal-section">
                  <h3>Contact</h3>
                  <p>
                    E-Mail: <a href="mailto:info@maxhefele.de">info@maxhefele.de</a>
                  </p>
                </div>

                <div className="legal-section">
                  <h3>EU-Streitschlichtung</h3>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br/>
                    Unsere E-Mail-Adresse finden Sie oben im Impism. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>
              </>
            )}

            {legalModal === "datenschutz" && (
              <>
                <h2 className="legal-title">{t.legalTitlePrivacy}</h2>
                <p className="legal-subtitle">{t.legalSubtitlePrivacy}</p>
                
                <div className="legal-section">
                  <h3>1. Datenschutz auf einen Blick</h3>
                  <h3>Allgemeine Hinweise</h3>
                  <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                  <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
                </div>

                <div className="legal-section">
                  <h3>Verantwortliche Stelle</h3>
                  <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <div className="legal-placeholder">
                    Max Hefele<br />
                    Kapellenfeld 3<br />
                    86865 Markt Wald<br />
                    E-Mail: info@maxhefele.de
                  </div>
                  <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
                </div>

                <div className="legal-section">
                  <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                  <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
                  <button onClick={resetConsent} className="media-consent-btn" style={{ marginTop: '12px', display: 'block', padding: '10px 24px', fontSize: '9px' }}>
                    {t.revokeBtn}
                  </button>
                </div>

                <div className="legal-section">
                  <h3>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</h3>
                  <p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
                </div>

                <div className="legal-section">
                  <h3>Recht auf Auskunft, Löschung und Berichtigung</h3>
                  <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
                </div>

                <div className="legal-section">
                  <h3>2. Hosting und Drittanbieter-Dienste</h3>
                  <h3>GitHub Pages (Hosting)</h3>
                  <p>Wir hosten diese Website über den Dienst GitHub Pages der GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA (nachfolgend „GitHub“). Wenn Sie unsere Seiten besuchen, erfasst GitHub Protokolldaten (z. B. Ihre IP-Adresse, Browsertyp, Betriebssystem). Dies ist technisch erforderlich, um die Website stabil und sicher anzuzeigen. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO. GitHub ist unter dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen finden Sie in der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement</a>.</p>

                  <h3>Google Drive (Einbindung von Inhalten/Videos)</h3>
                  <p>Wir binden auf unserer Website Inhalte ein oder stellen Downloads über den Cloud-Speicherdienst Google Drive bereit. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (nachfolgend „Google“).</p>
                  <p>Wenn Sie Inhalte (wie Videos) über das integrierte Zwei-Klick-System aktivieren, wird eine Verbindung zu den Servern von Google hergestellt. Dabei wird an Google übermittelt, welche unserer Seiten Sie besucht haben. Zudem erhebt Google Ihre IP-Adresse. Sollten Sie in Ihrem Google-Konto eingeloggt sein, ermöglichen Sie Google, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem Google-Konto ausloggen.</p>
                  <p>Die Nutzung von Google Drive erfolgt auf Grundlage Ihrer expliziten Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO, die Sie über das Aktivieren der Inhalte auf unserer Website erteilt haben. Die Einwilligung ist jederzeit für die Zukunft widerrufbar.</p>
                  <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission sowie das EU-US Data Privacy Framework gestützt. Details finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.</p>
                </div>

                <div className="legal-section">
                  <h3>SoundCloud</h3>
                  <p>Auf unseren Seiten können Plugins des sozialen Netzwerks SoundCloud (SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin, Deutschland) integriert sein. Die SoundCloud-Plugins erkennen Sie an dem SoundCloud-Logo auf den betroffenen Inhalten.</p>
                  <p>Wenn Sie die SoundCloud-Inhalte über unser Zwei-Klick-System aktivieren, wird eine direkte Verbindung zwischen Ihrem Browser und dem SoundCloud-Server hergestellt. SoundCloud erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den SoundCloud-Button anklicken während Sie in Ihrem SoundCloud-Benutzerkonto eingeloggt sind, können Sie die Inhalte unserer Seiten mit Ihrem SoundCloud-Profil verlinken. Dadurch kann SoundCloud den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch SoundCloud erhalten.</p>
                  <p>Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von SoundCloud unter: <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">https://soundcloud.com/pages/privacy</a>.</p>
                </div>

                <div className="legal-section">
                  <h3>Mixcloud</h3>
                  <p>Auf unserer Website sind Links oder Plugins des Audio-Dienstes Mixcloud integriert. Anbieter ist die Mixcloud Limited, 275 New North Road, London N1 7AA, Großbritannien.</p>
                  <p>Bei der Nutzung oder beim Aufruf von Mixcloud-Elementen stellt Ihr Browser eine direkte Verbindung zu den Servern von Mixcloud her. Hierdurch erhält Mixcloud die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Die Nutzung von Mixcloud erfolgt auf Grundlage unseres berechtigten Interesses an der ansprechenden Gestaltung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO) oder auf Grundlage Ihrer Einwilligung. Für den Datentransfer nach Großbritannien liegt ein Angemessenheitsbeschluss der Europäischen Kommission vor.</p>
                  <p>Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Mixcloud: <a href="https://www.mixcloud.com/privacy/" target="_blank" rel="noopener noreferrer">https://www.mixcloud.com/privacy/</a>.</p>
                </div>

                <div className="legal-section">
                  <h3>Beatport, Instagram & YouTube (Externe Verlinkungen)</h3>
                  <p>Auf unserer Webseite befinden sich Hyperlinks zu externen Social-Media-Plattformen und Musikdiensten (Beatport, Instagram, YouTube). Es handelt sich hierbei um reine Text- bzw. Grafiklinks, die beim Laden unserer Webseite **keine** Daten an diese Netzwerke senden. Erst wenn Sie aktiv auf einen dieser Links klicken, werden Sie auf die Plattform des Drittanbieters weitergeleitet. Dort gelten die jeweiligen Datenschutzbestimmungen der Betreiber.</p>
                  <p>Informationen zum Umgang mit Ihren Daten finden Sie in den Datenschutzrichtlinien von Beatport (<a href="https://www.beatport.com/privacy-policy" target="_blank" rel="noopener noreferrer">https://www.beatport.com/privacy-policy</a>), Instagram (<a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer">https://help.instagram.com/519522125107875</a>) und YouTube/Google (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>).</p>
                </div>

                <div className="legal-section">
                  <h3>iTunes / Apple Music</h3>
                  <p>Soweit auf dieser Webseite Verlinkungen zu iTunes oder Apple Music genutzt werden, handelt es sich um statische Links. Apple erfasst Daten erst nach der Weiterleitung auf deren Seiten. Die Datenschutzerklärung von Apple finden Sie unter: <a href="https://www.apple.com/legal/privacy/de/" target="_blank" rel="noopener noreferrer">https://www.apple.com/legal/privacy/de/</a>.</p>
                </div>
                <p><strong>Stand 09. Juli 2026</strong></p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}