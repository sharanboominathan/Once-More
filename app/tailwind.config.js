/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-burgundy': '#2B0F0F',
        'warm-champagne': '#D4AF7A',
        'blush-rose': '#E8C4C4',
        'warm-cream': '#FAF3E9',
        'pure-black': '#0A0A0A',
        'muted-taupe': '#8B7B6B',
        'warm-white': '#F5EDE0',
        'champagne-glow': '#C9956B',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(64px, 10vw, 140px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-l': ['clamp(48px, 6vw, 96px)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-m': ['clamp(32px, 4vw, 56px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'body-l': ['clamp(18px, 1.5vw, 22px)', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'body': ['clamp(16px, 1.2vw, 18px)', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'nav': ['13px', { lineHeight: '1', letterSpacing: '0.08em' }],
        'cta': ['14px', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      borderRadius: {
        'xl': '20px',
        'lg': '12px',
        'sm': '6px',
      },
      spacing: {
        'section': '160px',
        'section-mobile': '80px',
        'container': 'clamp(24px, 5vw, 80px)',
      },
      maxWidth: {
        'content': '1400px',
        'content-sm': '1200px',
      },
      keyframes: {
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(40px)", opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 122, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(212, 175, 122, 0.2)" },
        },
        "quote-pulse": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.25" },
        },
      },
      animation: {
        "marquee": "marquee-scroll 20s linear infinite",
        "scroll-dot": "scroll-dot 1.5s ease-in infinite",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "quote-pulse": "quote-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
