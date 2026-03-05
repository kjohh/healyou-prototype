import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "聊心茶室 - AI 媒合屬於你的心理師",
  description: "輸入你正在煩惱的事，聊心茶室會幫你分析推薦合適的心理師",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">{children}</body>
    </html>
  );
}
