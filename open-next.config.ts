import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // `npm run build` runs OpenNext, so its internal Next.js build must call a different script.
  buildCommand: "npm run build:next",
};
