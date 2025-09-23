module.exports = {
  publicRuntimeConfig: {
    SERVICE_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/public",
  },
};