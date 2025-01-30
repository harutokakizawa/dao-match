/** @type {import('next').NextConfig} */
const baseUrl = process.env.VERCEL_ENV === 'production'
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'



const nextConfig = {
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
      },
      env: {
        URL: baseUrl,
        API_ENDPOINT: `${baseUrl}/api`,
        RUNTIME: 'Next.js'
      }
    

};

export default nextConfig;
