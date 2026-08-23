"use client";
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
      "Als Resident unter dem Namen Mexx Pain kam er aus dem Hip-Hop und lernte früh, Zwei Plattenspieler sind mehr als nur Technik. Mit Instinkt, Präzision und perfektem Timing formte er ganze Nächte. Er weiß, wie man Crowds bewegt und die Energie eines Raumes lenkt.",
      "Genau diese Erfahrung prägt heute seine Melodic Techno Sets. Max Hefele spielt keine Setlisten von der Stange. Er liest den Raum, baut Spannung auf, hält sie aus und weiß exakt, wann ein Track sitzen muss.",
      "Nach zwei Jahrzehnten hinter den Decks macht der eigene Name sichtbar, was ihn geformt hat. Der Weg vom Hip-Hop zur elektronischen Musik, ohne die Wurzeln zu kappen.",
      "Sein Sound setzt nicht auf Effekte. Er setzt auf Spannung, Tiefe und den richtigen Moment. Diese Souveränität hört man auch im Studio: Mit seiner Debüt-EP CALL ME auf MYR Records hat er ein echtes Ausrufezeichen gesetzt. Der Release wurde unter anderem von Paul van Dyk in seiner Radioshow Vonyc Sessions (Folge 1026) gefeiert und kletterte direkt auf Platz 39 der Beatport Top 100 Melodic Techno Releases, wo sich die EP über sechs Tage halten konnte.",
      "Parallel dazu erscheint alle zwei Wochen seine musikalische Vision in der YouTube-Reihe Rave in the City. Eine Stunde, die zeigt, worum es geht. Qualität statt Quantität. Erfahrung statt Zufall. Keine Show. Nur Musik.",
      "Max Hefele brings etwas mit, das selten geworden ist, echte Club-Erfahrung und die Fähigkeit, komplette Nächte zu gestalten, ohne den roten Faden zu verlieren."
    ],
    resTitle: "Residencies",
    musicLabel: "Listen",
    musicTitle: "MUSIC",
    scDesc: "Mixes, eigene Tracks und die Rave in the City Reihe. Debüt-EP demnächst auf MYR Records.",
    ytDesc: "Rave in the City — kuratierte Ein-Stunden-Sets, alle zwei Wochen neu.",
    mcDesc: "Komplette DJ-Sets und Live-Mitschnitte — die volle musikalische Reise.",
    bpDesc: "Tracks, Releases und DJ-Musik von Max Hefele auf Beatport.",
    spDesc: "Meine neuesten Tracks, Releases und Playlists auf Spotify.",
    amDesc: "Meine Musik in bester Qualität auf Apple Music.",
    azDesc: "Meine Releases und Tracks jetzt auch auf Amazon Music.",
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
    newsItems: [
      { title: "Max Hefele präsentiert Call Me [MYR]", excerpt: "Meine Vision für die kommende EP auf MYR Records." },
      { title: "Paul van Dyk Support Vonyc Session 1026", excerpt: "Paul van Dyk Supportet meinen Track Better day of life aus meiner EP-Call ME." },
      { title: "Max Hefele präsentiert Call Me [MYR]", excerpt: "Hier ein kleiner einblick in meine neue EP." },
      { title: "Rave in the City Vol. 52| Sunset Session | Melodic Techno • Indie Dance • House Mix", excerpt: "Die Rave in the City Mix Show erscheint alle zwei Wochen Freitags um 19:00 Uhr auf YouTube und SoundCloud." },
      { title: "Mein Exclusiv Interview für Melodic Dancers", excerpt: "Hier ist mein Exclusiv Interview für das Melodic Dancers Magazin, das Interview findet ihr auf Seite 9." }
    ],
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
      "Starting out as a resident under the name Mexx Pain, he emerged from the Hip-Hop scene and learned early on that two turntables are more than just technique. With instinct, precision, and perfect timing, he shapes entire nights. He knows exactly how to move crowds and command the energy of a room.",
      "Exactly this experience characterizes his Melodic Techno sets today. Max Hefele doesn't play stock setlists. He reads the room, builds tension, sustains it, and knows exactly when a track needs to hit.",
      "After two decades behind the decks, his name now reflects the very forces that shaped him. It is a journey from Hip-Hop to electronic music, all without ever severing those roots.",
      "His sound doesn't rely on effects. It relies on tension, depth, and the right moment. This confidence can also be heard in the studio: With his debut EP CALL ME on MYR Records, he has set a real statement. The release was celebrated by Paul van Dyk on his radio show Vonyc Sessions (episode 1026) among others, and climbed directly to #39 on the Beatport Top 100 Melodic Techno Releases, holding its position in the charts for six days.",
      "In parallel, he shares his musical vision every two weeks through the YouTube series 'Rave in the City.' One hour that captures the essence of what it’s all about: quality over quantity, experience over chance. No gimmicks. Just music.",
      "Max Hefele brings something that has become rare genuine club experience and the ability to craft entire nights without losing the thread."
    ],
    resTitle: "Residencies",
    musicLabel: "Listen",
    musicTitle: "MUSIC",
    scDesc: "Mixes, own tracks and the 'Rave in the City' series. Debut EP coming soon on MYR Records.",
    ytDesc: "Rave in the City — curated one-hour sets, new every two weeks.",
    mcDesc: "Complete DJ sets and live recordings — the full musical journey.",
    bpDesc: "Tracks, releases and DJ music by Max Hefele on Beatport.",
    spDesc: "My latest tracks, releases and playlists on Spotify.",
    amDesc: "Listen to my music in premium quality on Apple Music.",
    azDesc: "My releases and tracks now on Amazon Music too.",
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
    newsItems: [
      { title: "Max Hefele presents Call Me [MYR]", excerpt: "My vision for the upcoming EP on MYR Records." },
      { title: "Paul van Dyk Supports Vonyc Session 1026", excerpt: "Paul van Dyk is supporting my track 'Better Day of Life' from my 'Call Me' EP." },
      { title: "Max Hefele presents Call Me [MYR]", excerpt: "Here is a quick look at my new EP." },
      { title: "Rave in the City Vol. 52| Sunset Session | Melodic Techno • Indie Dance • House Mix", excerpt: "The Rave in the City mix show is released every two weeks..." },
      { title: "My exclusive interview for Melodic Dancers", excerpt: "Here is my exclusive interview for Melodic Dancers magazine; you can find the interview on page 9."}
    ],
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
    legalTitleImprint: "IMPRESSUM",
    legalSubtitleImprint: "Information according to § 5 DDG",
    legalTitlePrivacy: "PRIVACY POLICY",
    legalSubtitlePrivacy: "Privacy Statement",
  }
};

