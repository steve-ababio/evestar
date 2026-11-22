"use client";

/**
 * Minimalist geometric vector artwork for all 11 services plus the All Services overview card.
 */
export function ServiceCardIllustration({ slug, dark }: { slug: string; dark: boolean }) {
  const baseFill = dark ? "rgba(255,255,255,0.12)" : "var(--mint)";
  const solidFill = dark ? "rgba(255,255,255,0.18)" : "var(--primary)";
  const accentFill = dark ? "var(--mint)" : "var(--accent)";
  const lineStroke = dark ? "rgba(255,255,255,0.88)" : "var(--primary)";
  const subtleStroke = dark ? "rgba(255,255,255,0.35)" : "rgba(26,35,64,0.22)";

  if (slug === "post-construction-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <path d="M22 76 L64 58 L108 76 L66 92 Z" fill={baseFill} stroke={subtleStroke} strokeWidth="1.5" />
        <path
          d="M36 68 V34 L66 20 L96 34 V68 L66 82 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M66 20 V82 M36 34 L66 48 L96 34" stroke={lineStroke} strokeWidth="1.4" strokeOpacity="0.7" />
        <path d="M20 26 L23 19 L26 26 L33 29 L26 32 L23 39 L20 32 L13 29 Z" fill={accentFill} />
        <circle cx="102" cy="24" r="3" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "event-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <path d="M18 78 L64 60 L108 78 L62 94 Z" fill={baseFill} stroke={subtleStroke} strokeWidth="1.5" />
        <path
          d="M28 76 V44 L64 22 L100 44 V76"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M46 76 V56 C46 47 54 41 64 41 C74 41 82 47 82 56 V76"
          fill={dark ? "rgba(255,255,255,0.18)" : "#ffffff"}
          stroke={lineStroke}
          strokeWidth="1.5"
        />
        <path d="M34 44 Q49 52 64 42 Q79 52 94 44" stroke={accentFill} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M64 10 L66.5 16 L72.5 18.5 L66.5 21 L64 27 L61.5 21 L55.5 18.5 L61.5 16 Z" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "commercial-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <path d="M20 78 L64 60 L108 78 L64 94 Z" fill={baseFill} stroke={subtleStroke} strokeWidth="1.5" />
        <path
          d="M40 76 V26 L64 16 L88 26 V76 L64 86 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M64 16 V86" stroke={lineStroke} strokeWidth="1.3" strokeOpacity="0.65" />
        <path d="M47 36 L58 31 M47 48 L58 43 M47 60 L58 55" stroke={lineStroke} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M70 31 L81 36 M70 43 L81 48 M70 55 L81 60" stroke={accentFill} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="98" cy="30" r="3.2" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "move-in-move-out-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <path d="M22 78 L64 62 L106 78 L64 94 Z" fill={baseFill} stroke={subtleStroke} strokeWidth="1.5" />
        <rect
          x="38"
          y="20"
          width="44"
          height="58"
          rx="4"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
        />
        <path
          d="M44 76 V26 L68 20 V72 L44 76 Z"
          fill={dark ? "rgba(255,255,255,0.22)" : "#ffffff"}
          stroke={lineStroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="62" cy="50" r="2.2" fill={accentFill} />
        <path d="M92 24 L94.5 30 L100.5 32.5 L94.5 35 L92 41 L89.5 35 L83.5 32.5 L89.5 30 Z" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "restaurant-hospitality-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <ellipse cx="62" cy="76" rx="40" ry="12" fill={baseFill} stroke={subtleStroke} strokeWidth="1.4" />
        <path
          d="M28 66 C28 46 43 32 62 32 C81 32 96 46 96 66 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
        />
        <rect x="22" y="66" width="80" height="7" rx="3.5" fill={accentFill} />
        <circle cx="62" cy="27" r="4" fill={lineStroke} />
        <path d="M40 54 C42 46 48 41 55 39" stroke={lineStroke} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M92 24 L94 29 L99 31 L94 33 L92 38 L90 33 L85 31 L90 29 Z" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "carpet-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <path
          d="M16 62 L62 42 L106 62 L60 82 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M28 62 L62 47 L94 62 L60 77 Z"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M44 36 Q52 28 60 36 T76 36" stroke={accentFill} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M32 28 L34 33 L39 35 L34 37 L32 42 L30 37 L25 35 L30 33 Z" fill={accentFill} />
        <circle cx="88" cy="30" r="2.8" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "sofa-upholstery-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <ellipse cx="60" cy="80" rx="40" ry="9" fill={baseFill} stroke={subtleStroke} strokeWidth="1.4" />
        <path
          d="M28 52 V36 C28 32 31 29 35 29 H85 C89 29 92 32 92 36 V52"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
        />
        <rect
          x="20"
          y="48"
          width="80"
          height="22"
          rx="6"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
        />
        <path d="M60 31 V64 M36 52 H84" stroke={accentFill} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 70 V76 M90 70 V76" stroke={lineStroke} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M94 20 L96 25 L101 27 L96 29 L94 34 L92 29 L87 27 L92 25 Z" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "window-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <rect x="26" y="18" width="68" height="62" rx="6" fill={baseFill} stroke={subtleStroke} strokeWidth="1.4" />
        <rect
          x="32"
          y="22"
          width="56"
          height="52"
          rx="4"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
        />
        <path d="M60 22 V74 M32 48 H88" stroke={lineStroke} strokeWidth="1.5" />
        <path d="M40 38 L52 28 M68 64 L80 54" stroke={accentFill} strokeWidth="2" strokeLinecap="round" />
        <path d="M94 20 L96 25 L101 27 L96 29 L94 34 L92 29 L87 27 L92 25 Z" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "mobile-vehicle-care") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <ellipse cx="62" cy="80" rx="42" ry="10" fill={baseFill} stroke={subtleStroke} strokeWidth="1.4" />
        <path
          d="M22 62 L30 42 C33 37 38 34 45 34 H76 C82 34 87 37 90 42 L100 49 C104 51 106 55 106 59 V68 C106 71 103 73 100 73 H25 C22 73 20 71 20 67 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M36 49 L42 39 H75 L82 49 Z"
          fill={dark ? "rgba(255,255,255,0.22)" : "var(--mint)"}
          stroke={lineStroke}
          strokeWidth="1.2"
        />
        <circle cx="38" cy="73" r="8" fill={dark ? "#1a1a1d" : "#ffffff"} stroke={lineStroke} strokeWidth="2" />
        <circle cx="38" cy="73" r="2.8" fill={accentFill} />
        <circle cx="88" cy="73" r="8" fill={dark ? "#1a1a1d" : "#ffffff"} stroke={lineStroke} strokeWidth="2" />
        <circle cx="88" cy="73" r="2.8" fill={accentFill} />
        <circle cx="24" cy="28" r="3.4" fill={accentFill} />
        <circle cx="96" cy="24" r="2.6" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "heavy-machinery-cleaning") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <ellipse cx="60" cy="80" rx="42" ry="10" fill={baseFill} stroke={subtleStroke} strokeWidth="1.4" />
        <path
          d="M20 40 H68 L74 64 H20 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M74 44 H92 L102 54 V68 H74 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <rect x="78" y="48" width="12" height="8" rx="1.5" fill={accentFill} />
        <circle cx="36" cy="70" r="8.5" fill={dark ? "#1a1a1d" : "#ffffff"} stroke={lineStroke} strokeWidth="2.2" />
        <circle cx="36" cy="70" r="3" fill={accentFill} />
        <circle cx="86" cy="70" r="8.5" fill={dark ? "#1a1a1d" : "#ffffff"} stroke={lineStroke} strokeWidth="2.2" />
        <circle cx="86" cy="70" r="3" fill={accentFill} />
        <circle cx="24" cy="24" r="2.8" fill={accentFill} />
        <circle cx="34" cy="20" r="2" fill={accentFill} />
      </svg>
    );
  }

  if (slug === "cleaning-supplies") {
    return (
      <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
        <ellipse cx="60" cy="80" rx="34" ry="9" fill={baseFill} stroke={subtleStroke} strokeWidth="1.4" />
        <path
          d="M38 40 H58 L62 76 H34 Z"
          fill={solidFill}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M44 28 H54 V36 H44 Z M40 24 H62" stroke={lineStroke} strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M66 52 H90 L86 76 H70 Z"
          fill={accentFill}
          fillOpacity={dark ? 0.9 : 0.35}
          stroke={lineStroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M84 20 L86 25 L91 27 L86 29 L84 34 L82 29 L77 27 L82 25 Z" fill={accentFill} />
      </svg>
    );
  }

  // Fallback / "all-services" 2x2 grid icon
  return (
    <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="h-16 w-20 transition-colors duration-300">
      <rect x="24" y="24" width="28" height="24" rx="5" fill={solidFill} stroke={lineStroke} strokeWidth="1.6" />
      <rect x="58" y="24" width="28" height="24" rx="5" fill={accentFill} fillOpacity={dark ? 0.9 : 0.35} stroke={lineStroke} strokeWidth="1.6" />
      <rect x="24" y="54" width="28" height="24" rx="5" fill={baseFill} stroke={lineStroke} strokeWidth="1.6" />
      <rect x="58" y="54" width="28" height="24" rx="5" fill={solidFill} stroke={lineStroke} strokeWidth="1.6" />
      <path d="M94 14 L96.5 20 L102.5 22.5 L96.5 25 L94 31 L91.5 25 L85.5 22.5 L91.5 20 Z" fill={accentFill} />
    </svg>
  );
}
