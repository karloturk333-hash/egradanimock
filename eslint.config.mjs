import next from "eslint-config-next";

/**
 * ESLint flat config (Next 16 nema više `next lint` — koristi se ESLint CLI).
 * `eslint-config-next` ovdje izvozi gotov flat-config niz (core-web-vitals + a11y + TS).
 */
const config = [
  ...next,
  {
    // Dodatni ignore-i uz one koje config-next već postavlja (.next, out, build…).
    ignores: [".next-*/**", "playwright-report/**", "test-results/**"],
  },
];

export default config;
