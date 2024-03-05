/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "w7.pngwing.com",
            port: "",
          },
          {
            protocol: "https",
            hostname: "unsplash-assets.imgix.net",
            port: "",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
          },
        ],
      },
};

export default nextConfig;