// ─── Config ───
const ARTIST_NAME = "MAX HEFELE";

const BASE_URL = typeof import.meta !== "undefined" && import.meta.env ? (import.meta.env.BASE_URL || "") : "";

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/max.hefele.music/", icon: "IG" },
  { name: "SoundCloud", url: "https://soundcloud.com/maxhefele", icon: "SC" },
  { name: "YouTube", url: "https://www.youtube.com/@MaxHefele", icon: "YT" },
  { name: "Mixcloud", url: "https://www.mixcloud.com/MaxHefele/", icon: "MC" },
  { name: "Spotify", url: "https://open.spotify.com/intl-de/artist/6VT5NRA3Ems6HjcEbQDqpK?si=xc03f2ssRXS-09RH6SimcQ", icon: "SP" },
  { name: "Apple Music", url: "https://music.apple.com/de/artist/max-hefele/6779171915", icon: "AppleMusic" },
  { name: "Amazon Music", url: "https://www.amazon.de/music/player/artists/B0H4VRN9WD/max-hefele", icon: "AmazonMusic" },
  { name: "Beatport", url: "https://www.beatport.com/artist/max-hefele/2396410", icon: "BP" }
];

const GOOGLE_DRIVE = {
  videos: "https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0",
};

const NEWS_ITEMS = [
  { id: 1, date: "09.07.2026", category: "Interview", link: "https://www.chromatic-club.com/post/max-hefele-presents-call-me-myr", image: "images/chromaticclub.jpg" },
  { id: 2, date: "05.07.2026", category: "Paul van Dyk's VONYC Sessions 1026 Support my Track Better Day of Life", link: "https://www.youtube.com/watch?v=AIGRuvQBEvs", image: "images/vonycsession.jpg" },
  { id: 3, date: "09.07.2026", category: "Interview with the last future", link: "https://thelastfuture.wixsite.com/thelastfuture/post/max-hefele-presents-call-me-myr", image: "images/thelastfuture.jpg" },
  { id: 4, date: "10.07.2026", category: "New Episode Rave in the City", link: "https://youtu.be/xGbPAuIDj6o?si=xGAMJ8hxRATiVSKM", image: "images/rvitc.jpg" },
  { id: 5, date: "26.07.2026", category: "My exclusive interview for Melodic Dancers can be found on page 9.", link: "https://www.melodicdancers.com/in-conversation-with-max-hefele?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnxbE2nY2irYoab9nlbXcj5Ys3QdqsliYzX87v67kiMa5Pjvkz1uxrkZtPCA8_aem_02qXV-HXORBgqnfSalckaQ", image: "images/melodicdancers.jpg" },
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

// ─── SVG Icons Gefixt & Standardisiert ───
const Icons = {
  IG: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  SP: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.59 14.42a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.11a.62.62 0 0 1 .21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.5c3.63-1.1 8.15-.56 11.24 1.34a.78.78 0 0 1 .25 1.07zm.11-2.84C14.8 8.99 9.4 8.78 6.3 9.72a.94.94 0 1 1-.54-1.8c3.56-1.08 9.52-.87 13.27 1.35a.94.94 0 0 1-.96 1.61z"/>
    </svg>
  ),
  BP: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5.5a1 1 0 0 1 2 0v4.05l3.04 1.76a1 1 0 0 1-1 1.73l-3.54-2.04A1 1 0 0 1 11 12V7.5z"/>
    </svg>
  ),
  SC: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.175 12.225a.822.822 0 00-.825.825v4.35c0 .45.375.825.825.825s.825-.375.825-.825v-4.35a.822.822 0 00-.825-.825zm2.4 2.1a.822.822 0 00-.825.825v2.25c0 .45.375.825.825.825s.825-.375.825-.825v-2.25a.822.822 0 00-.825-.825zm2.4-3.6a.822.822 0 00-.825.825v5.85c0 .45.375.825.825.825s.825-.375.825-.825v-5.85a.822.822 0 00-.825-.825zm2.4-1.8a.822.822 0 00-.825.825v7.65c0 .45.375.825.825.825s.825-.375.825-.825V9.75a.822.822 0 00-.825-.825zm2.4-1.2a.822.822 0 00-.825.825v8.85c0 .45.375.825.825.825s.825-.375.825-.825V8.55a.822.822 0 00-.825-.825zm11.225 3.3a5.526 5.526 0 00-4.025-1.725 5.552 5.552 0 00-1.2.125V6.75a.822.822 0 00-.825-.825.822.822 0 00-.825.825v10.65c0 .45.375.825.825.825h6.05a3.875 3.875 0 000-7.75z"/>
    </svg>
  ),
  MC: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012.5 12zm4-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 016.5 9zm4-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0110.5 6zm4 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"/>
    </svg>
  ),
  YT: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  ),
  AppleMusic: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.1c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3.01 1.08.08 2.18-.55 2.85-1.37z"/>
    </svg>
  ),
  AmazonMusic: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
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

