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
    bookingBtn: "Book Now",
    soon: "bald",
    aboutLabel: "About",
    aboutTitle: "MAX HEFELE",
    aboutText: [
      "Max Hefele steht für 20 Jahre Clubkultur.",
      "Als Resident unter dem Namen Mexx Pain kam er aus dem Hip-Hop und lernte früh, Zwei Plattenspieler sind mehr als nur Technik. Mit Instinkt, Präzision und perfektem Timing formte er ganze Nächte. Er weiß, wie man Crowds bewegt und die Energie eines Raumes lenkt.",
      "Genau diese Erfahrung prägt heute seine Melodic Techno Sets. Max Hefele spielt keine Setlisten von der Stange. Er liest den Raum, baut Spannung auf, hält sie aus und weiß exakt, wann ein Track sitzen muss.",
      "Nach zwei Jahrzehnten hinter den Decks macht der eigene Name sichtbar, was ihn geformt hat. Der Weg vom Hip-Hop zur elektronischen Musik, ohne die Wurzeln zu kappen.",
      "Sein Sound basiert nicht auf Effekten, sondern auf Spannung, Tiefe und dem richtigen Moment. Diese Selbstsicherheit ist auch im Studio zu hören. Mit seiner Debüt-EP „CALL ME“ auf MYR Records hat er ein echtes Statement gesetzt. Die Veröffentlichung wurde unter anderem von Paul van Dyk in seiner Radiosendung „Vonyc Sessions“ (Folge 1026) gefeiert und kletterte direkt auf Platz 39 der Beatport Top 100 Melodic Techno Releases, wo sie sich sechs Tage lang in den Charts hielt.",
      "Parallel dazu erscheint alle zwei Wochen seine musikalische Vision in der YouTube-Reihe Rave in the City. Eine Stunde, die zeigt, worum es geht. Qualität statt Quantität. Erfahrung statt Zufall. Keine Show. Nur Musik.",
      "Max Hefele bringt etwas mit, das selten geworden ist, echte Club-Erfahrung und die Fähigkeit, komplette Nächte zu gestalten, ohne den roten Faden zu verlieren."
    ],
    resTitle: "Residencies",
    musicLabel: "Listen",
    musicTitle: "MUSIC",
    scDesc: "Mixes, eigene Tracks und die Rave in the City Reihe. Debüt-EP CALL ME out now auf MYR Records.",
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
      title: (count) => `${count} Exklusive Videos`,
      text: "Beim Aktivieren werden Medieninhalte von Google Drive geladen.",
      link: "Datenschutzerklärung lesen",
      btnLoad: "Videos freischalten"
    },
    videoLabel: "Videos",
    videoMore: "Alle Videos auf Google Drive",
    newsLabel: "Latest Updates",
    newsTitle: "NEWS",
    newsItems: [
      { title: "Max Hefele präsentiert Call Me [MYR]", excerpt: "Meine Vision für die EP auf MYR Records." },
      { title: "Paul van Dyk Support Vonyc Session 1026", excerpt: "Paul van Dyk supportet meinen Track Better day of life aus meiner EP Call Me." },
      { title: "Max Hefele präsentiert Call Me [MYR]", excerpt: "Hier ein kleiner Einblick in meine neue EP." },
      { title: "Rave in the City Vol. 52| Sunset Session | Melodic Techno • Indie Dance • House Mix", excerpt: "Die Rave in the City Mix Show erscheint alle zwei Wochen Freitags um 19:00 Uhr auf YouTube und SoundCloud." },
      { title: "Mein Exklusiv-Interview für Melodic Dancers", excerpt: "Hier ist mein Exklusiv-Interview für das Melodic Dancers Magazin, das Interview findet ihr auf Seite 9." }
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
    bookingBtn: "Book Now",
    soon: "soon",
    aboutLabel: "About",
    aboutTitle: "MAX HEFELE",
    aboutText: [
      "Max Hefele stands for 20 years of club culture.",
      "Starting out as a resident under the name Mexx Pain, he emerged from the Hip-Hop scene and learned early on that two turntables are more than just technique. With instinct, precision, and perfect timing, he shapes entire nights. He knows exactly how to move crowds and command the energy of a room.",
      "Exactly this experience characterizes his Melodic Techno sets today. Max Hefele doesn't play stock setlists. He reads the room, builds tension, sustains it, and knows exactly when a track needs to hit.",
      "After two decades behind the decks, his name now reflects the very forces that shaped him. It is a journey from Hip-Hop to electronic music, all without ever severing those roots.",
      "His sound isn’t based on effects, but on tension, depth, and timing. That confidence is also evident in the studio. With his debut EP “CALL ME” on MYR Records, he’s made a real statement. The release was celebrated by Paul van Dyk, among others, on his radio show “Vonyc Sessions” (Episode 1026) and climbed straight to No. 39 on the Beatport Top 100 Melodic Techno Releases, where it remained on the charts for six days.",
      "In parallel, he shares his musical vision every two weeks through the YouTube series 'Rave in the City.' One hour that captures the essence of what it’s all about: quality over quantity, experience over chance. No gimmicks. Just music.",
      "Max Hefele brings something that has become rare genuine club experience and the ability to craft entire nights without losing the thread."
    ],
    resTitle: "Residencies",
    musicLabel: "Listen",
    musicTitle: "MUSIC",
    scDesc: "Mixes, own tracks and the 'Rave in the City' series. Debut EP CALL ME out now on MYR Records.",
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
      title: (count) => `${count} Exclusive Videos`,
      text: "Loading videos will transfer data to Google Drive.",
      link: "Read Privacy Policy",
      btnLoad: "Unlock Videos"
    },
    videoLabel: "Videos",
    videoMore: "All videos on Google Drive",
    newsLabel: "Latest Updates",
    newsTitle: "NEWS",
    newsItems: [
      { title: "Max Hefele presents Call Me [MYR]", excerpt: "My vision for the EP on MYR Records." },
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
    legalTitleImprint: "IMPRINT",
    legalSubtitleImprint: "Information according to § 5 DDG",
    legalTitlePrivacy: "PRIVACY POLICY",
    legalSubtitlePrivacy: "Privacy Statement",
  }
};

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

