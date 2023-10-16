/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.camzerocol.com',
    WS_API_URL: process.env.NEXT_PUBLIC_WS_API_URL || 'wss://api.camzerocol.com',
    // API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    // WS_API_URL: process.env.NEXT_PUBLIC_WS_API_URL || 'ws://localhost:8080',
  }
  ,
  images: {
     loader: 'custom',
     domains: [
      'room.camzerocol.com',
       'mybucketappdeh.s3.ap-northeast-2.amazonaws.com'
    ],
  }
}

module.exports = nextConfig
