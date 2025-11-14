import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
    domains: ["cdn.jsdelivr.net", "cdn.simpleicons.org"],
  },
  experimental: {
    serverExternalPackages: ["@sentry/nextjs"]
  }
}

export default withSentryConfig(nextConfig, {
  org: "robby-org",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    assets: [".next/static/**"],
    ignore: ["node_modules", "**/*_client-reference-manifest.js", "**/server/**"],
    filesToDeleteAfterUpload: [".next/**/*.map"],
  },
});