// ─── SVG Icons ───
const Icons = {
  IG: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  ),
  SP: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.59 14.42a.62.62 0 0 1-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 1 1-.28-1.22c3.81-.87 7.08-.5 9.72 1.11a.62.62 0 0 1 .21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 1 1-.45-1.5c3.63-1.1 8.15-.56 11.24 1.34a.78.78 0 0 1 .25 1.07zm.11-2.84C14.8 8.99 9.4 8.78 6.3 9.72a.94.94 0 1 1-.54-1.8c3.56-1.08 9.52-.87 13.27 1.35a.94.94 0 0 1-.96 1.61z"/></svg>
  ),
  BP: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5.5a1 1 0 0 1 2 0v4.05l3.04 1.76a1 1 0 0 1-1 1.73l-3.54-2.04A1 1 0 0 1 11 12V7.5z"/></svg>
  ),
  SC: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M1.175 12.225a.822.822 0 00-.825.825v4.35c0 .45.375.825.825.825s.825-.375.825-.825v-4.35a.822.822 0 00-.825-.825zm2.4 2.1a.822.822 0 00-.825.825v2.25c0 .45.375.825.825.825s.825-.375.825-.825v-2.25a.822.822 0 00-.825-.825zm2.4-3.6a.822.822 0 00-.825.825v5.85c0 .45.375.825.825.825s.825-.375.825-.825v-5.85a.822.822 0 00-.825-.825zm2.4-1.8a.822.822 0 00-.825.825v7.65c0 .45.375.825.825.825s.825-.375.825-.825V9.75a.822.822 0 00-.825-.825zm2.4-1.2a.822.822 0 00-.825.825v8.85c0 .45.375.825.825.825s.825-.375.825-.825V8.55a.822.822 0 00-.825-.825zm11.225 3.3a5.526 5.526 0 00-4.025-1.725 5.552 5.552 0 00-1.2.125V6.75a.822.822 0 00-.825-.825.822.822 0 00-.825.825v10.65c0 .45.375.825.825.825h6.05a3.875 3.875 0 000-7.75z"/></svg>
  ),
  MC: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012.5 12zm4-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 016.5 9zm4-3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0110.5 6zm4 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"/></svg>
  ),
  YT: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
  ),
  AppleMusic: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.1c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3.01 1.08.08 2.18-.55 2.85-1.37z"/></svg>
  ),
  AmazonMusic: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Arrow: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  Play: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  )
};

