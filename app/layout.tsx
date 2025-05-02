import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GeneralLayout from "./ui/general-layout";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brainbliz",
  description: "Test your knowledge with Brainbliz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossOrigin="anonymous" strategy="beforeInteractive"></Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GeneralLayout children={children} title="Home"></GeneralLayout>
      </body>
    </html>
  );
}
