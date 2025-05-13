import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from 'next/head'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "URL Shortener",
  description: "Shorten and share your URLs easily with our free URL shortener tool.",
  openGraph: {
    title: "URL Shortener",
    description: "Shorten and share your URLs easily with our free URL shortener tool.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Shortener",
    description: "Shorten and share your URLs easily with our free URL shortener tool.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="AYOUBE HSSI" />
        <meta name="theme-color" content="#ffffff" />
        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        {/* Twitter Card */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800 min-h-screen w-full`}
      >
        <div className="min-h-screen w-full flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
