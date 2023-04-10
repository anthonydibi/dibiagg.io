const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Deathball/Leaderboard",
        destination: "/deathball/leaderboard",
        permanent: true,
      },
      {
        source: "/Resume",
        destination: "/resume",
        permanent: true,
      },
      
    ];
  },
});
