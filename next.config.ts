import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dopušta paralelne dev servere (npr. e2e: normalni + prazni pretinac)
     da ne dijele isti .next direktorij. */
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
