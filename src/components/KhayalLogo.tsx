import React from "react";

interface KhayalLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: "badge" | "symbol";
}

export function KhayalLogo({
  size = 32,
  variant = "badge",
  className = "",
  ...props
}: KhayalLogoProps) {
  const isBadge = variant === "badge";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Khayal Logo"
      {...props}
    >
      <defs>
        {/* Pure terracotta & champagne gold gradient */}
        <linearGradient id="khayal-lean-gold" x1="20%" y1="15%" x2="80%" y2="85%">
          <stop offset="0%" stopColor="#f7c88b" />
          <stop offset="40%" stopColor="#d97757" />
          <stop offset="85%" stopColor="#ea8c6a" />
          <stop offset="100%" stopColor="#f5b87a" />
        </linearGradient>

        {/* Minimalist matte squircle background */}
        <linearGradient id="khayal-squircle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#242220" />
          <stop offset="100%" stopColor="#151413" />
        </linearGradient>
      </defs>

      {isBadge && (
        <rect
          x="3.5"
          y="3.5"
          width="93"
          height="93"
          rx="24"
          fill="url(#khayal-squircle-bg)"
          stroke="#d97757"
          strokeOpacity="0.28"
          strokeWidth="1.25"
        />
      )}

      {/* --- Lean & Beautiful Khayal Emblem: Sculpted Arabic Letter 'Kha' (خ) --- */}
      <g transform="translate(0, 1)">
        {/* Calligraphic Diamond Dot (Nuqta) */}
        <polygon
          points="50,23 54.5,27.5 50,32 45.5,27.5"
          fill="url(#khayal-lean-gold)"
        />

        {/* Continuous Slender Ribbon of Kha */}
        <path
          d="M 64 38.5 
             C 56 37.5, 48 37, 43 37.5 
             C 37 38.5, 36 43.5, 41 47 
             C 45 49.5, 47.5 51, 46.5 55 
             C 44.5 63, 40 68, 43 75 
             C 46 82, 57 82, 64 76 
             C 71 70, 71 58, 62 55.5 
             C 53 53.5, 43 62, 33 66"
          fill="none"
          stroke="url(#khayal-lean-gold)"
          strokeWidth="3.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
