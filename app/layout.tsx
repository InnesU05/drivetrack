import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#2563eb", // Sets the browser bar color to your blue
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Makes it feel like an app (no zooming)
};

export const metadata: Metadata = {
  metadataBase: new URL("https://adibase.co.uk"), // Ensure this is your real domain
  title: "ADIbase",
  description: "The complete driving lesson tracker.",
  manifest: "/manifest.json",
  
  // 🔴 ADD THIS BLOCK HERE
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png", // This is the key fix for iOS/Chrome
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon-192.png",
    },
  },
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