// ─── Göran Meyer Inspired Modern Agency Styles ───
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;500;700;800&display=swap');

  :root {
    --bg: #0a0a0a;
    --bg-elevated: #111111;
    --bg-card: #141414;
    --text: #f5f5f7;
    --text-dim: #666666;
    --text-mid: #999999;
    --accent: #ffffff;
    --border: rgba(255, 255, 255, 0.08);
    --border-hover: rgba(255, 255, 255, 0.25);
    --font-display: 'Syne', sans-serif;
    --font-body: 'Inter', sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }
  body, #root { background: var(--bg); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 28px 60px; display: flex; justify-content: space-between; align-items: center; transition: all 0.5s var(--ease); mix-blend-mode: difference; }
  .nav.scrolled { padding: 18px 60px; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); mix-blend-mode: normal; }
  .nav-logo { font-family: var(--font-display); font-size: 16px; font-weight: 700; letter-spacing: 2px; color: var(--text); text-decoration: none; text-transform: uppercase; }
  .nav-right { display: flex; align-items: center; gap: 40px; }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a { color: var(--text-mid); text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; transition: color 0.3s; }
  .nav-links a:hover { color: var(--text); }
  
  /* LANG SWITCHER */
  .lang-switch { display: flex; gap: 6px; align-items: center; font-size: 11px; letter-spacing: 1px; }
  .lang-switch button { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 11px; font-weight: 500; transition: color 0.3s; }
  .lang-switch button.active { color: var(--text); }

  .menu-btn { display: none; background: none; border: none; color: var(--text); cursor: pointer; padding: 8px; z-index: 101; }
  .menu-btn span { display: block; width: 22px; height: 1px; background: var(--text); margin: 5px 0; transition: all 0.3s; }
  .mobile-nav { display: none; position: fixed; inset: 0; background: var(--bg); z-index: 99; flex-direction: column; justify-content: center; align-items: center; gap: 32px; }
  .mobile-nav.open { display: flex; }
  .mobile-nav a { color: var(--text); text-decoration: none; font-family: var(--font-display); font-size: 32px; font-weight: 700; text-transform: uppercase; }

  /* HERO */
  .hero { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden; padding: 0 20px; }
  .hero-bg { position: absolute; inset: 0; filter: brightness(0.4) contrast(1.1); }
  .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .hero-name { font-family: var(--font-display); font-size: clamp(48px, 11vw, 140px); font-weight: 800; letter-spacing: -0.02em; line-height: 0.9; text-transform: uppercase; margin-bottom: 24px; }
  .hero-socials { display: flex; gap: 16px; margin-top: 12px; }
  .hero-socials a { color: var(--text-mid); display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border: 1px solid var(--border); border-radius: 50%; transition: all 0.4s var(--ease); text-decoration: none; }
  .hero-socials a:hover { color: var(--text); border-color: var(--text); transform: translateY(-2px); }
  .scroll-hint { position: absolute; bottom: 40px; color: var(--text-dim); cursor: pointer; transition: color 0.3s; }
  .scroll-hint:hover { color: var(--text); }

  /* SECTIONS */
  .section { padding: 140px 60px; max-width: 1400px; margin: 0 auto; }
  .section-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 12px; font-weight: 500; }
  .section-title { font-family: var(--font-display); font-size: clamp(40px, 6vw, 72px); font-weight: 700; letter-spacing: -0.01em; line-height: 1; margin-bottom: 60px; text-transform: uppercase; }

  /* ABOUT */
  .about-layout { display: grid; grid-template-columns: 400px 1fr; gap: 80px; align-items: start; }
  .about-photo { width: 100%; aspect-ratio: 4/5; background: var(--bg-card); border: 1px solid var(--border); overflow: hidden; border-radius: 4px; }
  .about-photo img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: filter 0.5s ease; }
  .about-photo:hover img { filter: grayscale(0%); }
  .about-text p { color: var(--text-mid); font-size: 15px; line-height: 1.8; margin-bottom: 24px; font-weight: 300; }
  .about-text p:first-child { color: var(--text); font-size: 18px; font-weight: 400; line-height: 1.6; }
  
  .highlights { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 48px; }
  .h-card { background: var(--bg-card); border: 1px solid var(--border); padding: 24px; border-radius: 4px; }
  .h-card-label { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
  .h-card-detail { font-size: 12px; color: var(--text-dim); margin-top: 4px; }

  .residencies { margin-top: 48px; }
  .res-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 16px; font-weight: 500; }
  .res-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .res-tag { font-size: 12px; color: var(--text-mid); padding: 6px 14px; border: 1px solid var(--border); border-radius: 100px; }

  /* MUSIC (MODERNER HORIZONTAL SLIDER) */
  .music-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 140px 0; }
  .music-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; }
  
  .music-slider { 
    display: flex; 
    gap: 20px; 
    overflow-x: auto; 
    scroll-snap-type: x mandatory; 
    padding-bottom: 20px; 
    margin-bottom: 40px;
  }
  
  .m-card { 
    flex: 0 0 320px; 
    scroll-snap-align: start; 
    background: var(--bg-card); 
    border: 1px solid var(--border); 
    border-radius: 8px; 
    padding: 24px; 
    text-decoration: none; 
    color: inherit; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    transition: border-color 0.4s var(--ease), transform 0.4s var(--ease); 
  }
  .m-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
  
  .m-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .m-badge { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--text-mid); }
  .m-card-name { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; }
  .m-card-desc { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 24px; font-weight: 300; }
  .m-card-link { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--text); }

  /* PRIVACY & CONSENT OVERLAYS */
  .privacy-wrapper { position: relative; width: 100%; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--bg-card); }
  .privacy-blur-overlay { position: absolute; inset: 0; z-index: 12; display: flex; justify-content: center; align-items: center; background: rgba(10, 10, 10, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 24px; }
  .media-consent-inner { display: flex; align-items: center; gap: 24px; max-width: 600px; width: 100%; justify-content: space-between; }
  .media-consent-text-wrap { text-align: left; }
  .media-consent-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .media-consent-text { font-size: 12px; color: var(--text-mid); line-height: 1.5; margin: 0; }
  .media-consent-link { background: none; border: none; padding: 0; color: var(--text); font-size: 12px; text-decoration: underline; cursor: pointer; }
  .media-consent-btn { background: var(--text); border: none; color: var(--bg); padding: 12px 24px; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px; cursor: pointer; transition: opacity 0.3s; white-space: nowrap; }
  .media-consent-btn:hover { opacity: 0.85; }

  /* NEWS SLIDER */
  .news-grid { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; }
  .n-card { flex: 0 0 380px; scroll-snap-align: start; background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; text-decoration: none; color: inherit; transition: border-color 0.4s ease; display: flex; flex-direction: column; }
  .n-card:hover { border-color: var(--border-hover); }
  .n-img-wrap { width: 100%; aspect-ratio: 16/9; background: var(--bg-elevated); border-bottom: 1px solid var(--border); overflow: hidden; }
  .n-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transition: transform 0.6s var(--ease), filter 0.6s ease; }
  .n-card:hover .n-img { transform: scale(1.03); filter: grayscale(0%); }
  .n-content { padding: 24px; display: flex; flex-direction: column; flex: 1; }
  .n-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim); margin-bottom: 12px; }
  .n-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
  .n-excerpt { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 20px; flex: 1; font-weight: 300; }
  .n-link { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--text); font-weight: 600; display: flex; align-items: center; gap: 6px; }

  /* VIDEO GRID */
  .video-block { margin-top: 80px; }
  .video-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .video-frame { width: 100%; aspect-ratio: 16/9; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: #000; }
  .video-frame iframe { width: 100%; height: 100%; border: none; }
  .video-more { margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-mid); text-decoration: none; transition: color 0.3s; }
  .video-more:hover { color: var(--text); }

  /* DATES & CONTACT & FOOTER */
  .dates-empty { text-align: center; padding: 80px 0; border: 1px dashed var(--border); border-radius: 8px; }
  .dates-empty-title { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: var(--text-mid); margin-bottom: 8px; }
  .dates-empty-sub { font-size: 13px; color: var(--text-dim); }

  .contact-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); padding: 140px 0; }
  .contact-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
  .contact-email { display: flex; align-items: center; gap: 12px; color: var(--text); text-decoration: none; font-size: 16px; padding: 24px 0; border-bottom: 1px solid var(--border); transition: border-color 0.3s; }
  .contact-email:hover { border-color: var(--border-hover); }
  .contact-social { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text-mid); font-size: 13px; letter-spacing: 1px; text-transform: uppercase; transition: color 0.3s; }
  .contact-social:hover { color: var(--text); }

  .footer { padding: 40px 60px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-dim); border-top: 1px solid var(--border); }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { background: none; border: none; color: var(--text-dim); font-size: 11px; cursor: pointer; transition: color 0.3s; }
  .footer-link:hover { color: var(--text); }

  /* MODALS */
  .legal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(20px); display: flex; justify-content: center; align-items: flex-start; padding: 80px 24px; overflow-y: auto; }
  .legal-box { background: var(--bg-card); border: 1px solid var(--border); border-radius: 8px; max-width: 720px; width: 100%; padding: 48px; position: relative; }
  .legal-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: var(--text-mid); font-size: 24px; cursor: pointer; }
  .legal-title { font-family: var(--font-display); font-size: 28px; font-weight: 700; margin-bottom: 8px; }
  .legal-subtitle { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 32px; }
  .legal-section { margin-bottom: 24px; }
  .legal-section h3 { font-size: 16px; margin-bottom: 8px; color: var(--text); }
  .legal-section p { font-size: 13px; color: var(--text-mid); line-height: 1.7; margin-bottom: 8px; }
  .legal-placeholder { background: var(--bg); border: 1px solid var(--border); padding: 16px; border-radius: 4px; font-size: 13px; color: var(--text-mid); margin-top: 8px; }

  /* REVEAL ANIMATION */
  .rv { opacity: 0; transform: translateY(20px); transition: all 0.8s var(--ease); }
  .rv.vis { opacity: 1; transform: translateY(0); }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .section, .music-inner, .contact-inner { padding: 100px 30px; }
    .nav { padding: 20px 30px; }
    .nav-links { display: none; }
    .menu-btn { display: block; }
    .about-layout { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { max-width: 320px; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .video-grid { grid-template-columns: repeat(2, 1fr); }
    .footer { flex-direction: column; gap: 20px; text-align: center; }
  }
  @media (max-width: 640px) {
    .video-grid { grid-template-columns: 1fr; }
    .m-card { flex: 0 0 280px; }
    .n-card { flex: 0 0 300px; }
    .media-consent-inner { flex-direction: column; text-align: center; }
  }
`;

// ─── Reveal Hook ───
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
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
  
  const [allowSoundCloud, setAllowSoundCloud] = useState(false);
  const [allowGoogleDrive, setAllowGoogleDrive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAllowSoundCloud(localStorage.getItem("consent-soundcloud") === "true");
      setAllowGoogleDrive(localStorage.getItem("consent-googledrive") === "true");
    }
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const resetConsent = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("consent-soundcloud");
      localStorage.removeItem("consent-googledrive");
    }
    setAllowSoundCloud(false);
    setAllowGoogleDrive(false);
    setVideosExpanded(false);
    alert(t.revokeAlert);
  };

  return (
    <>
      <style>{css}</style>

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
            <span>/</span>
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
          </div>

          <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span />
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
        <div className="hero-bg" style={{ background: `url('${BASE_URL}images/hero.jpg') center/cover no-repeat` }} />
        <div className="hero-content">
          <h1 className="hero-name">{ARTIST_NAME}</h1>
          <div className="hero-socials">
            {SOCIAL_LINKS.map(s => {
              const Icon = Icons[s.icon] || Icons.Arrow;
              return <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}><Icon size={18} /></a>;
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
        </Rv>
        <div className="about-layout">
          <Rv delay={100}>
            <div className="about-photo">
              <img src={`${BASE_URL}images/about.jpg`} alt="Max Hefele" loading="lazy" />
            </div>
          </Rv>
          <div>
            <Rv delay={150}>
              <div className="about-text">
                {t.aboutText.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </Rv>
            <Rv delay={200}>
              <div className="highlights">
                {HIGHLIGHTS.map(h => (
                  <div className="h-card" key={h.label}>
                    <div className="h-card-label">{h.label}</div>
                    <div className="h-card-detail">{h.detail}</div>
                  </div>
                ))}
              </div>
            </Rv>
            <Rv delay={250}>
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

      {/* MUSIC (ELEGANGER HORIZONTAL SLIDER) */}
      <section className="music-wrap" id="music">
        <div className="music-inner">
          <Rv>
            <p className="section-label">{t.musicLabel}</p>
            <h2 className="section-title">{t.musicTitle}</h2>
          </Rv>
          <Rv delay={100}>
            <div className="music-slider">
              
              {/* SoundCloud */}
              <a className="m-card" href="https://soundcloud.com/maxhefele" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">SoundCloud</span>
                    <Icons.SC size={22} />
                  </div>
                  <h3 className="m-card-name">SoundCloud</h3>
                  <p className="m-card-desc">{t.scDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>

              {/* Spotify */}
              <a className="m-card" href="https://open.spotify.com/intl-de/artist/6VT5NRA3Ems6HjcEbQDqpK?si=xc03f2ssRXS-09RH6SimcQ" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">Spotify</span>
                    <Icons.SP size={22} />
                  </div>
                  <h3 className="m-card-name">Spotify</h3>
                  <p className="m-card-desc">{t.spDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>

              {/* YouTube */}
              <a className="m-card" href="https://www.youtube.com/@MaxHefele" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">YouTube</span>
                    <Icons.YT size={22} />
                  </div>
                  <h3 className="m-card-name">YouTube</h3>
                  <p className="m-card-desc">{t.ytDesc}</p>
                </div>
                <div className="m-card-link">{t.watchBtn} <Icons.Arrow /></div>
              </a>

              {/* Beatport */}
              <a className="m-card" href="https://www.beatport.com/artist/max-hefele/2396410" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">Beatport</span>
                    <Icons.BP size={22} />
                  </div>
                  <h3 className="m-card-name">Beatport</h3>
                  <p className="m-card-desc">{t.bpDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>

              {/* Apple Music */}
              <a className="m-card" href="https://music.apple.com/de/artist/max-hefele/6779171915" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">Apple Music</span>
                    <Icons.AppleMusic size={22} />
                  </div>
                  <h3 className="m-card-name">Apple Music</h3>
                  <p className="m-card-desc">{t.amDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>

              {/* Mixcloud */}
              <a className="m-card" href="https://www.mixcloud.com/MaxHefele/" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">Mixcloud</span>
                    <Icons.MC size={22} />
                  </div>
                  <h3 className="m-card-name">Mixcloud</h3>
                  <p className="m-card-desc">{t.mcDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>

              {/* Amazon Music */}
              <a className="m-card" href="https://www.amazon.de/music/player/artists/B0H4VRN9WD/max-hefele" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="m-card-header">
                    <span className="m-badge">Amazon Music</span>
                    <Icons.AmazonMusic size={22} />
                  </div>
                  <h3 className="m-card-name">Amazon Music</h3>
                  <p className="m-card-desc">{t.azDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </a>

            </div>
          </Rv>
          
          {/* SOUNDCLOUD PLAYER WITH CONSENT */}
          <Rv delay={150}>
            <div className="privacy-wrapper" style={{ height: '166px', marginTop: '20px' }}>
              {!allowSoundCloud ? (
                <div className="privacy-blur-overlay">
                  <div className="media-consent-inner">
                    <div className="media-consent-text-wrap">
                      <h4 className="media-consent-title">{t.consentSC.title}</h4>
                      <p className="media-consent-text">{t.consentSC.text} <button className="media-consent-link" onClick={() => setLegalModal("datenschutz")}>{t.consentSC.link}</button></p>
                    </div>
                    <button className="media-consent-btn" onClick={() => {
                      setAllowSoundCloud(true);
                      if (typeof window !== "undefined") localStorage.setItem("consent-soundcloud", "true");
                    }}>{t.consentSC.btn}</button>
                  </div>
                </div>
              ) : (
                <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/maxhefele&color=%23111111&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" style={{ border: 0, display: 'block' }} title="SoundCloud Player" />
              )}
            </div>
          </Rv>

          {/* VIDEO-BEREICH WITH CONSENT */}
          <Rv delay={200}>
            <div className="video-block" id="videos">
              <div className="section-label" style={{ marginBottom: '20px' }}>{t.videoLabel}</div>
              
              {(!allowGoogleDrive || !videosExpanded) ? (
                <div className="privacy-wrapper" style={{ height: '220px', cursor: allowGoogleDrive ? 'pointer' : 'default' }} onClick={() => { if(allowGoogleDrive) setVideosExpanded(true); }}>
                  <div className="privacy-blur-overlay">
                    <div className="media-consent-inner">
                      <div className="media-consent-text-wrap">
                        <h4 className="media-consent-title">{t.consentVD.title(VIDEO_IDS.length)}</h4>
                        {!allowGoogleDrive && (
                          <p className="media-consent-text">
                            {t.consentVD.text} <button className="media-consent-link" onClick={(e) => { e.stopPropagation(); setLegalModal("datenschutz"); }}>{t.consentVD.link}</button>
                          </p>
                        )}
                      </div>
                      {!allowGoogleDrive ? (
                        <button className="media-consent-btn" onClick={(e) => { 
                          e.stopPropagation(); 
                          setAllowGoogleDrive(true); 
                          setVideosExpanded(true);
                          if (typeof window !== "undefined") localStorage.setItem("consent-googledrive", "true"); 
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
        </Rv>
        <Rv delay={100}>
          <div className="news-grid">
            {t.newsItems.map((item, index) => (
              <a key={index} className="n-card" href={NEWS_ITEMS[index].link} target="_blank" rel="noopener noreferrer">
                <div className="n-img-wrap">
                  <img 
                    className="n-img" 
                    src={NEWS_ITEMS[index].image.startsWith('http') ? NEWS_ITEMS[index].image : `${BASE_URL}${NEWS_ITEMS[index].image}`} 
                    alt={item.title} 
                    loading="lazy" 
                    onError={(e) => { e.target.style.display = 'none'; }} 
                  />
                </div>
                <div className="n-content">
                  <div className="n-meta">
                    <span>{NEWS_ITEMS[index].date}</span>
                    <span>{NEWS_ITEMS[index].category}</span>
                  </div>
                  <h3 className="n-title">{item.title}</h3>
                  <p className="n-excerpt">{item.excerpt}</p>
                  <div className="n-link">{t.readMore} <Icons.Arrow /></div>
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
          </Rv>
          <div className="contact-grid">
            <div>
              <Rv delay={100}>
                <p style={{ color: "var(--text-mid)", fontSize: "15px", lineHeight: "1.7", marginBottom: "32px", fontWeight: "300" }}>
                  {t.contactText}
                </p>
                <a className="contact-email" href="mailto:info@maxhefele.de">
                  <Icons.Mail /> info@maxhefele.de
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
            <button className="legal-close" onClick={() => setLegalModal(null)}>✕</button>

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
                  <p>E-Mail: <a href="mailto:info@maxhefele.de" style={{ color: '#fff' }}>info@maxhefele.de</a></p>
                </div>

                <div className="legal-section">
                  <h3>EU-Streitschlichtung</h3>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>https://ec.europa.eu/consumers/odr/</a>.<br/>
                    Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
                  <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
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
                </div>

                <div className="legal-section">
                  <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                  <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.</p>
                  <button onClick={resetConsent} className="media-consent-btn" style={{ marginTop: '12px' }}>
                    {t.revokeBtn}
                  </button>
                </div>

                <div className="legal-section">
                  <h3>2. Hosting und Drittanbieter-Dienste</h3>
                  <p><strong>GitHub Pages:</strong> Wir hosten diese Website über GitHub Pages (GitHub Inc.).</p>
                  <p><strong>Google Drive:</strong> Eingebundene Inhalte/Videos laden erst nach expliziter Aktivierung.</p>
                  <p><strong>SoundCloud:</strong> Audio-Player werden erst nach Zustimmung geladen.</p>
                  <p><strong>Externe Verlinkungen:</strong> Beatport, Instagram, YouTube, Spotify, Apple Music, Mixcloud & Amazon Music sind statische Links ohne Datentransfer vor dem Klick.</p>
                </div>
                <p style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-dim)' }}><strong>Stand 09. Juli 2026</strong></p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}