/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();
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
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
        port: "",
      },
    ],
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/@:username/',
  //       destination: "/:username"
  //     }
  //   ]
  // }
};

export default nextConfig;
