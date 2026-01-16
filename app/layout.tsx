import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DriveTrack Pro",
  description: "Track driving lessons with ease",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png", // Favicon for browser tabs
    apple: "/icon-192.png", // The special icon for iPhones/iPads
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // This stops the phone from zooming in when you tap an input
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}