import React, { useState, useEffect } from "react";
import portraitImg from "./assets/portrait.jpg";

// --- DATA FROM ORIGINAL HOMEPAGE ---
const BIO = [
  "Max Hefele steht für 20 Jahre Clubkultur.",
  "Als Resident kam er aus dem Hip-Hop und lernte früh, zwei Plattenspieler sind mehr als nur Technik. Mit Instinkt, Präzision und perfektem Timing formte er ganze Nächte. Er weiß, wie man Crowds bewegt und die Energie eines Raumes lenkt.",
  "Genau diese Erfahrung prägt heute seine Melodic Techno Sets. Max Hefele spielt keine Setlisten von der Stange. Er liest den Raum, baut Spannung auf, hält sie aus und weiß exakt, wann ein Track sitzen muss.",
  "Nach zwei Jahrzehnten hinter den Decks ist sein Name Programm: der Weg vom Hip-Hop zur elektronischen Musik, ohne die Wurzeln zu kappen, und der Fokus auf das Wesentliche.",
  "Sein Sound basiert nicht auf Effekten, sondern auf Spannung, Tiefe und dem richtigen Moment. Diese Selbstsicherheit ist auch im Studio zu hören. Mit seiner Debüt-EP „CALL ME“ auf MYR Records hat er ein echtes Statement gesetzt. Die Veröffentlichung wurde unter anderem von Paul van Dyk in seiner Radiosendung „Vonyc Sessions“ (Folge 1026) gefeiert und kletterte direkt auf Platz 39 der Beatport Top 100 Melodic Techno Releases, wo sie sich sechs Tage lang in den Charts hielt.",
  "Parallel dazu erscheint alle zwei Wochen seine musikalische Vision in der YouTube-Reihe Rave in the City. Eine Stunde, die zeigt, worum es geht. Qualität statt Quantität. Erfahrung statt Zufall. Keine Show. Nur Musik.",
  "Max Hefele bringt etwas mit, das selten geworden ist: echte Club-Erfahrung und die Fähigkeit, komplette Nächte zu gestalten, ohne den roten Faden zu verlieren."
];

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/max.hefele.music/", handle: "@max.hefele.music" },
  { name: "SoundCloud", url: "https://soundcloud.com/maxhefele", handle: "maxhefele" },
  { name: "YouTube", url: "https://www.youtube.com/@MaxHefele", handle: "@MaxHefele" },
  { name: "Mixcloud", url: "https://www.mixcloud.com/MaxHefele/", handle: "MaxHefele" },
  { name: "Spotify", url: "https://open.spotify.com/intl-de/artist/6VT5NRA3Ems6HjcEbQDqpK?si=xc03f2ssRXS-09RH6SimcQ", handle: "Max Hefele" },
  { name: "Apple Music", url: "https://music.apple.com/de/artist/max-hefele/6779171915", handle: "Max Hefele" },
  { name: "Amazon Music", url: "https://www.amazon.de/music/player/artists/B0H4VRN9WD/max-hefele", handle: "Max Hefele" },
  { name: "Beatport", url: "https://www.beatport.com/artist/max-hefele/2396410", handle: "max-hefele" },
];

const MUSIC_PLATFORMS = [
  { id: "sc", name: "SoundCloud", desc: "Mixes, eigene Tracks und die Rave in the City Reihe. Debüt-EP CALL ME out now auf MYR Records.", url: "https://soundcloud.com/maxhefele", cta: "Anhören", color: "#ff5500" },
  { id: "yt", name: "YouTube — Rave in the City", desc: "Rave in the City — kuratierte Ein-Stunden-Sets, alle zwei Wochen neu. Freitags 19:00 Uhr.", url: "https://www.youtube.com/@MaxHefele", cta: "Ansehen", color: "#FF0000" },
  { id: "mc", name: "Mixcloud", desc: "Komplette DJ-Sets und Live-Mitschnitte — die volle musikalische Reise.", url: "https://www.mixcloud.com/MaxHefele/", cta: "Anhören", color: "#52aad8" },
  { id: "bp", name: "Beatport", desc: "Tracks, Releases und DJ-Musik von Max Hefele auf Beatport.", url: "https://www.beatport.com/artist/max-hefele/2396410", cta: "Kaufen", color: "#01FF95" },
  { id: "sp", name: "Spotify", desc: "Meine neuesten Tracks, Releases und Playlists auf Spotify.", url: "https://open.spotify.com/intl-de/artist/6VT5NRA3Ems6HjcEbQDqpK", cta: "Anhören", color: "#1DB954" },
  { id: "am", name: "Apple Music", desc: "Meine Musik in bester Qualität auf Apple Music.", url: "https://music.apple.com/de/artist/max-hefele/6779171915", cta: "Anhören", color: "#FA243C" },
  { id: "az", name: "Amazon Music", desc: "Meine Releases und Tracks jetzt auch auf Amazon Music.", url: "https://www.amazon.de/music/player/artists/B0H4VRN9WD/max-hefele", cta: "Anhören", color: "#00A8E1" },
];

