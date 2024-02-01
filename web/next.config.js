module.exports = {
  // ... rest of the configuration.
  output: "standalone",
  serverRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  // Will be available on both server and client
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  }
};