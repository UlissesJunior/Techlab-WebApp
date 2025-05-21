import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      spacing: {
        'dashboard': '16px',
        'dashboard-sm': '8px',
        'dashboard-md': '12px',
        'dashboard-lg': '20px',
        'dashboard-xl': '24px',
      },
      borderRadius: {
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
      },
      colors: {
        'color-0': 'var(--color-0)',
        'color-1': 'var(--color-1)',
        'color-2': 'var(--color-2)',
        'background-0': 'var(--background-0)',
        'background-1': 'var(--background-1)',
        'background-2': 'var(--background-2)',
        'background-3': 'var(--background-3)',
        'color-card': 'var(--color-card)',
      },
    },
  },
  plugins: [],
};

export default config;