const NEWS = [
  { id: 1, date: "09.07.2026", cat: "MYR RECORDS", title: "Max Hefele präsentiert Call Me [MYR]", excerpt: "Meine Vision für die EP auf MYR Records. Ein Statement nach 20 Jahren Clubkultur.", link: "https://www.chromatic-club.com/post/max-hefele-presents-call-me-myr" },
  { id: 2, date: "05.07.2026", cat: "VONYC 1026", title: "Paul van Dyk Support Vonyc Session 1026", excerpt: "Paul van Dyk supportet meinen Track 'Better Day of Life' aus meiner EP Call Me in Vonyc Sessions.", link: "https://www.youtube.com/watch?v=AIGRuvQBEvs" },
  { id: 3, date: "09.07.2026", cat: "INTERVIEW", title: "Interview mit The Last Future", excerpt: "Hier ein kleiner Einblick in meine neue EP und den Weg von Hip-Hop zu Melodic Techno.", link: "https://thelastfuture.wixsite.com/thelastfuture/post/max-hefele-presents-call-me-myr" },
  { id: 4, date: "10.07.2026", cat: "RAVE IN THE CITY", title: "Rave in the City Vol. 52 | Sunset Session", excerpt: "Die Rave in the City Mix Show erscheint alle zwei Wochen Freitags um 19:00 Uhr auf YouTube und SoundCloud.", link: "https://youtu.be/xGbPAuIDj6o" },
  { id: 5, date: "26.07.2026", cat: "MELODIC DANCERS", title: "Mein Exklusiv-Interview für Melodic Dancers", excerpt: "Hier ist mein Exklusiv-Interview für das Melodic Dancers Magazin, das Interview findet ihr auf Seite 9.", link: "https://www.melodicdancers.com/in-conversation-with-max-hefele" },
];

const GOOGLE_DRIVE = {
  pressKit: "https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0?usp=sharing",
  videos: "https://drive.google.com/drive/folders/159vuE6gldbiJihBx7CigxbYG2p4ZdWj0",
  firstVideoId: "1x1dK3ECiPqBgl3x9C4AkhDJRsvmdKetg"
};

