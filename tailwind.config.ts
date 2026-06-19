import type { Config } from 'tailwindcss'

/**
 * Design tokens derivados do Sales_Club_Brand_Guide.md.
 * Tema dark-first, premium/executivo. Vermelho intenso sobre preto profundo.
 * NÃO usar cores hard-coded fora destes tokens (CLAUDE.md §11).
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Vermelhos da marca
        brand: {
          DEFAULT: '#AF0002', // Vermelho Escuro — CTA, headings em destaque
          vivid: '#FA0100', // Vermelho Vivo — ícone do logo, destaques
          hover: '#BF2C2D', // hover/variação dos ícones
          wine: '#350001', // Vinho/marrom — textos escuros em seções claras
        },
        // Tons de fundo (dark-first)
        ink: {
          DEFAULT: '#0C0C0C', // Preto profundo — fundo principal
          card: '#121316', // Preto secundário — cards e seções alternadas
          line: '#1F2124', // Cinza escuro — cards com borda, separadores
        },
        // Neutros / texto
        mute: '#54595F', // Cinza médio — textos secundários, ícones sutis
        paper: {
          DEFAULT: '#FAFAFA', // Branco suave — texto de destaque
          pure: '#FFFFFF', // Branco puro
          cool: '#F8F9FC', // Branco azulado
        },
        // Acento decorativo (uso mínimo — ~6% opacidade)
        teal: '#6AD1D2',
      },
      fontFamily: {
        sans: ['var(--font-heebo)', 'system-ui', 'sans-serif'],
        display: ['var(--font-heebo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala alinhada à hierarquia do brand guide
        'display-lg': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.05', fontWeight: '800' }],
        'display': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.1', fontWeight: '900' }],
        'heading': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.2', fontWeight: '600' }],
      },
      borderRadius: {
        cta: '12px', // botões CTA
        card: '12px',
      },
      borderColor: {
        subtle: 'rgba(237, 237, 237, 0.08)',
        faint: 'rgba(237, 237, 237, 0.04)',
      },
      boxShadow: {
        card: '0 8px 30px rgba(0, 0, 0, 0.35)',
        'card-light': '0 4px 20px rgba(12, 12, 12, 0.08)',
      },
      maxWidth: {
        content: '1200px',
        prose: '70ch',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
