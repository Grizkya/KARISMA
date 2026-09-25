/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unram.ac.id",
      },
      {
        protocol: "https",
        hostname: "feb.unram.ac.id",
      },
      {
        protocol: "https",
        hostname: "hmif.if.unram.ac.id",
      },
    ],
  },
};

export default nextConfig;