export default function App() {
  const [active, setActive] = useState("music");
  const [legal, setLegal] = useState(null);
  const [scanning, setScanning] = useState(0);
  const [imgSrc, setImgSrc] = useState(portraitImg);

  useEffect(() => {
    const onScroll = () => {
      const sections = ["about", "music", "news", "dates", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.4 && rect.bottom > 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf;
    let start = performance.now();
    const loop = (t) => {
      const progress = ((t - start) / 4000) % 1;
      setScanning(progress);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#05050A] text-[#EAFBFF] selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');
        :root{ --cyan:#00E5FF; --cyan-dim:rgba(0,229,255,0.15); --bg:#05050A; }
        html{ scroll-behavior:smooth; }
        body{ background:#05050A; }
        .font-display{ font-family:'Syne', sans-serif; }
        .font-mono{ font-family:'JetBrains Mono', monospace; }
        .font-body{ font-family:'Inter', sans-serif; }

        .blueprint-grid{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          background-position: -1px -1px;
        }
        .blueprint-vignette{
          position:fixed; inset:0; z-index:1; pointer-events:none;
          background: radial-gradient(120% 120% at 50% 0%, transparent 40%, rgba(5,5,10,0.9) 85%),
                      linear-gradient(180deg, rgba(5,5,10,0) 0%, rgba(5,5,10,0.8) 100%);
        }

        .light-line{
          position:absolute; background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          height:1px; box-shadow:0 0 12px var(--cyan), 0 0 24px rgba(0,229,255,0.5);
          opacity:0.8;
        }

        .scanline{
          position:absolute; left:0; right:0; height:2px; z-index:10;
          background: linear-gradient(90deg, transparent, #00E5FF 20%, #ffffff 50%, #00E5FF 80%, transparent);
          box-shadow:0 0 20px #00E5FF, 0 0 40px #00E5FF;
          mix-blend-mode: screen;
        }

        .grid-floor{
          position:absolute; bottom:0; left:50%; width:120%; height:60%;
          transform: translateX(-50%) perspective(400px) rotateX(60deg);
          background-image:
            linear-gradient(rgba(0,229,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.15) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: linear-gradient(180deg, transparent 0%, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 40%, transparent 100%);
          opacity:0.35;
          pointer-events:none;
        }

        .disc-ring{
          position:absolute; border-radius:50%; border:1px solid rgba(0,229,255,0.25);
          box-shadow: inset 0 0 30px rgba(0,229,255,0.08), 0 0 30px rgba(0,229,255,0.08);
        }
        .disc-ring::after{
          content:''; position:absolute; inset:-1px; border-radius:50%;
          border:1px solid rgba(0,229,255,0.4); filter:blur(0.5px);
        }

        @keyframes pulseLED{ 0%,100%{opacity:1; box-shadow:0 0 6px currentColor} 50%{opacity:0.4; box-shadow:0 0 2px currentColor} }
        @keyframes ticker{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes floatSlow{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      `}</style>

      {/* Background Layers */}
      <div className="blueprint-grid" />
      <div className="blueprint-vignette" />

      {/* Top System Bar */}
      <div className="fixed top-0 inset-x-0 z-[100] h-[36px] bg-black/90 backdrop-blur-xl border-b border-[#00E5FF]/20 flex items-center justify-between px-4 md:px-8 font-mono text-[10px] tracking-[0.2em] uppercase">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-[#00E5FF] animate-[pulseLED_1.2s_ease_infinite]" />
            <span className="text-[#00E5FF]">SYSTEM ONLINE</span>
            <span className="hidden md:inline text-white/30 ml-2">GRID PROTOCOL v13.0</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-white/20">
            <span>GRID:</span><span className="text-[#00E5FF]/60">ONLINE // SECURE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/40 hidden md:inline">ENCRYPTED LINK • </span>
          <span className="text-[#00E5FF]">MAX_HEFELE // 20YRS</span>
          <div className="flex gap-[3px] ml-2">
            {[1,2,3].map(i=><div key={i} className="w-[3px] h-[12px] bg-[#00E5FF]" style={{opacity:0.3+i*0.2}} />)}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-[36px] inset-x-0 z-[99] h-[56px] md:h-[64px] bg-[#05050A]/80 backdrop-blur-2xl border-b border-[#00E5FF]/10 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <button onClick={()=>window.scrollTo({top:0, behavior:"smooth"})} className="font-display font-[800] text-[18px] md:text-[20px] tracking-[0.18em] text-white hover:text-[#00E5FF] transition-colors">
            MAX<span className="text-[#00E5FF]">_</span>HEFELE
          </button>
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full p-1">
            {[
              {id:"music", label:"MUSIK"},
              {id:"about", label:"ABOUT"},
              {id:"news", label:"NEWS"},
              {id:"dates", label:"DATES"},
              {id:"contact", label:"CONTACT"},
            ].map(item=>(
              <button key={item.id} onClick={()=>scrollTo(item.id)}
                className={`px-4 py-[6px] rounded-full font-mono text-[11px] tracking-[0.15em] transition-all ${active===item.id ? "bg-[#00E5FF] text-black font-[700]" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-white/30 border border-[#00E5FF]/15 rounded-full px-3 py-1.5 bg-[#00E5FF]/[0.03]">
            <div className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-[pulseLED_1s_ease_infinite]" />
            IDENTITY VERIFIED
          </div>
          <a href="mailto:info@maxhefele.de" className="h-[36px] px-4 md:px-5 rounded-full bg-[#00E5FF] text-black font-display font-[700] text-[11px] tracking-[0.12em] flex items-center hover:bg-white transition-colors">
            BOOK NOW
          </a>
        </div>
      </nav>

      {/* Mobile Nav Pills */}
      <div className="md:hidden fixed top-[100px] inset-x-0 z-[98] px-3 flex gap-1.5 overflow-x-auto scrollbar-none">
        {[
          {id:"music", label:"MUSIK"},
          {id:"about", label:"ABOUT"},
          {id:"news", label:"NEWS"},
          {id:"dates", label:"DATES"},
          {id:"contact", label:"CONTACT"},
        ].map(item=>(
          <button key={item.id} onClick={()=>scrollTo(item.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full border font-mono text-[10px] tracking-[0.12em] ${active===item.id ? "bg-[#00E5FF] text-black border-[#00E5FF]" : "bg-black/60 border-white/10 text-white/60 backdrop-blur"}`}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Ticker */}
      <div className="fixed top-[92px] md:top-[100px] inset-x-0 z-[90] h-[28px] bg-[#00E5FF] text-black overflow-hidden flex items-center font-display font-[800] text-[11px] tracking-[0.25em]">
        <div className="whitespace-nowrap flex animate-[ticker_25s_linear_infinite]">
          {Array.from({length:8}).map((_,i)=>(
            <span key={i} className="flex items-center gap-8 pr-8">
              <span>MAX HEFELE — MELODIC TECHNO — CLUB CULTURE — RAVE IN THE CITY VOL.52 — CALL ME EP OUT NOW — PAUL VAN DYK SUPPORT — </span>
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative z-10 pt-[160px] md:pt-[170px] pb-20 md:pb-28 px-4 md:px-8 max-w-[1600px] mx-auto overflow-hidden">
        <div className="light-line top-[18%] left-0 w-[28%] hidden md:block" />
        <div className="light-line top-[62%] right-0 w-[22%] hidden md:block" />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-8 items-center">
          {/* Identity Disc */}
          <div className="relative order-1 md:order-1 flex justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[480px] md:h-[480px] flex items-center justify-center animate-[floatSlow_6s_ease_infinite] max-w-[92vw]">
              <div className="disc-ring w-[115%] h-[115%] opacity-30" style={{borderStyle:"dashed", borderWidth:"1px"}} />
              <div className="disc-ring w-[108%] h-[108%]" />
              <div className="disc-ring w-[102%] h-[102%] border-[#00E5FF]/40" />
              <div className="disc-ring w-[92%] h-[92%] border-white/10" />

              <div className="relative w-[84%] h-[84%] rounded-full bg-gradient-to-b from-[#0B1520] to-[#05050A] border border-[#00E5FF]/30 overflow-hidden shadow-[0_0_80px_rgba(0,229,255,0.25),inset_0_0_60px_rgba(0,229,255,0.1)]">
                <div className="absolute inset-0 opacity-[0.08]" style={{backgroundImage:`linear-gradient(rgba(0,229,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.6) 1px, transparent 1px)`, backgroundSize:"28px 28px"}} />

                <img 
                  src={imgSrc} 
                  onError={() => setImgSrc("https://via.placeholder.com/600x600/05050A/00E5FF?text=MAX+HEFELE")} 
                  alt="Max Hefele" 
                  className="absolute inset-0 w-full h-full object-cover object-top mix-blend-lighten opacity-[0.92]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#00E5FF]/[0.08] mix-blend-color" />

                <div className="scanline" style={{ top: `${10 + scanning * 80}%` }} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[1px] bg-[#00E5FF]/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[92%] bg-[#00E5FF]/20" />

                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#00E5FF]/60" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#00E5FF]/60" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#00E5FF]/60" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#00E5FF]/60" />
              </div>

              <div className="absolute inset-0">
                {[0,90,180,270].map(deg=>(
                  <div key={deg} className="absolute w-[2px] h-[14px] bg-[#00E5FF]" style={{left:"50%", top:"-6px", transformOrigin:"50% 266px", transform:`translateX(-50%) rotate(${deg}deg)`, boxShadow:"0 0 8px #00E5FF"}} />
                ))}
              </div>
            </div>

            <div className="grid-floor" />

            <div className="absolute -bottom-6 md:bottom-2 left-2 md:-left-8 font-mono text-[9px] leading-[1.4] text-[#00E5FF]/50 hidden md:block">
              <div>IDENTITY_DISC // MK-VII</div>
              <div>USER: MAX_HEFELE</div>
              <div>STATUS: <span className="text-[#00E5FF]">RECOGNIZED</span></div>
            </div>
            <div className="absolute -bottom-6 md:bottom-2 right-2 md:-right-6 font-mono text-[9px] leading-[1.4] text-white/30 hidden md:block text-right">
              <div>SCAN_PROGRESS {Math.floor(scanning*100)}%</div>
              <div>BIOMETRICS OK</div>
              <div>GRID ACCESS GRANTED</div>
            </div>
          </div>

          {/* Title Block */}
          <div className="order-2 md:order-2 relative">
            <div className="inline-flex items-center gap-2 border border-[#00E5FF]/20 bg-[#00E5FF]/[0.04] rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-[#00E5FF] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-[pulseLED_1s_ease_infinite]" />
               20 YEARS OF CLUB CULTURE • EST. 2005
            </div>

            <h1 className="font-display font-[800] leading-[0.85] tracking-[-0.03em]">
              <span className="block text-[44px] md:text-[84px] lg:text-[96px] text-white">MAX</span>
              <span className="block text-[44px] md:text-[84px] lg:text-[96px] text-transparent" style={{WebkitTextStroke:"1px rgba(0,229,255,0.8)", textShadow:"0 0 30px rgba(0,229,255,0.5)"}}>HEFELE</span>
            </h1>

            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <div className="border border-[#00E5FF]/30 bg-black/50 backdrop-blur px-4 py-3 rounded-[12px] min-w-[120px]">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#00E5FF]/60">GENRE</div>
                <div className="font-display font-[700] text-[14px] tracking-[0.1em] text-white">MELODIC TECHNO</div>
              </div>
              <div className="border border-white/10 bg-white/[0.02] backdrop-blur px-4 py-3 rounded-[12px] min-w-[120px]">
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/40">EST.</div>
                <div className="font-display font-[700] text-[14px] tracking-[0.1em] text-white">2005 — PRESENT</div>
              </div>
              <div className="border border-[#00E5FF]/30 bg-[#00E5FF]/[0.06] backdrop-blur px-4 py-3 rounded-[12px] min-w-[120px]">
                <div className="font-mono text-[9px] tracking-[0.2em] text-[#00E5FF]/60">ARTIST</div>
                <div className="font-display font-[700] text-[14px] tracking-[0.1em] text-white">MAX HEFELE</div>
              </div>
            </div>

            <p className="font-body font-[300] text-[15px] md:text-[16px] leading-[1.7] text-white/60 max-w-[520px] mt-6 md:mt-8">
              Zwei Plattenspieler sind mehr als nur Technik. Nach zwei Jahrzehnten hinter den Decks macht der eigene Name sichtbar, was ihn geformt hat. <span className="text-white/90">Spannung, Tiefe und der richtige Moment</span> — statt Effekten.
            </p>

            <div className="mt-8 flex gap-3">
              <button onClick={()=>scrollTo("music")} className="h-[44px] px-6 rounded-full bg-white text-black font-display font-[700] text-[12px] tracking-[0.12em] hover:bg-[#00E5FF] transition-colors">ENTER GRID / MUSIC</button>
              <button onClick={()=>scrollTo("about")} className="h-[44px] px-6 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur text-white font-mono text-[11px] tracking-[0.15em] hover:border-[#00E5FF]/40 hover:text-[#00E5FF] transition-colors">READ IDENTITY FILE</button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 border-t border-[#00E5FF]/10 bg-gradient-to-b from-transparent to-[#070B14]/80">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-28">
          <div className="flex items-start justify-between gap-8 mb-10 md:mb-16">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#00E5FF] mb-3">// ABOUT / IDENTITY_FILE</div>
              <h2 className="font-display font-[800] text-[32px] md:text-[56px] leading-[0.9] tracking-[-0.02em] text-white">
                20 JAHRE<br />
                <span className="text-[#00E5FF]">CLUBKULTUR</span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 font-mono text-[9px] text-white/20">
              <div className="w-[40px] h-[1px] bg-white/20" />
              <span>FILE_REF: MAX_HEFELE_BIO_v13</span>
            </div>
          </div>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16">
            <div className="space-y-5">
              {BIO.map((p,i)=>(
                <p key={i} className={`font-body leading-[1.8] ${i===0 ? "font-display font-[700] text-[18px] md:text-[20px] text-white tracking-[-0.01em]" : "font-[300] text-[14px] md:text-[15px] text-white/65"}`}>
                  {i===0 ? <span className="inline-block border-l-2 border-[#00E5FF] pl-4">{p}</span> : p}
                </p>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-[16px] border border-[#00E5FF]/15 bg-[#0A121E]/80 backdrop-blur-xl p-5 md:p-6">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#00E5FF] mb-4">RESIDENCIES & HIGHLIGHTS</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Citrus Club Ulm '05–'11",
                    "Pitu Memmingen '05–'12",
                    "Goldcream '12–'14",
                    "Zollamt Stuttgart '16–'19",
                    "Puls Club Günzburg '22–'23",
                    "Nature One 18/19",
                    "Ikarus Festival 2023",
                    "Bayern 3 Hot Mix"
                  ].map(r=>(
                    <div key={r} className="flex items-center gap-2 font-mono text-[11px] text-white/70 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1.5">
                      <div className="w-1 h-1 rounded-full bg-[#00E5FF]" /> {r}
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/5 flex gap-2">
                  <div className="flex-1 rounded-[10px] bg-black/60 border border-white/5 p-3">
                    <div className="font-mono text-[9px] text-white/30">BEATPORT</div>
                    <div className="font-display font-[700] text-white text-[13px]">#39 Top 100</div>
                    <div className="font-mono text-[9px] text-[#00E5FF]">Melodic Techno 6 Days</div>
                  </div>
                  <div className="flex-1 rounded-[10px] bg-[#00E5FF]/10 border border-[#00E5FF]/20 p-3">
                    <div className="font-mono text-[9px] text-[#00E5FF]/60">VONYC</div>
                    <div className="font-display font-[700] text-white text-[13px]">Paul van Dyk</div>
                    <div className="font-mono text-[9px] text-white/60">Session 1026 Support</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[16px] border border-white/10 bg-white/[0.02] p-5 flex items-center gap-4">
                <img src={imgSrc} onError={() => setImgSrc("https://via.placeholder.com/600x600/05050A/00E5FF?text=MAX+HEFELE")} className="w-14 h-14 rounded-full object-cover border border-[#00E5FF]/30" alt="Max" />
                <div>
                  <div className="font-display font-[700] text-[14px] text-white">Rave in the City</div>
                  <div className="font-mono text-[10px] text-white/50">Alle 2 Wochen • YouTube • 1 Hour • Qualität statt Quantität</div>
                  <a href={SOCIAL_LINKS[2].url} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 font-mono text-[10px] tracking-[0.15em] text-[#00E5FF] hover:text-white transition-colors">YOUTUBE.COM/@MAXHEFELE →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="relative z-10 border-t border-[#00E5FF]/10 bg-[#070B14]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#00E5FF] mb-3">// MUSIC / AUDIO_STREAMS</div>
              <h2 className="font-display font-[800] text-[36px] md:text-[64px] leading-[0.9] tracking-[-0.02em] text-white">MUSIC<br /><span className="text-white/20">GRID</span></h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] text-white/30">
              <span className="hidden md:inline">STREAMING NODES ACTIVE • 7 ENDPOINTS •</span>
              <span className="inline-flex items-center gap-1.5 border border-emerald-400/20 bg-emerald-400/10 rounded-full px-2.5 py-1 text-emerald-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[pulseLED_1s_ease_infinite]" /> LIVE</span>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-3 md:gap-4">
            {MUSIC_PLATFORMS.map((p,i)=>{
              const span = i===0 || i===1 ? "md:col-span-6" : "md:col-span-4";
              return (
                <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className={`${span} group relative rounded-[16px] md:rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/40 backdrop-blur-xl p-5 md:p-6 overflow-hidden hover:border-[#00E5FF]/40 transition-all hover:-translate-y-[1px] hover:shadow-[0_0_40px_rgba(0,229,255,0.15)]`}>
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center font-display font-[800] text-[11px] tracking-[0.1em] text-white group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                      {p.id.toUpperCase()}
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.2em] text-white/30 border border-white/10 rounded-full px-2 py-1">NODE_{i+1}</div>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display font-[700] text-[16px] md:text-[18px] text-white tracking-[-0.01em]">{p.name}</h3>
                    <p className="font-body font-[300] text-[13px] leading-[1.6] text-white/55 mt-2 min-h-[42px]">{p.desc}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex h-[32px] items-center rounded-full bg-white text-black px-4 font-display font-[700] text-[11px] tracking-[0.1em] group-hover:bg-[#00E5FF] transition-colors">{p.cta} →</span>
                    <span className="font-mono text-[10px] text-white/20">{p.url.replace("https://","").slice(0,22)}</span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-8 grid md:grid-cols-[1.3fr_0.7fr] gap-4">
            <div className="rounded-[16px] border border-[#00E5FF]/20 bg-[#00E5FF]/[0.04] p-4 md:p-5 flex flex-wrap items-center gap-4">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#00E5FF]">GOOGLE DRIVE • MEDIA VAULT</div>
              <div className="flex gap-2">
                <a href={GOOGLE_DRIVE.videos} target="_blank" rel="noopener noreferrer" className="h-[30px] px-3 rounded-full bg-black/60 border border-white/10 text-white font-mono text-[10px] tracking-[0.12em] flex items-center hover:border-[#00E5FF]/40">VIDEOS FOLDER</a>
                <a href={GOOGLE_DRIVE.pressKit} target="_blank" rel="noopener noreferrer" className="h-[30px] px-3 rounded-full bg-[#00E5FF] text-black font-display font-[700] text-[10px] tracking-[0.12em] flex items-center">PRESS KIT</a>
              </div>
              <div className="ml-auto hidden md:flex items-center gap-2 font-mono text-[9px] text-white/30"><div className="w-1 h-1 rounded-full bg-[#00E5FF]" /> FIRST_VIDEO_ID: {GOOGLE_DRIVE.firstVideoId.slice(0,8)}...</div>
            </div>
            <div className="rounded-[16px] border border-white/10 bg-black/40 p-4 flex items-center justify-between">
              <div className="font-mono text-[10px] text-white/40 leading-[1.5]">DEBÜT-EP<br /><span className="font-display font-[700] text-white text-[14px] tracking-[0.05em]">CALL ME [MYR]</span></div>
              <div className="text-right">
                <div className="font-mono text-[9px] text-[#00E5FF]">#39 BEATPORT TOP 100</div>
                <div className="font-mono text-[9px] text-white/30">6 DAYS CHART</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="relative z-10 border-t border-white/5 bg-[#05050A]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#00E5FF] mb-3">// NEWS / TRANSMISSION_LOG</div>
              <h2 className="font-display font-[800] text-[36px] md:text-[64px] leading-[0.9] text-white">NEWS</h2>
            </div>
            <div className="font-mono text-[9px] text-white/30 hidden md:block">5 TRANSMISSIONS • SORTED BY DATE DESC</div>
          </div>

          <div className="grid md:grid-cols-5 gap-3 md:gap-4">
            {NEWS.map(item=>(
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className="group relative rounded-[16px] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#00E5FF]/30 p-5 flex flex-col min-h-[240px] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#00E5FF] border border-[#00E5FF]/20 bg-[#00E5FF]/10 rounded-full px-2 py-1">{item.cat}</span>
                  <span className="font-mono text-[9px] text-white/30">{item.date}</span>
                </div>
                <h3 className="font-display font-[700] text-[15px] leading-[1.25] text-white group-hover:text-[#00E5FF] transition-colors">{item.title}</h3>
                <p className="font-body font-[300] text-[12px] leading-[1.6] text-white/50 mt-3 flex-1">{item.excerpt}</p>
                <div className="mt-5 font-mono text-[10px] tracking-[0.12em] text-white/40 group-hover:text-white transition-colors">READ MORE ON →</div>
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#00E5FF] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DATES */}
      <section id="dates" className="relative z-10 border-y border-[#00E5FF]/10 bg-[#070B14] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:`repeating-linear-gradient(90deg, transparent 0 48px, rgba(0,229,255,0.6) 48px 49px)`}} />
        <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-display font-[800] text-[36px] md:text-[64px] leading-[0.9] text-white">DATES</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00E5FF]/30 to-transparent hidden md:block" />
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 border border-white/10 rounded-full px-3 py-1.5 bg-black/40">LIVE / TOUR</div>
          </div>

          <div className="rounded-[20px] border border-[#00E5FF]/20 bg-black/60 backdrop-blur-xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-[#00E5FF] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-[pulseLED_1s_ease_infinite]" /> GRID SYNCING...
            </div>
            <h3 className="font-display font-[800] text-[22px] md:text-[36px] tracking-[0.1em] text-white">NEUE TERMINE WERDEN<br />BALD BEKANNTGEGEBEN</h3>
            <p className="font-mono text-[11px] tracking-[0.15em] text-white/40 mt-4">Für Booking-Anfragen bitte Kontakt aufnehmen.</p>
            <div className="mt-8 flex justify-center">
              <a href="mailto:info@maxhefele.de" className="h-[40px] px-6 rounded-full bg-[#00E5FF] text-black font-display font-[700] text-[11px] tracking-[0.12em] flex items-center">BOOKING REQUEST</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 bg-[#05050A] border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-16">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-[#00E5FF] mb-3">// CONTACT / COMMS_LINK</div>
              <h2 className="font-display font-[800] text-[36px] md:text-[56px] leading-[0.9] text-white">CONTACT</h2>
              <p className="font-body font-[300] text-[14px] leading-[1.7] text-white/55 mt-6 max-w-[420px]">Für Booking-Anfragen, Kooperationen oder allgemeine Fragen — einfach eine Nachricht schicken. Encrypted channel preferred.</p>

              <a href="mailto:info@maxhefele.de" className="mt-8 inline-flex items-center gap-3 h-[52px] px-6 rounded-full bg-white text-black font-display font-[700] text-[14px] tracking-[0.05em] hover:bg-[#00E5FF] transition-colors group">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[12px] group-hover:bg-black">✉</span>
                info@maxhefele.de
              </a>

              <div className="mt-8 rounded-[16px] border border-[#00E5FF]/15 bg-[#0A121E]/60 p-4 font-mono text-[10px] leading-[1.6] text-white/40">
                <div className="text-[#00E5FF] mb-1">SECURE COMMS</div>
                <div>PROTOCOL: SMTP/TLS</div>
                <div>RECIPIENT: MAX_HEFELE@GRID</div>
                <div>STATUS: ENCRYPTED • VERIFIED</div>
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/30 mb-4">SOCIAL NODES • 8 ACTIVE</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(s=>(
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-[14px] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#00E5FF]/30 px-4 py-4 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[10px] text-white/60 group-hover:bg-[#00E5FF] group-hover:text-black transition-colors">
                        {s.name.slice(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-display font-[600] text-[13px] text-white">{s.name}</div>
                        <div className="font-mono text-[10px] text-white/40">{s.handle}</div>
                      </div>
                    </div>
                    <div className="font-mono text-[12px] text-white/20 group-hover:text-[#00E5FF] transition-colors">↗</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-[#00E5FF]/10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-8 font-mono text-[10px] tracking-[0.15em] text-white/30">
            <span className="text-white/60">© {new Date().getFullYear()} MAX HEFELE — ALL RIGHTS RESERVED</span>
            <span className="hidden md:inline w-[1px] h-3 bg-white/10" />
            <span>GRID v13.0 • TRON LEGACY MERGED • FINAL</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setLegal("imprint")} className="h-[32px] px-4 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[10px] tracking-[0.15em] text-white/60 hover:text-white hover:border-white/20 transition-colors">IMPRESSUM</button>
            <button onClick={()=>setLegal("privacy")} className="h-[32px] px-4 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/10 font-mono text-[10px] tracking-[0.15em] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors">DATENSCHUTZ</button>
            <div className="ml-2 hidden md:flex items-center gap-1">
              {[0,1,2].map(i=><div key={i} className="w-1 h-1 rounded-full bg-[#00E5FF]/40" />)}
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-start md:items-center justify-center p-3 md:p-8 overflow-y-auto" onClick={(e)=>{ if(e.target===e.currentTarget) setLegal(null); }}>
          <div className="w-full max-w-[760px] rounded-[20px] border border-[#00E5FF]/20 bg-[#0A121E] shadow-[0_0_80px_rgba(0,229,255,0.15)] overflow-hidden mt-12 md:mt-0">
            <div className="h-[48px] flex items-center justify-between px-6 border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-[pulseLED_1s_ease_infinite]" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#00E5FF]">{legal==="imprint" ? "IMPRESSUM // §5 DDG" : "DATENSCHUTZ // PRIVACY"}</span>
              </div>
              <button onClick={()=>setLegal(null)} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10">✕</button>
            </div>
            <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto font-body text-[13px] leading-[1.7] text-white/70">
              {legal==="imprint" ? (
                <>
                  <h2 className="font-display font-[800] text-[24px] text-white mb-1">IMPRESSUM</h2>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#00E5FF] mb-6">Angaben gemäß § 5 DDG</p>
                  <div className="space-y-6">
                    <div className="rounded-[12px] border border-white/10 bg-white/[0.02] p-4">
                      <div className="font-mono text-[10px] text-white/40 mb-2">VERANTWORTLICH</div>
                      <div className="font-display font-[600] text-white">Max Hefele<br />Kapellenfeld 3<br />86865 Markt Wald<br />Deutschland</div>
                    </div>
                    <div>
                      <h3 className="font-display font-[700] text-white text-[14px] mb-1">Kontakt</h3>
                      <p>E-Mail: <a href="mailto:info@maxhefele.de" className="text-[#00E5FF] hover:underline">info@maxhefele.de</a></p>
                    </div>
                    <div>
                      <h3 className="font-display font-[700] text-white text-[14px] mb-1">EU-Streitschlichtung</h3>
                      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF]">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-display font-[800] text-[24px] text-white mb-1">DATENSCHUTZ</h2>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#00E5FF] mb-6">Datenschutzerklärung • Stand: 09. Juli 2026</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-[700] text-white mb-2">1. Datenschutz auf einen Blick</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong className="text-white">Allgemeine Hinweise:</strong> Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</li>
                        <li><strong className="text-white">Verantwortliche Stelle:</strong> Max Hefele, Kapellenfeld 3, 86865 Markt Wald, Deutschland. E-Mail: info@maxhefele.de</li>
                        <li><strong className="text-white">Widerruf:</strong> Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt unberührt.</li>
                        <li><strong className="text-white">Rechte:</strong> Auskunft, Löschung, Berichtigung, Einschränkung, Datenübertragbarkeit, Widerspruch.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display font-[700] text-white mb-2">2. Hosting und Drittanbieter-Dienste</h3>
                      <div className="grid gap-3">
                        {[
                          { n:"GitHub Pages (Hosting)", d:"Wir hosten diese Website über GitHub Pages der GitHub Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA. Beim Aufruf werden Logfiles (IP, Datum, Uhrzeit) verarbeitet. Rechtsgrundlage Art. 6 Abs.1 lit.f DSGVO." },
                          { n:"Google Drive (Videos / Press Kit)", d:"Inhalte werden über Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland eingebunden. Beim Laden werden Daten an Google übertragen. Einwilligung Art.6 Abs.1 lit.a DSGVO." },
                          { n:"SoundCloud", d:"Plugins der SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin. Beim Laden des Players wird Ihre IP und ggf. Account-Info übertragen." },
                          { n:"Mixcloud", d:"Links/Plugins der Mixcloud Limited, 275 New North Road, London N1 7AA, Großbritannien. Erst bei Klick Übertragung." },
                          { n:"Beatport, Instagram & YouTube", d:"Reine Text- bzw. Grafiklinks zu externen Plattformen. Erst bei aktivem Klick verlassen Sie den Grid und werden weitergeleitet. YouTube: Google Ireland Limited. Instagram: Meta Platforms Ireland." },
                          { n:"Spotify / Apple Music / Amazon Music", d:"Externe Links zu Streaming-Diensten. Beim Klick gelten deren Datenschutzbestimmungen." },
                        ].map(x=>(
                          <div key={x.n} className="rounded-[10px] border border-white/5 bg-white/[0.02] p-3">
                            <div className="font-mono text-[11px] font-[600] text-[#00E5FF]">{x.n}</div>
                            <div className="font-body text-[12px] text-white/60 mt-1">{x.d}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-[700] text-white mb-2">3. Ihre Rechte</h3>
                      <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Beschwerde bei einer Aufsichtsbehörde. Kontakt: info@maxhefele.de</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-white/30">
                      STAND: 09. Juli 2026 • GRID PROTOCOL v13 FINAL MERGED • MAX HEFELE, Kapellenfeld 3, 86865 Markt Wald, Deutschland
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}