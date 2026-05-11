/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 开启纯静态导出，GitHub Pages必须要这个
  distDir: 'out',
  trailingSlash: true, // 彻底解决路由404
  images: {
    unoptimized: true // 静态环境图片正常加载
  }
};

export default nextConfig;
