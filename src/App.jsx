"use client";
import React, { useState, useEffect, useRef } from "react";

// ─── Translations ───
const T = {
  de: {
    nav: [
      { id: "about", label: "About" },
      { id: "music", label: "Music" },
      { id: "news", label: "News" },
      { id: "dates", label: "Dates" },
      { id: "booking", label: "Booking" },
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
      { title: "Interview mit The Last Future", excerpt: "Hier ein kleiner Einblick in meine neue EP im Interview mit The Last Future." },
      { title: "Rave in the City Vol. 52 | Sunset Session", excerpt: "Die Rave in the City Mix Show erscheint alle zwei Wochen Freitags um 19:00 Uhr auf YouTube und SoundCloud." },
      { title: "Mein Exklusiv-Interview für Melodic Dancers", excerpt: "Hier ist mein Exklusiv-Interview für das Melodic Dancers Magazin, das Interview findet ihr auf Seite 9." }
    ],
    readMore: "Mehr lesen auf",
    datesLabel: "Live",
    datesTitle: "DATES",
    datesEmpty: "NEUE TERMINE WERDEN BALD BEKANNTGEGEBEN",
    datesSub: "Für Booking-Anfragen bitte Kontakt aufnehmen.",
    bookingLabel: "Promoter & Management",
    bookingTitle: "BOOKING ANFRAGE",
    bookingText: "Für Festival-Bookings, Club-Termine oder internationale Events nutze das Anfragenformular oder kontaktiere das Management direkt.",
    bookingDirectTitle: "Direkter Booking-Kontakt",
    bookingPressTitle: "Press Kit & Tech Rider",
    bookingPressDesc: "Pressefotos, Biografien und Technical Rider auf Anfrage verfügbar.",
    bookingFields: {
      name: "Name / Agentur / Veranstalter",
      email: "E-Mail-Adresse",
      date: "Event Datum",
      type: "Event Typ (Club, Festival, Private)",
      location: "Location / Stadt & Land",
      message: "Details & Nachricht",
      submit: "ANFRAGE ABSENDEN"
    },
    bookingSuccess: "Vielen Dank! Deine Booking-Anfrage wurde erfolgreich an info@maxhefele.de übermittelt.",
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
      { id: "booking", label: "Booking" },
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
      { title: "Interview with The Last Future", excerpt: "A quick look into my new EP in an exclusive interview with The Last Future." },
      { title: "Rave in the City Vol. 52 | Sunset Session", excerpt: "The Rave in the City mix show is released every two weeks..." },
      { title: "My exclusive interview for Melodic Dancers", excerpt: "Here is my exclusive interview for Melodic Dancers magazine; you can find the interview on page 9." }
    ],
    readMore: "Read more on",
    datesLabel: "Live",
    datesTitle: "DATES",
    datesEmpty: "NEW DATES WILL BE ANNOUNCED SOON",
    datesSub: "For booking inquiries please get in touch.",
    bookingLabel: "Promoter & Management",
    bookingTitle: "BOOKING INQUIRY",
    bookingText: "For festival bookings, club dates, or international events, please use the inquiry form below or contact management directly.",
    bookingDirectTitle: "Direct Booking Contact",
    bookingPressTitle: "Press Kit & Tech Rider",
    bookingPressDesc: "Press photos, press bio, and technical rider available upon request.",
    bookingFields: {
      name: "Name / Agency / Promoter",
      email: "Email Address",
      date: "Event Date",
      type: "Event Type (Club, Festival, Private)",
      location: "Location / City & Country",
      message: "Details & Message",
      submit: "SEND INQUIRY"
    },
    bookingSuccess: "Thank you! Your booking inquiry has been sent successfully to info@maxhefele.de.",
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
  { id: 2, date: "05.07.2026", category: "Paul van Dyk Support", link: "https://www.youtube.com/watch?v=AIGRuvQBEvs", image: "images/vonycsession.jpg" },
  { id: 3, date: "09.07.2026", category: "Interview", link: "https://thelastfuture.wixsite.com/thelastfuture/post/max-hefele-presents-call-me-myr", image: "images/thelastfuture.jpg" },
  { id: 4, date: "10.07.2026", category: "New Episode", link: "https://youtu.be/xGbPAuIDj6o?si=xGAMJ8hxRATiVSKM", image: "images/rvitc.jpg" },
  { id: 5, date: "26.07.2026", category: "Magazin Interview", link: "https://www.melodicdancers.com/in-conversation-with-max-hefele?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnxbE2nY2irYoab9nlbXcj5Ys3QdqsliYzX87v67kiMa5Pjvkz1uxrkZtPCA8_aem_02qXV-HXORBgqnfSalckaQ", image: "images/melodicdancers.jpg" },
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

// ─── Nocturnal Warmth & Afterlife / Tron Warehouse CSS ───
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=Space+Grotesk:wght@300;400;500;600&family=Syne:wght@400;700;800&display=swap');

  :root {
    --bg-obsidian: #010204;
    --bg-elevated: #04060e;
    --bg-card: rgba(2, 4, 10, 0.94);
    
    --text: #f4f6fb;
    --text-dim: #4e566c;
    --text-mid: #959fae;
    
    --border: rgba(255, 123, 0, 0.28);
    --border-hover: rgba(0, 242, 255, 0.9);
    
    --accent-violet: #7b2cbf;
    --accent-cyan: #00f2ff;
    --accent-amber: #ff7b00; 
    --accent-mint: #00ffa3;
    
    --font-display: 'Orbitron', 'Syne', sans-serif;
    --font-body: 'Space Grotesk', sans-serif;
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --header-h: 74px;
    
    --glass-bg: rgba(4, 7, 16, 0.88);
    --glass-border: 1px solid rgba(0, 242, 255, 0.35);
    --glass-glow: 0 0 40px rgba(0, 242, 255, 0.18);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: none; overflow-x: hidden; width: 100%; }
  ::-webkit-scrollbar { display: none; }
  body, #root { background: var(--bg-obsidian); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: hidden; position: relative; width: 100%; }

  /* 3D TRON & AFTERLIFE WAREHOUSE PERSPECTIVE GRID (HIGH VISIBILITY & DEPTH) */
  .tron-grid {
    position: fixed;
    inset: 0;
    perspective: 600px;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    opacity: 0.55;
  }
  .tron-grid-plane {
    position: absolute;
    width: 300%;
    height: 300%;
    left: -100%;
    top: -20%;
    background-image: 
      linear-gradient(to right, rgba(0, 242, 255, 0.35) 1.5px, transparent 1.5px),
      linear-gradient(to bottom, rgba(255, 123, 0, 0.35) 1.5px, transparent 1.5px);
    background-size: 55px 55px;
    transform: rotateX(75deg);
    animation: gridMove 8s linear infinite;
    box-shadow: inset 0 0 120px rgba(123, 44, 191, 0.45);
  }
  .tron-horizon {
    position: fixed;
    top: 42%;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-amber), var(--accent-violet), transparent);
    box-shadow: 0 0 35px var(--accent-cyan), 0 0 70px var(--accent-amber);
    pointer-events: none;
    z-index: 0;
    opacity: 0.75;
  }
  @keyframes gridMove {
    0% { transform: rotateX(75deg) translateY(0); }
    100% { transform: rotateX(75deg) translateY(55px); }
  }

  /* ETHEREAL SCANLINE, FILM GRAIN & CHROMA GLITCH */
  .noise-overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background-image: 
      linear-gradient(rgba(0, 242, 255, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 123, 0, 0.02) 1px, transparent 1px);
    background-size: 100% 3px, 50px 50px;
    pointer-events: none;
    z-index: 999;
  }

  /* WARM LASER & PARTICLE STREAMS */
  .laser-stream-h {
    position: fixed;
    top: 35%;
    left: -150px;
    width: 600px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-amber), transparent);
    animation: streamHorizontal 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    pointer-events: none;
    z-index: 0;
    box-shadow: 0 0 25px var(--accent-cyan);
  }
  .laser-stream-v {
    position: fixed;
    top: -150px;
    right: 25%;
    width: 2px;
    height: 600px;
    background: linear-gradient(180deg, transparent, var(--accent-violet), var(--accent-cyan), transparent);
    animation: streamVertical 9s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.5s;
    pointer-events: none;
    z-index: 0;
    box-shadow: 0 0 25px var(--accent-violet);
  }

  @keyframes streamHorizontal {
    0% { transform: translateX(0); opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { transform: translateX(115vw); opacity: 0; }
  }
  @keyframes streamVertical {
    0% { transform: translateY(0); opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { transform: translateY(115vh); opacity: 0; }
  }

  .bg-glow-orb {
    position: fixed;
    width: 850px;
    height: 850px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 242, 255, 0.12) 0%, rgba(123, 44, 191, 0.1) 45%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    top: -425px;
    left: -425px;
  }

  .floating-logo-wrap {
    animation: gentleFloat 4s ease-in-out infinite alternate;
    display: inline-block;
  }

  @keyframes gentleFloat {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-8px); }
  }

  .cyber-glitch-title {
    position: relative;
    display: inline-block;
    animation: glitchTrigger 10s infinite;
  }

  @keyframes glitchTrigger {
    0%, 95%, 100% { transform: translate(0); filter: none; }
    96% { transform: translate(-1px, 1px); filter: drop-shadow(2px 0 var(--accent-cyan)) drop-shadow(-2px 0 var(--accent-amber)); }
    97% { transform: translate(2px, -1px); filter: drop-shadow(-2px 0 var(--accent-cyan)) drop-shadow(2px 0 var(--accent-amber)); }
    98% { transform: translate(0); filter: none; }
  }

  /* 4-TO-THE-FLOOR RHYTHMIC PULSE (HOUSE BEAT FEEL) */
  .breathing-glow {
    animation: kickPulse 0.48s infinite ease-in-out alternate;
  }

  @keyframes kickPulse {
    0% { filter: drop-shadow(0 0 10px rgba(0, 242, 255, 0.4)); transform: scale(1); }
    100% { filter: drop-shadow(0 0 30px rgba(0, 242, 255, 0.9)) drop-shadow(0 0 12px rgba(255, 123, 0, 0.7)); transform: scale(1.02); }
  }

  .fade-logo { display: inline-flex; letter-spacing: 5px; flex-wrap: wrap; }
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
    background: #010204;
    border-top: 1px solid var(--accent-cyan);
    border-bottom: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
    overflow: hidden;
    white-space: nowrap;
    padding: 12px 0;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 5px;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 35px rgba(0, 242, 255, 0.35);
  }
  .marquee-track {
    display: inline-block;
    animation: marqueeScroll 22s linear infinite;
  }
  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* CYBER-HUD NAV & EQUALIZER */
  .nav { 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    z-index: 100; 
    padding: 22px 60px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    background: rgba(2, 4, 10, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0, 242, 255, 0.3);
    transition: all 0.4s var(--ease); 
  }
  .nav.scrolled { 
    padding: 14px 60px; 
    background: rgba(2, 4, 10, 0.98); 
    border-bottom: 1px solid var(--accent-cyan);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.95), 0 0 30px rgba(0, 242, 255, 0.35);
  }
  .nav-logo { 
    font-family: var(--font-display); 
    font-size: 16px; 
    font-weight: 800; 
    letter-spacing: 4px; 
    color: var(--text); 
    text-decoration: none; 
    text-transform: uppercase; 
    cursor: pointer; 
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .tron-eq {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 14px;
    padding-left: 12px;
    border-left: 1px solid rgba(0, 242, 255, 0.4);
  }
  .tron-eq-bar {
    width: 2px;
    background: var(--accent-cyan);
    box-shadow: 0 0 10px var(--accent-cyan);
    animation: eqPulse 0.48s ease-in-out infinite alternate;
  }
  .tron-eq-bar:nth-child(1) { height: 40%; animation-delay: 0.05s; }
  .tron-eq-bar:nth-child(2) { height: 90%; animation-delay: 0.15s; }
  .tron-eq-bar:nth-child(3) { height: 60%; animation-delay: 0.25s; }
  .tron-eq-bar:nth-child(4) { height: 100%; animation-delay: 0.1s; }
  .tron-eq-bar:nth-child(5) { height: 45%; animation-delay: 0.2s; }
  @keyframes eqPulse {
    0% { transform: scaleY(0.2); opacity: 0.3; }
    100% { transform: scaleY(1); opacity: 1; }
  }

  .nav-right { display: flex; align-items: center; gap: 36px; }
  .nav-links { display: flex; gap: 24px; list-style: none; position: relative; }
  .nav-links a { 
    font-family: var(--font-display);
    color: var(--text-mid); 
    text-decoration: none; 
    font-size: 11px; 
    letter-spacing: 2.5px; 
    text-transform: uppercase; 
    font-weight: 600; 
    transition: color 0.3s; 
    padding: 6px 0; 
    position: relative;
    display: inline-block; 
  }
  
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-amber));
    transition: width 0.3s var(--ease), left 0.3s var(--ease);
  }
  .nav-links a:hover, .nav-links a.active { color: var(--accent-cyan); text-shadow: 0 0 14px rgba(0, 242, 255, 0.9); }
  .nav-links a:hover::after, .nav-links a.active::after { width: 100%; left: 0%; }

  .nav-booking-btn {
    background: rgba(0, 242, 255, 0.1);
    border: 1px solid var(--accent-cyan);
    color: var(--accent-cyan);
    font-family: var(--font-display);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 10px 22px;
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    text-decoration: none;
    box-shadow: 0 0 25px rgba(0, 242, 255, 0.35);
    transition: all 0.3s var(--ease);
    white-space: nowrap;
    display: inline-block;
    touch-action: manipulation;
  }
  .nav-booking-btn:hover {
    background: var(--accent-cyan);
    color: #010204;
    box-shadow: 0 0 45px rgba(0, 242, 255, 0.95);
    transform: translateY(-1px);
  }

  .lang-switch { display: flex; gap: 6px; align-items: center; font-size: 11px; font-family: var(--font-display); letter-spacing: 1px; flex-shrink: 0; }
  .lang-switch button { background: none; border: none; color: var(--text-dim); cursor: pointer; font-size: 11px; font-weight: 600; transition: color 0.3s; padding: 4px; }
  .lang-switch button.active { color: var(--accent-cyan); font-weight: 800; text-shadow: 0 0 10px rgba(0, 242, 255, 0.7); }
  .mobile-lang-switch { display: none; margin-top: 20px; font-size: 18px; gap: 12px; }
  .mobile-lang-switch button { font-size: 18px; padding: 8px; }

  .menu-btn { display: none; background: none; border: 1px solid var(--border); width: 42px; height: 42px; align-items: center; justify-content: center; color: var(--text); cursor: pointer; z-index: 101; clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px); background: rgba(4, 7, 16, 0.9); transition: border-color 0.3s; flex-shrink: 0; touch-action: manipulation; }
  .menu-btn:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }
  .menu-icon-lines { display: flex; flex-direction: column; gap: 5px; width: 18px; }
  .menu-icon-lines span { display: block; width: 100%; height: 2px; background: currentColor; transition: all 0.3s; }
  .menu-btn.open .menu-icon-lines span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .menu-btn.open .menu-icon-lines span:nth-child(2) { opacity: 0; }
  .menu-btn.open .menu-icon-lines span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-nav { display: none; position: fixed; inset: 0; background: rgba(1, 2, 4, 0.98); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); z-index: 99; flex-direction: column; justify-content: center; align-items: center; gap: 20px; padding: 40px; overflow-y: auto; }
  .mobile-nav.open { display: flex; }
  .mobile-nav a { color: var(--text); text-decoration: none; font-family: var(--font-display); font-size: 20px; font-weight: 700; text-transform: uppercase; transition: color 0.3s; }
  .mobile-nav a:hover { color: var(--accent-cyan); }

  /* HERO */
  .hero { height: 100vh; min-height: 560px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden; padding: var(--header-h) 20px 0; }
  .hero-bg { 
    position: absolute; 
    top: var(--header-h);
    left: 0;
    right: 0;
    bottom: -120px;
    filter: brightness(0.35) contrast(1.35) hue-rotate(-10deg) saturate(1.2); 
    will-change: transform; 
    background-position: center 10% !important;
    object-position: center 10% !important;
  }
  .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%; max-width: 1000px; }
  
  .hero-name { 
    font-family: var(--font-display); 
    font-size: clamp(32px, 7vw, 84px); 
    font-weight: 900; 
    letter-spacing: 6px; 
    line-height: 1.1; 
    text-transform: uppercase; 
    margin-bottom: 24px; 
    background: linear-gradient(180deg, #ffffff 0%, var(--text-mid) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 40px rgba(0, 242, 255, 0.45));
    white-space: nowrap;
  }
  .fade-logo { white-space: nowrap; }

  .hero-socials { 
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 12px; 
    margin-top: 16px; 
    max-width: 100%;
  }
  .social-row-break { display: none; }
  .hero-socials a { 
    color: var(--text-mid); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 44px; 
    height: 44px; 
    border: 1px solid var(--border); 
    clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
    transition: transform 0.2s var(--ease), border-color 0.3s, background 0.3s, color 0.3s; 
    text-decoration: none; 
    background: rgba(4, 7, 16, 0.8); 
    will-change: transform;
    touch-action: manipulation;
  }
  .hero-socials a:hover { color: var(--accent-cyan); border-color: var(--accent-cyan); background: rgba(0, 242, 255, 0.15); box-shadow: 0 0 30px rgba(0, 242, 255, 0.5); }
  .scroll-hint { position: absolute; bottom: 30px; color: var(--text-dim); cursor: pointer; transition: color 0.3s, transform 0.3s; z-index: 2; padding: 10px; }
  .scroll-hint:hover { color: var(--accent-cyan); transform: translateY(3px); }

  /* SECTIONS & CONTAINER */
  .section { padding: 120px 60px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }
  .section-label { font-family: var(--font-display); font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: var(--accent-cyan); margin-bottom: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .section-label::before { content: '['; color: var(--accent-amber); }
  .section-label::after { content: ']'; color: var(--accent-amber); }
  .section-title { font-family: var(--font-display); font-size: clamp(28px, 5vw, 64px); font-weight: 800; letter-spacing: -0.01em; line-height: 1.1; margin-bottom: 50px; text-transform: uppercase; word-break: break-word; }

  /* ABOUT LAYOUT */
  .about-layout { display: grid; grid-template-columns: 400px 1fr; gap: 60px; align-items: start; }
  
  .about-photo { 
    position: relative !important;
    width: 100%; 
    aspect-ratio: 4/5; 
    background: var(--bg-card); 
    border: var(--glass-border); 
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.95), 0 0 25px rgba(0, 242, 255, 0.2); 
  }
  
  .about-photo img { 
    position: relative !important; 
    top: auto !important; 
    left: auto !important;
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    object-position: center 25%;
    transform: none;
    transition: transform 0.6s var(--ease); 
    will-change: transform; 
    filter: contrast(1.2) brightness(0.92) saturate(1.1); 
  }
  .about-photo:hover img { transform: scale(1.04); }

  .about-text p { color: var(--text-mid); font-size: 15px; line-height: 1.8; margin-bottom: 24px; font-weight: 300; }
  .about-text p:first-child { color: var(--text); font-size: 18px; font-weight: 400; line-height: 1.6; }
  
  .highlights { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
  .h-card { 
    background: var(--glass-bg); 
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: var(--glass-border); 
    padding: 20px; 
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    transition: border-color 0.3s, box-shadow 0.3s; 
  }
  .h-card:hover { border-color: var(--accent-cyan); box-shadow: 0 0 35px rgba(0, 242, 255, 0.35); }
  .h-card-label { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 1px; }
  .h-card-detail { font-size: 13px; color: var(--accent-cyan); margin-top: 6px; word-break: break-all; }

  .residencies { margin-top: 40px; }
  .res-title { font-family: var(--font-display); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent-cyan); margin-bottom: 14px; font-weight: 700; }
  .res-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .res-tag { font-size: 12px; color: var(--text-mid); padding: 6px 14px; border: 1px solid var(--border); clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px); background: rgba(0, 242, 255, 0.04); transition: all 0.3s; }
  .res-tag:hover { color: var(--accent-cyan); border-color: var(--accent-cyan); background: rgba(0, 242, 255, 0.15); }

  /* MUSIC SLIDER */
  .music-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 120px 0; position: relative; z-index: 1; width: 100%; }
  .music-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; width: 100%; }
  
  .music-slider { 
    display: flex; 
    gap: 20px; 
    overflow-x: auto; 
    scroll-snap-type: x mandatory; 
    padding: 10px 10px 30px 10px; 
    margin-bottom: 40px;
    perspective: 1000px;
    -webkit-overflow-scrolling: touch;
  }
  
  .m-card { 
    flex: 0 0 320px; 
    scroll-snap-align: start; 
    background: var(--glass-bg); 
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: var(--glass-border); 
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
    padding: 24px; 
    text-decoration: none; 
    color: inherit; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    transition: transform 0.2s var(--ease), border-color 0.4s, box-shadow 0.4s; 
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    will-change: transform;
    cursor: pointer;
  }
  
  .m-card::before, .unified-consent-box::before, .video-frame::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 242, 255, 0.12), transparent 80%);
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
  .m-card[data-brand="mixcloud"] { --brand-color: #6200ff; }
  .m-card[data-brand="amazonmusic"] { --brand-color: #00a8e1; }

  .m-card .m-badge { color: var(--brand-color, var(--text-mid)); }
  .m-card .brand-icon { color: var(--brand-color, var(--text)); transition: transform 0.4s var(--ease); }
  
  .m-card:hover { 
    border-color: var(--brand-color, var(--border-hover)); 
    box-shadow: 0 12px 40px -10px rgba(0,0,0,0.95), 0 0 35px -5px var(--brand-color);
  }
  .m-card:hover .brand-icon { transform: scale(1.15) rotate(-3deg); }
  
  .m-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; position: relative; z-index: 2; }
  .m-badge { font-family: var(--font-display); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
  .m-card-name { font-family: var(--font-display); font-size: 18px; font-weight: 800; margin-bottom: 8px; text-transform: uppercase; color: #fff; }
  .m-card-desc { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 24px; font-weight: 300; }
  .m-card-link { font-family: var(--font-display); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; font-weight: 700; color: #fff; position: relative; z-index: 2; }

  /* CONSENT OVERLAYS */
  .unified-consent-box {
    position: relative;
    width: 100%;
    border: var(--glass-border);
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
    overflow: hidden;
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: transform 0.2s var(--ease), border-color 0.4s;
    transform-style: preserve-3d;
    will-change: transform;
  }
  .unified-consent-box:hover { border-color: var(--accent-cyan); box-shadow: 0 0 40px rgba(0, 242, 255, 0.35); }

  .sc-height { height: 180px; }
  .vd-height { height: 260px; }

  .consent-bg-wave {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0.22;
    pointer-events: none;
  }
  .consent-bg-wave span {
    width: 6px;
    height: 40%;
    background: var(--accent-cyan);
    border-radius: 2px;
    animation: wavePulse 0.48s infinite ease-in-out alternate;
  }
  .consent-bg-wave span:nth-child(2n) { animation-delay: 0.1s; }
  .consent-bg-wave span:nth-child(3n) { animation-delay: 0.2s; }
  .consent-bg-wave span:nth-child(4n) { animation-delay: 0.3s; }

  @keyframes wavePulse {
    0% { height: 20%; opacity: 0.2; }
    100% { height: 85%; opacity: 0.95; }
  }

  .consent-overlay-content {
    position: absolute;
    inset: 0;
    background: rgba(2, 4, 10, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
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
    color: var(--accent-cyan);
    text-transform: uppercase;
    margin-bottom: 14px;
    filter: drop-shadow(0 0 15px rgba(0, 242, 255, 0.7));
  }

  .media-play-btn {
    width: 56px;
    height: 56px;
    background: var(--accent-cyan);
    border: none;
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    color: #010204;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s var(--ease), box-shadow 0.3s, background 0.3s;
    box-shadow: 0 0 30px rgba(0, 242, 255, 0.7);
    will-change: transform;
    touch-action: manipulation;
  }
  .media-play-btn:hover {
    background: #fff;
    box-shadow: 0 0 45px rgba(0, 242, 255, 0.95);
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
    border: var(--glass-border); 
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    overflow: hidden; 
    background: #000; 
    animation: gridPop 0.6s var(--ease) forwards;
  }
  @keyframes gridPop {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .video-frame iframe { width: 100%; height: 100%; border: none; position: relative; z-index: 2; }
  .video-more { font-family: var(--font-display); margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-mid); text-decoration: none; transition: color 0.3s; }
  .video-more:hover { color: var(--accent-cyan); }

  /* NEWS */
  .news-grid { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 20px; -webkit-overflow-scrolling: touch; }
  .n-card { 
    flex: 0 0 360px; 
    scroll-snap-align: start; 
    background: var(--glass-bg); 
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: var(--glass-border); 
    clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
    overflow: hidden; 
    text-decoration: none; 
    color: inherit; 
    transition: all 0.4s var(--ease); 
    display: flex; 
    flex-direction: column; 
  }
  .n-card:hover { border-color: var(--accent-cyan); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 242, 255, 0.3); }
  .n-img-wrap { width: 100%; aspect-ratio: 16/9; background: var(--bg-elevated); border-bottom: 1px solid var(--border); overflow: hidden; }
  .n-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s var(--ease); }
  .n-card:hover .n-img { transform: scale(1.05); }
  .n-content { padding: 24px; display: flex; flex-direction: column; flex: 1; }
  .n-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--accent-cyan); margin-bottom: 12px; font-weight: 500; font-family: var(--font-display); }
  .n-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; color: #fff; }
  .n-excerpt { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 20px; flex: 1; font-weight: 300; }
  .n-link { font-family: var(--font-display); font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; display: flex; align-items: center; gap: 6px; }

  /* DATES */
  .dates-empty { text-align: center; padding: 80px 24px; border: 1px dashed var(--border); clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px); background: rgba(0, 242, 255, 0.02); }
  .dates-empty-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text-mid); margin-bottom: 8px; word-break: break-word; }
  .dates-empty-sub { font-size: 13px; color: var(--text-dim); }

  /* BOOKING */
  .booking-wrap { background: var(--bg-elevated); border-top: 1px solid var(--border); padding: 120px 0; position: relative; z-index: 1; width: 100%; }
  .booking-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; width: 100%; }
  .booking-content-box { 
    background: var(--glass-bg); 
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: var(--glass-border); 
    padding: 50px; 
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.85);
    max-width: 900px;
  }

  /* CONTACT */
  .contact-wrap { background: var(--bg-obsidian); border-top: 1px solid var(--border); padding: 120px 0; position: relative; z-index: 1; width: 100%; }
  .contact-inner { max-width: 1400px; margin: 0 auto; padding: 0 60px; width: 100%; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
  .contact-email { display: flex; align-items: center; gap: 12px; color: var(--text); text-decoration: none; font-size: 16px; padding: 24px 0; border-bottom: 1px solid var(--border); transition: border-color 0.3s, color 0.3s; word-break: break-all; }
  .contact-email:hover { border-color: var(--accent-cyan); color: var(--accent-cyan); }
  .contact-social { font-family: var(--font-display); display: flex; align-items: center; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text-mid); font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; transition: color 0.3s; }
  .contact-social:hover { color: var(--accent-cyan); }

  .footer { padding: 40px 60px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-dim); border-top: 1px solid var(--border); position: relative; z-index: 1; width: 100%; }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { background: none; border: none; color: var(--text-dim); font-size: 11px; cursor: pointer; transition: color 0.3s; }
  .footer-link:hover { color: var(--accent-cyan); }

  /* MODALS */
  .legal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(1, 2, 4, 0.96); backdrop-filter: blur(20px); display: flex; justify-content: center; align-items: flex-start; padding: 80px 24px; overflow-y: auto; }
  .legal-box { background: var(--bg-card); border: var(--glass-border); clip-path: polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px)); max-width: 760px; width: 100%; padding: 48px; position: relative; box-shadow: 0 0 70px rgba(0, 242, 255, 0.25); }
  .legal-close { position: absolute; top: 24px; right: 24px; background: none; border: none; color: var(--text-mid); font-size: 24px; cursor: pointer; transition: color 0.3s; padding: 8px; touch-action: manipulation; }
  .legal-close:hover { color: var(--accent-cyan); }
  .legal-title { font-family: var(--font-display); font-size: 26px; font-weight: 800; margin-bottom: 8px; color: #fff; }
  .legal-subtitle { font-family: var(--font-display); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-cyan); margin-bottom: 32px; font-weight: 700; }
  .legal-section { margin-bottom: 24px; }
  .legal-section h3 { font-size: 16px; margin-bottom: 12px; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 6px; }
  .legal-section p { font-size: 13px; color: var(--text-mid); line-height: 1.7; margin-bottom: 12px; }
  .legal-section ul { font-size: 13px; color: var(--text-mid); line-height: 1.7; margin-bottom: 12px; padding-left: 20px; }
  .legal-section li { margin-bottom: 6px; }
  .legal-section a { color: var(--accent-cyan); text-decoration: underline; }

  /* REVEAL ANIMATION */
  .rv { 
    opacity: 0; 
    filter: blur(12px);
    transform: translateY(24px) scale(0.98); 
    transition: opacity 1.2s var(--ease), 
                filter 1.2s var(--ease), 
                transform 1.2s var(--ease); 
    will-change: opacity, filter, transform;
  }
  .rv.vis { 
    opacity: 1; 
    filter: blur(0px);
    transform: translateY(0) scale(1); 
  }

  /* RESPONSIVE OPTIMIZATIONS */
  @media (max-width: 1024px) {
    .section, .music-inner, .booking-inner, .contact-inner { padding: 80px 24px; }
    .nav { padding: 16px 20px; }
    .nav.scrolled { padding: 14px 20px; }
    .nav-links { display: none; }
    .nav-right { gap: 14px; }
    .menu-btn { display: flex; }
    .about-layout { grid-template-columns: 1fr; gap: 40px; }
    .about-photo { max-width: 360px; margin: 0 auto; }
    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
    .video-grid { grid-template-columns: repeat(2, 1fr); }
    .footer { flex-direction: column; gap: 20px; text-align: center; padding: 40px 24px; }
  }

  @media (max-width: 640px) {
    .nav { padding: 12px 16px; }
    .nav-logo { font-size: 12px; letter-spacing: 2px; gap: 8px; }
    .tron-eq { display: none; }
    .hero-name { font-size: clamp(24px, 8vw, 32px); letter-spacing: 2px; }
    .nav-right .lang-switch:not(.mobile-lang-switch) { display: none; }
    .mobile-lang-switch { display: flex; }
    .hero-socials { gap: 12px 14px; }
    .social-row-break { display: block; flex-basis: 100%; width: 100%; height: 0; margin: 0; }
    .hero-socials a { width: 44px; height: 44px; }
    .nav-booking-btn { font-size: 9px; padding: 8px 12px; }
    .highlights { grid-template-columns: 1fr; }
    .video-grid { grid-template-columns: 1fr; }
    .m-card { flex: 0 0 270px; padding: 20px; }
    .n-card { flex: 0 0 280px; }
    .booking-content-box { padding: 24px 18px; }
    .legal-box { padding: 24px 16px; }
    .legal-overlay { padding: 40px 12px; }
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
    window.history.pushState({ overlayOpen: true }, "");
  };

  const closeModal = () => {
    setLegalModal(null);
  };

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      window.history.pushState({ overlayOpen: true }, "");
    } else {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setLegalModal(null);
      setMenuOpen(false);
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
  }, []);

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
        heroBg.style.transform = `translateY(${-scrollY * 0.15}px)`;
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
      
      {/* 3D TRON & WAREHOUSE PERSPECTIVE GRID */}
      <div className="tron-grid">
        <div className="tron-grid-plane" />
      </div>
      <div className="tron-horizon" />

      <div className="laser-stream-h" />
      <div className="laser-stream-v" />
      <div ref={orbRef} className="bg-glow-orb" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <ElegantFadeText text={ARTIST_NAME} />
          <div className="tron-eq">
            <div className="tron-eq-bar" />
            <div className="tron-eq-bar" />
            <div className="tron-eq-bar" />
            <div className="tron-eq-bar" />
            <div className="tron-eq-bar" />
          </div>
        </span>
        
        <div className="nav-right">
          <ul className="nav-links">
            {t.nav.map(item => (
              <li key={item.id}><a href={`#${item.id}`} onClick={e => { e.preventDefault(); go(item.id); }}>{item.label}</a></li>
            ))}
          </ul>
          
          <MagneticButton>
            <a href="#booking" onClick={e => { e.preventDefault(); go("booking"); }} className="nav-booking-btn breathing-glow">
              {t.bookingBtn}
            </a>
          </MagneticButton>

          <div className="lang-switch">
            <button onClick={() => setLang('de')} className={lang === 'de' ? 'active' : ''}>DE</button>
            <span>/</span>
            <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
          </div>

          <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Menu">
            <div className="menu-icon-lines">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>
      
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {t.nav.map(item => (
          <a key={item.id} href={`#${item.id}`} onClick={e => { e.preventDefault(); go(item.id); }}>{item.label}</a>
        ))}
        <a href="#booking" onClick={e => { e.preventDefault(); go("booking"); }} style={{ color: '#010204', background: 'var(--accent-cyan)', padding: '12px 32px', fontSize: '16px', whiteSpace: 'nowrap', clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)', marginTop: '10px' }}>{t.bookingBtn}</a>
        <div className="lang-switch mobile-lang-switch">
          <button onClick={() => setLang('de')} className={lang === 'de' ? 'active' : ''}>DE</button>
          <span>/</span>
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" style={{ background: `url('${BASE_URL}images/hero.jpg') center 10% / cover no-repeat` }} />
        <div className="hero-content">
          <h1 className="hero-name">
            <ElegantFadeText text={ARTIST_NAME} />
          </h1>

          <div className="hero-socials">
            {SOCIAL_LINKS.map((s, i) => {
              const Icon = Icons[s.icon] || Icons.Arrow;
              return (
                <React.Fragment key={s.name}>
                  <MagneticButton>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" title={s.name}>
                      <Icon size={18} />
                    </a>
                  </MagneticButton>
                  {i === 2 && <span className="social-row-break" aria-hidden="true" />}
                </React.Fragment>
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
                  <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/maxhefele&color=%2300f2ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false" style={{ border: 0, display: 'block' }} title="SoundCloud Player" />
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
            {NEWS_ITEMS.map((item, index) => {
              const newsText = t.newsItems[index] || t.newsItems[0];
              return (
                <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="n-card">
                  <div className="n-img-wrap">
                    <img src={`${BASE_URL}${item.image}`} alt={newsText.title} className="n-img" loading="lazy" />
                  </div>
                  <div className="n-content">
                    <div className="n-meta">
                      <span>{item.date}</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="n-title">{newsText.title}</h3>
                    <p className="n-excerpt">{newsText.excerpt}</p>
                    <div className="n-link">{t.readMore} <Icons.Arrow /></div>
                  </div>
                </a>
              );
            })}
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

      {/* BOOKING */}
      <section className="booking-wrap" id="booking">
        <div className="booking-inner">
          <Rv>
            <p className="section-label">{t.bookingLabel}</p>
            <h2 className="section-title">{t.bookingTitle}</h2>
          </Rv>
          <Rv delay={100}>
            <div className="booking-content-box">
              <p style={{ color: 'var(--text-mid)', fontSize: '15px', lineHeight: '1.8', marginBottom: '30px' }}>
                {t.bookingText}
              </p>
              
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '2px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                  {t.bookingDirectTitle}
                </h4>
                <a href="mailto:info@maxhefele.de" className="contact-email" style={{ padding: '8px 0', fontSize: '15px' }}>
                  <Icons.Mail /> info@maxhefele.de
                </a>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '12px', letterSpacing: '2px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                  {t.bookingPressTitle}
                </h4>
                <p style={{ color: 'var(--text-mid)', fontSize: '13px', lineHeight: '1.6' }}>
                  {t.bookingPressDesc}
                </p>
              </div>
            </div>
          </Rv>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-wrap" id="contact">
        <div className="contact-inner">
          <Rv>
            <p className="section-label">{t.contactLabel}</p>
            <h2 className="section-title">{t.contactTitle}</h2>
          </Rv>
          <div className="contact-grid">
            <Rv delay={100}>
              <p style={{ color: 'var(--text-mid)', fontSize: '15px', lineHeight: '1.8', marginBottom: '24px' }}>
                {t.contactText}
              </p>
              <a href="mailto:info@maxhefele.de" className="contact-email">
                <Icons.Mail /> info@maxhefele.de
              </a>
            </Rv>
            <Rv delay={150}>
              <div>
                {SOCIAL_LINKS.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social">
                    <span>{s.name}</span>
                    <Icons.Arrow />
                  </a>
                ))}
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} {ARTIST_NAME}. {t.footerRights}.</div>
        <div className="footer-links">
          <button className="footer-link" onClick={() => openModal("impressum")}>{t.imprintBtn}</button>
          <button className="footer-link" onClick={() => openModal("datenschutz")}>{t.privacyBtn}</button>
          <button className="footer-link" onClick={resetConsent}>{t.revokeBtn}</button>
        </div>
      </footer>

      {/* LEGAL MODAL */}
      {legalModal && (
        <div className="legal-overlay" onClick={closeModal}>
          <div className="legal-box" onClick={e => e.stopPropagation()}>
            <button className="legal-close" onClick={closeModal}>✕</button>
            
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
                  <p>Wir hosten diese Website über den Dienst GitHub Pages der GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA (nachfolgend „GitHub“). Wenn Sie unsere Seiten besuchen, erfasst GitHub Protokolldaten (z. B. Ihre IP-Adresse, Browsertyp, Betriebssystem). Dies ist technisch erforderlich, um die Website stabil und sicher anzuzeigen. Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO. GitHub is unter dem EU-US Data Privacy Framework zertifiziert. Weitere Informationen finden Sie in der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement</a>.</p>

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