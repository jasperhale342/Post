module.exports = {
  // ... rest of the configuration.
  output: "standalone",
  // serverRuntimeConfig: {
  //   API_URL: process.env.API_URL,
  // },
  // // Will be available on both server and client
  // publicRuntimeConfig: {
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // }
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiUrl: 'http://server:8000'
  },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   apiUrl: 'http://localhost:7766'
  // }

};