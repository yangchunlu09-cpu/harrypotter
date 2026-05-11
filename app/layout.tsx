import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "哈利波特魔法石",
  description: "互动式视觉小说解谜游戏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
