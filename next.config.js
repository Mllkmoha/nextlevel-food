/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "aqtqybpijjtlfmtbtfog.supabase.co",
          pathname: "/storage/v1/object/public/meals-images/**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;