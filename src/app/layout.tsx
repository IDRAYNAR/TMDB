import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMDB Catalog - Discover Movies",
  description: "Explore and discover movies using The Movie Database API. Find popular, top-rated, upcoming, and now playing movies.",
  keywords: ["movies", "film", "cinema", "TMDB", "movie database", "entertainment"],
  authors: [{ name: "TMDB Catalog" }],
  creator: "TMDB Catalog",
  openGraph: {
    title: "TMDB Catalog - Discover Movies",
    description: "Explore and discover movies using The Movie Database API.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMDB Catalog - Discover Movies",
    description: "Explore and discover movies using The Movie Database API.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