// ─── Visual & Dynamic Styles (Tron 1982 Retro-Futurism Meets 2026 High-End) ───
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@400;500;700;800&display=swap');

  :root {
    --bg: #070707;
    --bg-elevated: #0d0f14;
    --bg-card: #12151c;
    --text: #f3f4f6;
    --text-dim: #6c7385;
    --text-mid: #9ea5b5;
    --border: rgba(0, 255, 204, 0.12);
    --border-hover: rgba(0, 255, 204, 0.5);
    --accent: #00bfff;
    --accent-bright: #00ffcc;
    --font-display: 'Syne', sans-serif;
    --font-body: 'Inter', sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }
  body, #root { background: var(--bg); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; position: relative; }

  /* SUBTLE GRID PATTERN & NOISE (TRON VIBE) */
  .noise-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-image: 
      linear-gradient(rgba(0, 255, 204, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 204, 0.015) 1px, transparent 1px),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    background-size: 60px 60px, 60px 60px, 200px 200px;
    pointer-events: none;
    z-index: 999;
  }

  /* TRON VIDEO VISUAL & 3D GRID */
  .tron-video-wrapper {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    background: var(--bg);
  }
  .tron-video-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
    mix-blend-mode: screen;
    filter: contrast(1.2) saturate(1.2) hue-rotate(-10deg);
  }
  .tron-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 15%, rgba(7,7,7,0.85) 100%),
                linear-gradient(to bottom, rgba(7,7,7,0.7) 0%, transparent 40%, rgba(7,7,7,0.95) 100%);
    z-index: 2;
  }
  .tron-grid-floor {
    position: absolute;
    bottom: -30%;
    left: -50%;
    width: 200%;
    height: 80%;
    background-image: 
      linear-gradient(rgba(0, 255, 204, 0.25) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 204, 0.25) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: perspective(600px) rotateX(75deg);
    animation: gridMove 3s linear infinite;
    z-index: 2;
    mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%);
    -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%);
  }
  @keyframes gridMove {
    0% { transform: perspective(600px) rotateX(75deg) translateY(0); }
    100% { transform: perspective(600px) rotateX(75deg) translateY(50px); }
  }

  /* LASER STREAM ANIMATION */
  .laser-stream-h {
    position: fixed;
    top: 35%;
    left: -150px;
    width: 300px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 204, 0.4), transparent);
    animation: streamHorizontal 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    pointer-events: none;
    z-index: 0;
  }
  .laser-stream-v {
    position: fixed;
    top: -150px;
    right: 25%;
    width: 1px;
    height: 300px;
    background: linear-gradient(180deg, transparent, rgba(0, 191, 255, 0.4), transparent);
    animation: streamVertical 14s cubic-bezier(0.4, 0, 0.2, 1) infinite 3s;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes streamHorizontal {
    0% { transform: translateX(0); opacity: 0; }
    20% { opacity: 0.9; }
    80% { opacity: 0.9; }
    100% { transform: translateX(110vw); opacity: 0; }
  }
  @keyframes streamVertical {
    0% { transform: translateY(0); opacity: 0; }
    20% { opacity: 0.9; }
    80% { opacity: 0.9; }
    100% { transform: translateY(110vh); opacity: 0; }
  }

  .bg-glow-orb {
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 204, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    top: -300px;
    left: -300px;
  }

  .floating-logo-wrap {
    animation: gentleFloat 4s ease-in-out infinite alternate;
    display: inline-block;
  }

  @keyframes gentleFloat {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-6px); }
  }

  .cyber-glitch-title {
    position: relative;
    display: inline-block;
    animation: glitchTrigger 12s infinite;
  }

  @keyframes glitchTrigger {
    0%, 95%, 100% { transform: translate(0); filter: none; }
    96% { transform: translate(-1px, 1px); filter: drop-shadow(2px 0 var(--accent)) drop-shadow(-2px 0 var(--accent-bright)); }
    97% { transform: translate(2px, -1px); filter: drop-shadow(-2px 0 var(--accent)) drop-shadow(2px 0 var(--accent-bright)); }
    98% { transform: translate(0); filter: none; }
  }

  .fade-logo { display: inline-flex; letter-spacing: 4px; }
  .fade-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(12px) scale(0.96);
    filter: blur(10px);
    animation: elegantFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes elegantFadeIn {
    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
  }

  /* MARQUEE TICKER */
  .marquee-container {
    background: linear-gradient(90deg, var(--accent), var(--accent-bright));
    color: #070707;
    overflow: hidden;
    white-space: nowrap;
    padding: 14px 0;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 3px;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 35px rgba(0, 255, 204, 0.3);
  }
  .marquee-track {
    display: inline-block;
    animation: marqueeScroll 22s linear infinite;
  }
  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* NAV & MODERN MENU */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 24px 60px; display: flex; justify-content: space-between; align-items: center; transition: all 0.5s var(--ease); }
  .nav.scrolled { padding: 16px 60px; background: rgba(7, 7, 7, 0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0, 255, 204, 0.15); }
  .nav-logo { font-family: var(--font-display); font-size: 18px; font-weight: 700; letter-spacing: 2px; color: var(--text); text-decoration: none; text-transform: uppercase; cursor: pointer; }
  
  .nav-right { display: flex; align-items: center; gap: 40px; }
  .nav-links { display: flex; gap: 32px; list-style: none; position: relative; }
  .nav-links a { color: var(--text-mid); text-decoration: none; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 500; transition: color 0.3s; padding: 4px 0; display: inline-block; }
  .nav-links a:hover, .nav-links a.active { color: var(--accent-bright); }

  /* BOOKING BUTTON IN HEADER */
  .nav-booking-btn {
    background: transparent;
    border: 1px solid var(--accent);
    color: var(--accent-bright);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 24px;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: 0 0 15px rgba(0, 191, 255, 0.2);
    transition: all 0.3s ease;
    white-space: nowrap;
    display: inline-block;
  }
  .nav-booking-btn:hover {
    background: var(--accent);
    color: #070707;
    box-shadow: 0 0 25px rgba(0, 255, 204, 0.5);
    transform: translateY(-1px);
  }

  .lang-switch { display: flex; gap: 6px; align-items: center; font-size: 11px; letter-spacing: 1px; }
  .lang-switch button { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 11px; font-weight: 500; transition: color 0.3s; }
  .lang-switch button.active { color: var(--accent-bright); font-weight: 700; }

  .menu-btn { display: none; background: none; border: none; color: var(--text); cursor: pointer; padding: 8px; z-index: 101; }
  .menu-btn span { display: block; width: 22px; height: 1px; background: var(--text); margin: 5px 0; transition: all 0.3s; }
  .mobile-nav { display: none; position: fixed; inset: 0; background: var(--bg); z-index: 99; flex-direction: column; justify-content: center; align-items: center; gap: 32px; }
  .mobile-nav.open { display: flex; }
  .mobile-nav a { color: var(--text); text-decoration: none; font-family: var(--font-display); font-size: 32px; font-weight: 700; text-transform: uppercase; }

  /* HERO & PARALLAX */
  .hero { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden; padding: 0 20px; }
  .hero-bg { position: absolute; inset: -100px 0; filter: brightness(0.5) contrast(1.1) hue-rotate(10deg); will-change: transform; z-index: 1; }
  .hero-content { position: relative; z-index: 4; display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; max-width: 1000px; }
  
  .hero-name { 
    font-family: var(--font-display); 
    font-size: clamp(36px, 7vw, 84px); 
    font-weight: 800; 
    letter-spacing: 6px; 
    line-height: 1.1; 
    text-transform: uppercase; 
    margin-bottom: 24px; 
    background: linear-gradient(180deg, #ffffff 0%, var(--text-mid) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(0, 255, 204, 0.25));
  }

  .hero-socials { 
    display: grid; 
    grid-template-columns: repeat(8, auto);
    justify-content: center; 
    gap: 12px; 
    margin-top: 16px; 
  }
  .hero-socials a { 
    color: var(--text-mid); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 44px; 
    height: 44px; 
    border: 1px solid var(--border); 
    border-radius: 4px; 
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background 0.3s, color 0.3s; 
    text-decoration: none; 
    background: rgba(0, 255, 204, 0.02); 
    will-change: transform;
  }
  .hero-socials a:hover { color: var(--accent-bright); border-color: var(--border-hover); background: rgba(0, 255, 204, 0.08); box-shadow: 0 0 15px rgba(0, 255, 204, 0.2); }
  .scroll-hint { position: absolute; bottom: 30px; color: var(--text-dim); cursor: pointer; transition: color 0.3s, transform 0.3s; z-index: 4; }
  .scroll-hint:hover { color: var(--accent-bright); transform: translateY(3px); }

  /* SECTIONS */
  .section { padding: 120px 60px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 3; }
  .section-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; font-weight: 600; }
  .section-title { font-family: var(--font-display); font-size: clamp(32px, 5vw, 64px); font-weight: 700; letter-spacing: -0.01em; line-height: 1; margin-bottom: 50px; text-transform: uppercase; }

  /* ABOUT */
  .about-layout { display: grid; grid-template-columns: 400px 1fr; gap: 60px; align-items: start; }
  .about-photo { width: 100%; aspect-ratio: 4/5; background: var(--bg-card); border: 1px solid var(--border); overflow: hidden; border-radius: 4px; position: relative; box-shadow: 0 0 30px rgba(0, 0, 0, 0.8); }
  .about-photo img { width: 100%; height: 120%; object-fit: cover; position: relative; top: -10%; will-change: transform; transition: transform 0.7s var(--ease); filter: contrast(1.05); }
  .about-photo:hover img { transform: scale(1.04); }
  .about-text p { color: var(--text-mid); font-size: 15px; line-height: 1.8; margin-bottom: 24px; font-weight: 300; }
  .about-text p:first-child { color: var(--text); font-size: 18px; font-weight: 400; line-height: 1.6; }
  
  .highlights { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
  .h-card { background: var(--bg-card); border: 1px solid var(--border); padding: 20px; border-radius: 4px; transition: border-color 0.3s, box-shadow 0.3s; }
  .h-card:hover { border-color: var(--border-hover); box-shadow: 0 0 15px rgba(0, 255, 204, 0.1); }
  .h-card-label { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #fff; }
  .h-card-detail { font-size: 12px; color: var(--text-dim); margin-top: 4px; }

  .residencies { margin-top: 40px; }
  .res-title { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; font-weight: 600; }
  .res-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .res-tag { font-size: 12px; color: var(--text-mid); padding: 6px 14px; border: 1px solid var(--border); border-radius: 4px; background: rgba(0, 255, 204, 0.02); transition: all 0.3s; }
  .res-tag:hover { color: var(--accent-bright); border-color: var(--border-hover); background: rgba(0, 255, 204, 0.06); }

  /* MUSIC SLIDER & 3D TILT CARDS WITH SPOTLIGHT GLOW */
  .music-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 120px 0; position: relative; z-index: 3; }
  .music-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; }
  
  .music-slider { 
    display: flex; 
    gap: 20px; 
    overflow-x: auto; 
    scroll-snap-type: x mandatory; 
    padding: 10px 10px 30px 10px; 
    margin-bottom: 40px;
    perspective: 1000px;
  }
  
  .m-card { 
    flex: 0 0 320px; 
    scroll-snap-align: start; 
    background: var(--bg-card); 
    border: 1px solid var(--border); 
    border-radius: 4px; 
    padding: 24px; 
    text-decoration: none; 
    color: inherit; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s; 
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    will-change: transform;
    cursor: pointer;
  }
  
  /* SPOTLIGHT GLOW OVERLAY FOR TILTCARDS */
  .m-card::before, .unified-consent-box::before, .video-frame::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 204, 0.15), transparent 80%);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 1;
  }
  .m-card:hover::before, .unified-consent-box:hover::before, .video-frame:hover::before {
    opacity: 1;
  }

  .m-card[data-brand="soundcloud"] { --brand-color: #ff5500; }
  .m-card[data-brand="spotify"] { --brand-color: #1ed760; }
  .m-card[data-brand="youtube"] { --brand-color: #ff0000; }
  .m-card[data-brand="beatport"] { --brand-color: #00ff8f; }
  .m-card[data-brand="applemusic"] { --brand-color: #fa243c; }
  .m-card[data-brand="mixcloud"] { --brand-color: #5000ff; }
  .m-card[data-brand="amazonmusic"] { --brand-color: #00a8e1; }

  .m-card .m-badge { color: var(--brand-color, var(--text-mid)); }
  .m-card .brand-icon { color: var(--brand-color, var(--text)); transition: transform 0.4s var(--ease); }
  
  .m-card:hover { 
    border-color: var(--brand-color, var(--border-hover)); 
    box-shadow: 0 12px 30px -10px rgba(0,0,0,0.8), 0 0 20px -5px var(--brand-color);
  }
  .m-card:hover .brand-icon { transform: scale(1.15) rotate(-3deg); }
  
  .m-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; z-index: 2; }
  .m-badge { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }
  .m-card-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; color: #fff; }
  .m-card-desc { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 24px; font-weight: 300; }
  .m-card-link { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; font-weight: 600; color: #fff; position: relative; z-index: 2; }

  /* CONSENT OVERLAYS */
  .unified-consent-box {
    position: relative;
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    background: var(--bg-card);
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
    transform-style: preserve-3d;
    will-change: transform;
  }
  .unified-consent-box:hover { border-color: var(--border-hover); }

  .sc-height { height: 180px; }
  .vd-height { height: 260px; }

  .consent-bg-wave {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0.15;
    pointer-events: none;
  }
  .consent-bg-wave span {
    width: 8px;
    height: 40%;
    background: var(--accent-bright);
    border-radius: 2px;
    animation: wavePulse 1.4s infinite ease-in-out alternate;
  }
  .consent-bg-wave span:nth-child(2n) { animation-delay: 0.2s; }
  .consent-bg-wave span:nth-child(3n) { animation-delay: 0.4s; }
  .consent-bg-wave span:nth-child(4n) { animation-delay: 0.6s; }

  @keyframes wavePulse {
    0% { height: 20%; opacity: 0.2; }
    100% { height: 85%; opacity: 0.9; }
  }

  .consent-overlay-content {
    position: absolute;
    inset: 0;
    background: rgba(7, 9, 13, 0.86);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    text-align: center;
    z-index: 2;
  }

  .overlay-brand-logo {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 4px;
    color: var(--accent-bright);
    text-transform: uppercase;
    margin-bottom: 14px;
    filter: drop-shadow(0 0 10px rgba(0, 255, 204, 0.4));
  }

  .media-play-btn {
    width: 56px;
    height: 56px;
    background: var(--accent);
    border: none;
    border-radius: 4px;
    color: #070707;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s, background 0.3s;
    box-shadow: 0 0 20px rgba(0, 191, 255, 0.4);
    will-change: transform;
  }
  .media-play-btn:hover {
    background: var(--accent-bright);
    box-shadow: 0 0 30px rgba(0, 255, 204, 0.7);
  }

  .media-consent-text { font-size: 11px; color: var(--text-mid); margin-top: 14px; max-width: 440px; line-height: 1.5; }
  .media-privacy-link { background: none; border: none; color: #fff; text-decoration: underline; cursor: pointer; font-size: 11px; }

  /* VIDEO GRID */
  .video-block { margin-top: 80px; }
  .video-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .video-frame { 
    position: relative;
    width: 100%; 
    aspect-ratio: 16/9; 
    border: 1px solid var(--border); 
    border-radius: 4px; 
    overflow: hidden; 
    background: #000; 
    animation: gridPop 0.6s var(--ease) forwards;
  }
  @keyframes gridPop {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .video-frame iframe { width: 100%; height: 100%; border: none; position: relative; z-index: 2; }
  .video-more { margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-mid); text-decoration: none; transition: color 0.3s; }
  .video-more:hover { color: var(--accent-bright); }

  /* NEWS */
  .news-grid { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; }
  .n-card { flex: 0 0 360px; scroll-snap-align: start; background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; text-decoration: none; color: inherit; transition: all 0.4s var(--ease); display: flex; flex-direction: column; }
  .n-card:hover { border-color: var(--border-hover); transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 255, 204, 0.1); }
  .n-img-wrap { width: 100%; aspect-ratio: 16/9; background: var(--bg-elevated); border-bottom: 1px solid var(--border); overflow: hidden; }
  .n-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
  .n-card:hover .n-img { transform: scale(1.05); }
  .n-content { padding: 24px; display: flex; flex-direction: column; flex: 1; }
  .n-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--accent); margin-bottom: 12px; font-weight: 500; }
  .n-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; color: #fff; }
  .n-excerpt { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 20px; flex: 1; font-weight: 300; }
  .n-link { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--accent-bright); font-weight: 600; display: flex; align-items: center; gap: 6px; }

  /* DATES & CONTACT */
  .dates-empty { text-align: center; padding: 80px 0; border: 1px dashed var(--border); border-radius: 4px; background: rgba(0, 255, 204, 0.01); }
  .dates-empty-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--text-mid); margin-bottom: 8px; }
  .dates-empty-sub { font-size: 13px; color: var(--text-dim); }

  .contact-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); padding: 120px 0; position: relative; z-index: 3; }
  .contact-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
  .contact-email { display: flex; align-items: center; gap: 12px; color: var(--text); text-decoration: none; font-size: 16px; padding: 24px 0; border-bottom: 1px solid var(--border); transition: border-color 0.3s, color 0.3s; }
  .contact-email:hover { border-color: var(--border-hover); color: var(--accent-bright); }
  .contact-social { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text-mid); font-size: 13px; letter-spacing: 1px; text-transform: uppercase; transition: color 0.3s; }
  .contact-social:hover { color: var(--accent-bright); }

  .footer { padding: 40px 60px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-dim); border-top: 1px solid var(--border); position: relative; z-index: 3; }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { background: none; border: none; color: var(--text-dim); font-size: 11px; cursor: pointer; transition: color 0.3s; }
  .footer-link:hover { color: var(--accent-bright); }

  /* MODALS */
  .legal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(7, 7, 7, 0.92); backdrop-filter: blur(20px); display: flex; justify-content: center; align-items: flex-start; padding: 80px 24px; overflow-y: auto; }
  .legal-box { background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px; max-width: 760px; width: 100%; padding: 48px; position: relative; box-shadow: 0 0 50px rgba(0, 255, 204, 0.1); }
  .legal-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: var(--text-mid); font-size: 24px; cursor: pointer; transition: color 0.3s; }
  .legal-close:hover { color: var(--accent-bright); }
  .legal-title { font-family: var(--font-display); font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #fff; }
  .legal-subtitle { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); margin-bottom: 32px; font-weight: 600; }
  .legal-section { margin-bottom: 24px; }
  .legal-section h3 { font-size: 16px; margin-bottom: 12px; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 6px; }
  .legal-section p { font-size: 13px; color: var(--text-mid); line-height: 1.7; margin-bottom: 12px; }
  .legal-section ul { font-size: 13px; color: var(--text-mid); line-height: 1.7; margin-bottom: 12px; padding-left: 20px; }
  .legal-section li { margin-bottom: 6px; }
  .legal-section a { color: var(--accent-bright); text-decoration: underline; }
  .legal-placeholder { background: var(--bg); border: 1px solid var(--border); padding: 16px; border-radius: 4px; font-size: 13px; color: var(--text-mid); margin-top: 8px; line-height: 1.6; }

  /* REVEAL ANIMATION */
  .rv { 
    opacity: 0; 
    filter: blur(12px);
    transform: translateY(24px) scale(0.98); 
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                filter 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); 
    will-change: opacity, filter, transform;
  }
  .rv.vis { 
    opacity: 1; 
    filter: blur(0px);
    transform: translateY(0) scale(1); 
  }

  @media (max-width: 1024px) {
    .section, .music-inner, .contact-inner { padding: 80px 24px; }
    .nav { padding: 16px 24px; }
    .nav.scrolled { padding: 14px 24px; }
    .nav-links { display: none; }
    .nav-right { gap: 16px; }
    .menu-btn { display: block; }
    .about-layout { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { max-width: 320px; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .video-grid { grid-template-columns: repeat(2, 1fr); }
    .footer { flex-direction: column; gap: 20px; text-align: center; }
  }

  @media (max-width: 640px) {
    .hero-socials { 
      grid-template-columns: repeat(4, 1fr); 
      gap: 12px 16px; 
    }
    .hero-socials a { width: 42px; height: 42px; }
    .nav-booking-btn { font-size: 10px; padding: 8px 16px; }
    .highlights { grid-template-columns: 1fr; }
    .video-grid { grid-template-columns: 1fr; }
    .m-card { flex: 0 0 260px; padding: 20px; }
    .n-card { flex: 0 0 280px; }
    .legal-box { padding: 24px; }
  }
`;

function ElegantFadeText({ text }) {
  return (
    <span className="fade-logo cyber-glitch-title">
      {text.split("").map((char, index) => (
        <span key={index} className="fade-char" style={{ animationDelay: `${index * 0.05}s`, marginRight: char === " " ? "6px" : "0px" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function useReveal(threshold = 0.15) {
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

function MagneticButton({ children, className = "", style = {}, ...props }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current || window.innerWidth < 1024) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: "inline-block", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

function TiltCard({ children, className = "", style = {}, ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

    if (window.innerWidth < 1024) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 9;
    const rotateY = (x / rect.width) * 9;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default function MaxHefele() {
  const [lang, setLang] = useState('de');
  const t = T[lang];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);
  
  const [allowSoundCloud, setAllowSoundCloud] = useState(false);
  const [allowGoogleDrive, setAllowGoogleDrive] = useState(false);

  const orbRef = useRef(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });

  const openModal = (type) => {
    setLegalModal(type);
    window.history.pushState({ modalOpen: true }, "");
  };

  const closeModal = () => {
    setLegalModal(null);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (legalModal) {
        setLegalModal(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLegalModal(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [legalModal]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAllowSoundCloud(localStorage.getItem("consent-soundcloud") === "true");
      setAllowGoogleDrive(localStorage.getItem("consent-googledrive") === "true");
    }

    const handleMouseMove = (e) => {
      mouseTargetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScrollParallax = () => {
      const scrollY = window.scrollY;
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      const aboutImg = document.querySelector('.about-photo img');
      if (aboutImg) {
        aboutImg.style.transform = `translateY(${scrollY * 0.05}px) scale(1.04)`;
      }
      setScrolled(scrollY > 50);
    };
    window.addEventListener("scroll", handleScrollParallax, { passive: true });

    let animationFrameId;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (mouseTargetRef.current.x - currentX) * 0.08;
      currentY += (mouseTargetRef.current.y - currentY) * 0.08;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScrollParallax);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const resetConsent = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("consent-soundcloud");
      localStorage.removeItem("consent-googledrive");
    }
    setAllowSoundCloud(false);
    setAllowGoogleDrive(false);
    alert(t.revokeAlert);
  };

  return (
    <>
      <style>{css}</style>
      <div className="noise-overlay" />
      <div className="laser-stream-h" />
      <div className="laser-stream-v" />
      <div ref={orbRef} className="bg-glow-orb" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ElegantFadeText text={ARTIST_NAME} />
          <span style={{ color: 'var(--accent-bright)' }}>.</span>
        </span>
        
        <div className="nav-right">
          <ul className="nav-links">
            {t.nav.map(item => (
              <li key={item.id}><a href={`#${item.id}`} onClick={e => { e.preventDefault(); go(item.id); }}>{item.label}</a></li>
            ))}
          </ul>
          
          <MagneticButton>
            <a href="#contact" onClick={e => { e.preventDefault(); go("contact"); }} className="nav-booking-btn">
              {t.bookingBtn}
            </a>
          </MagneticButton>

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
        <a href="#contact" onClick={e => { e.preventDefault(); go("contact"); }} style={{ color: '#070707', background: 'var(--accent-bright)', padding: '12px 32px', borderRadius: '4px', fontSize: '18px', whiteSpace: 'nowrap' }}>{t.bookingBtn}</a>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        {/* TRON VIDEO VISUAL BACKGROUND */}
        <div className="tron-video-wrapper">
          <video autoPlay loop muted playsInline className="tron-video-bg">
            <source src={`${BASE_URL}videos/tron-visual.mp4`} type="video/mp4" />
          </video>
          <div className="tron-grid-floor" />
          <div className="tron-overlay" />
        </div>

        {/* Existing Image Background for Fallback / Blending */}
        <div className="hero-bg" style={{ background: `url('${BASE_URL}images/hero.jpg') center/cover no-repeat`, opacity: 0.25 }} />
        
        <div className="hero-content">
          <h1 className="hero-name">
            <ElegantFadeText text={ARTIST_NAME} />
          </h1>

          <div className="hero-socials">
            {SOCIAL_LINKS.map(s => {
              const Icon = Icons[s.icon] || Icons.Arrow;
              return (
                <MagneticButton key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}>
                    <Icon size={18} />
                  </a>
                </MagneticButton>
              );
            })}
          </div>
        </div>
        <div className="scroll-hint" onClick={() => go("about")}><Icons.ChevronDown /></div>
      </section>

      {/* DYNAMIC MARQUEE TICKER */}
      <div className="marquee-container">
        <div className="marquee-track">
          <span>✦ MAX HEFELE ✦ DEBUT EP 'CALL ME' OUT NOW ON MYR RECORDS ✦ STREAMING NOW ✦ </span>
          <span>✦ MAX HEFELE ✦ DEBUT EP 'CALL ME' OUT NOW ON MYR RECORDS ✦ STREAMING NOW ✦ </span>
        </div>
      </div>

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

      {/* MUSIC SLIDER */}
      <section className="music-wrap" id="music">
        <div className="music-inner">
          <Rv>
            <p className="section-label">{t.musicLabel}</p>
            <h2 className="section-title">{t.musicTitle}</h2>
          </Rv>
          <Rv delay={100}>
            <div className="music-slider">
              
              <TiltCard className="m-card" data-brand="soundcloud" onClick={() => window.open("https://soundcloud.com/maxhefele", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">SoundCloud</span><span className="brand-icon"><Icons.SC size={22} /></span></div>
                  <h3 className="m-card-name">SoundCloud</h3>
                  <p className="m-card-desc">{t.scDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </TiltCard>

              <TiltCard className="m-card" data-brand="spotify" onClick={() => window.open("https://open.spotify.com/intl-de/artist/6VT5NRA3Ems6HjcEbQDqpK?si=xc03f2ssRXS-09RH6SimcQ", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">Spotify</span><span className="brand-icon"><Icons.SP size={22} /></span></div>
                  <h3 className="m-card-name">Spotify</h3>
                  <p className="m-card-desc">{t.spDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </TiltCard>

              <TiltCard className="m-card" data-brand="youtube" onClick={() => window.open("https://www.youtube.com/@MaxHefele", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">YouTube</span><span className="brand-icon"><Icons.YT size={22} /></span></div>
                  <h3 className="m-card-name">YouTube</h3>
                  <p className="m-card-desc">{t.ytDesc}</p>
                </div>
                <div className="m-card-link">{t.watchBtn} <Icons.Arrow /></div>
              </TiltCard>

              <TiltCard className="m-card" data-brand="beatport" onClick={() => window.open("https://www.beatport.com/artist/max-hefele/2396410", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">Beatport</span><span className="brand-icon"><Icons.BP size={22} /></span></div>
                  <h3 className="m-card-name">Beatport</h3>
                  <p className="m-card-desc">{t.bpDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </TiltCard>

              <TiltCard className="m-card" data-brand="applemusic" onClick={() => window.open("https://music.apple.com/de/artist/max-hefele/6779171915", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">Apple Music</span><span className="brand-icon"><Icons.AppleMusic size={22} /></span></div>
                  <h3 className="m-card-name">Apple Music</h3>
                  <p className="m-card-desc">{t.amDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </TiltCard>

              <TiltCard className="m-card" data-brand="mixcloud" onClick={() => window.open("https://www.mixcloud.com/MaxHefele/", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">Mixcloud</span><span className="brand-icon"><Icons.MC size={22} /></span></div>
                  <h3 className="m-card-name">Mixcloud</h3>
                  <p className="m-card-desc">{t.mcDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </TiltCard>

              <TiltCard className="m-card" data-brand="amazonmusic" onClick={() => window.open("https://www.amazon.de/music/player/artists/B0H4VRN9WD/max-hefele", "_blank")}>
                <div>
                  <div className="m-card-header"><span className="m-badge">Amazon Music</span><span className="brand-icon"><Icons.AmazonMusic size={22} /></span></div>
                  <h3 className="m-card-name">Amazon Music</h3>
                  <p className="m-card-desc">{t.azDesc}</p>
                </div>
                <div className="m-card-link">{t.listenBtn} <Icons.Arrow /></div>
              </TiltCard>

            </div>
          </Rv>
          
          <Rv delay={150}>
            <div style={{ marginTop: '20px' }}>
              {!allowSoundCloud ? (
                <TiltCard className="unified-consent-box sc-height">
                  <div className="consent-bg-wave"><span/><span/><span/><span/><span/><span/><span/><span/></div>
                  <div className="consent-overlay-content">
                    <div className="floating-logo-wrap"><div className="overlay-brand-logo">{ARTIST_NAME}</div></div>
                    <MagneticButton>
                      <button className="media-play-btn" aria-label="Player laden" onClick={() => {
                        setAllowSoundCloud(true);
                        if (typeof window !== "undefined") localStorage.setItem("consent-soundcloud", "true");
                      }}><Icons.Play /></button>
                    </MagneticButton>
                    <p className="media-consent-text">
                      {t.consentSC.text}{' '}
                      <button className="media-privacy-link" onClick={() => openModal("datenschutz")}>{t.consentSC.link}</button>
                    </p>
                  </div>
                </TiltCard>
              ) : (
                <div className="unified-consent-box" style={{ height: '166px' }}>
                  <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/maxhefele&color=%2300ffcc&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" style={{ border: 0, display: 'block' }} title="SoundCloud Player" />
                </div>
              )}
            </div>
          </Rv>

          <Rv delay={200}>
            <div className="video-block" id="videos">
              <div className="section-label" style={{ marginBottom: '20px' }}>{t.videoLabel}</div>
              
              {!allowGoogleDrive ? (
                <TiltCard className="unified-consent-box vd-height">
                  <div className="consent-bg-wave"><span/><span/><span/><span/><span/><span/><span/><span/></div>
                  <div className="consent-overlay-content">
                    <div className="floating-logo-wrap"><div className="overlay-brand-logo">{ARTIST_NAME}</div></div>
                    <MagneticButton>
                      <button className="media-play-btn" aria-label="Videos freischalten" onClick={() => {
                        setAllowGoogleDrive(true);
                        if (typeof window !== "undefined") localStorage.setItem("consent-googledrive", "true");
                      }}><Icons.Play /></button>
                    </MagneticButton>
                    <p className="media-consent-text">
                      {t.consentVD.title(VIDEO_IDS.length)} — {t.consentVD.text}{' '}
                      <button className="media-privacy-link" onClick={() => openModal("datenschutz")}>{t.consentVD.link}</button>
                    </p>
                  </div>
                </TiltCard>
              ) : (
                <div className="video-grid">
                  {VIDEO_IDS.map((id, i) => (
                    <TiltCard key={id} className="video-frame" style={{ animationDelay: `${i * 0.08}s` }}>
                      <iframe src={`https://drive.google.com/file/d/${id}/preview`} allow="autoplay; encrypted-media" allowFullScreen title={`Video ${i + 1}`} loading="lazy" />
                    </TiltCard>
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

      {/* NEWS */}
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
                  <img className="n-img" src={NEWS_ITEMS[index].image.startsWith('http') ? NEWS_ITEMS[index].image : `${BASE_URL}${NEWS_ITEMS[index].image}`} alt={item.title} loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div className="n-content">
                  <div className="n-meta"><span>{NEWS_ITEMS[index].date}</span><span>{NEWS_ITEMS[index].category}</span></div>
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
                <p style={{ color: "var(--text-mid)", fontSize: "15px", lineHeight: "1.7", marginBottom: "32px", fontWeight: "300" }}>{t.contactText}</p>
                <a className="contact-email" href="mailto:info@maxhefele.de"><Icons.Mail /> info@maxhefele.de</a>
              </Rv>
            </div>
            <div>
              <Rv delay={200}>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.name} className="contact-social" href={s.url} target="_blank" rel="noopener noreferrer">{s.name} <Icons.Arrow /></a>
                ))}
              </Rv>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>© {new Date().getFullYear()} {ARTIST_NAME} — {t.footerRights}</div>
        <div className="footer-links">
          <button className="footer-link" onClick={() => openModal("impressum")}>{t.imprintBtn}</button>
          <button className="footer-link" onClick={() => openModal("datenschutz")}>{t.privacyBtn}</button>
        </div>
      </footer>

      {legalModal && (
        <div className="legal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="legal-box">
            <button className="legal-close" onClick={closeModal}>✕</button>

            {legalModal === "impressum" && (
              <>
                <h2 className="legal-title">{t.legalTitleImprint}</h2>
                <p className="legal-subtitle">{t.legalSubtitleImprint}</p>
                <div className="legal-section">
                  <h3>Angaben gemäß § 5 DDG</h3>
                  <div className="legal-placeholder">
                    <strong>Verantwortlich:</strong><br />
                    Max Hefele<br />
                    Kapellenfeld 3<br />
                    86865 Markt Wald<br />
                    Deutschland
                  </div>
                </div>
                <div className="legal-section">
                  <h3>Kontakt</h3>
                  <p>E-Mail: <a href="mailto:info@maxhefele.de">info@maxhefele.de</a></p>
                </div>
                <div className="legal-section">
                  <h3>EU-Streitschlichtung</h3>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                      https://ec.europa.eu/consumers/odr/
                    </a>.
                  </p>
                  <p>
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
                  <ul>
                    <li>
                      <strong>Allgemeine Hinweise:</strong> Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                    </li>
                    <li>
                      <strong>Verantwortliche Stelle:</strong> Max Hefele, Kapellenfeld 3, 86865 Markt Wald, E-Mail: info@maxhefele.de. Die verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                    </li>
                    <li>
                      <strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung:</strong> Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                    </li>
                    <li>
                      <strong>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde:</strong> Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                    </li>
                    <li>
                      <strong>Recht auf Auskunft, Löschung und Berichtigung:</strong> Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
                    </li>
                  </ul>
                  <div style={{ marginTop: '16px', marginBottom: '24px' }}>
                    <button onClick={resetConsent} className="media-play-btn" style={{ width: 'auto', height: 'auto', padding: '10px 20px', borderRadius: '4px', fontSize: '11px', color: '#070707' }}>
                      {t.revokeBtn}
                    </button>
                  </div>
                </div>

                <div className="legal-section">
                  <h3>2. Hosting und Drittanbieter-Dienste</h3>
                  <ul>
                    <li>
                      <strong>GitHub Pages (Hosting):</strong> Wir hosten diese Website über den Dienst GitHub Pages der GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA. Beim Besuch der Seite erfasst GitHub Protokolldaten (z. B. IP-Adresse, Browsertyp, Betriebssystem) auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen finden Sie in der Datenschutzerklärung von GitHub:{' '}
                      <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">
                        https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement
                      </a>.
                    </li>
                    <li>
                      <strong>Google Drive (Einbindung von Inhalten/Videos):</strong> Inhalte/Videos werden über Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland eingebunden. Das Aufrufen über das Zwei-Klick-System übermittelt Daten (wie Ihre IP-Adresse) an Google und erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Details finden Sie bei Google:{' '}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                        https://policies.google.com/privacy
                      </a>.
                    </li>
                    <li>
                      <strong>SoundCloud:</strong> Auf den Seiten sind Plugins der SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin, Deutschland integriert. Die Aktivierung über das Zwei-Klick-System stellt eine Verbindung zu SoundCloud-Servern her und verarbeitet Daten auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Details:{' '}
                      <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer">
                        https://soundcloud.com/pages/privacy
                      </a>.
                    </li>
                    <li>
                      <strong>Mixcloud:</strong> Die Website enthält Links/Plugins der Mixcloud Limited, 275 New North Road, London N1 7AA, Großbritannien. Die Nutzung erfolgt auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) oder auf Grundlage Ihrer Einwilligung. Details:{' '}
                      <a href="https://www.mixcloud.com/privacy/" target="_blank" rel="noopener noreferrer">
                        https://www.mixcloud.com/privacy/
                      </a>.
                    </li>
                    <li>
                      <strong>Beatport, Instagram & YouTube (Externe Verlinkungen):</strong> Es handelt sich um reine Text- bzw. Grafiklinks, die beim Laden der Webseite keine Daten an diese Netzwerke senden. Erst bei aktivem Klick werden Sie weitergeleitet und es gelten die Datenschutzbestimmungen der jeweiligen Betreiber.
                    </li>
                    <li>
                      <strong>iTunes / Apple Music:</strong> Soweit Verlinkungen genutzt werden, handelt es sich um statische Links. Apple erfasst Daten erst nach der Weiterleitung auf deren Seiten. Details:{' '}
                      <a href="https://www.apple.com/legal/privacy/de/" target="_blank" rel="noopener noreferrer">
                        https://www.apple.com/legal/privacy/de/
                      </a>.
                    </li>
                  </ul>
                </div>

                <p style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-dim)' }}>
                  <strong>Stand:</strong> 09. Juli 2026
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}