import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven - Artesanías Únicas Hechas a Mano",
    template: "%s | Handcrafted Haven"
  },
  description: "Descubre tesoros artesanales únicos de artesanos apasionados de todo el mundo. Cada pieza cuenta una historia de artesanía, tradición y amor.",
  keywords: ["artesanías", "hechos a mano", "artesanos", "productos únicos", "arte tradicional", "comercio justo"],
  authors: [{ name: "Handcrafted Haven Team" }],
  creator: "Handcrafted Haven",
  publisher: "Handcrafted Haven",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://handcrafted-haven.vercel.app'),
  openGraph: {
    title: "Handcrafted Haven - Artesanías Únicas",
    description: "Descubre tesoros artesanales únicos de artesanos apasionados de todo el mundo.",
    url: 'https://handcrafted-haven.vercel.app',
    siteName: 'Handcrafted Haven',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Handcrafted Haven - Artesanías Únicas',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handcrafted Haven - Artesanías Únicas',
    description: 'Descubre tesoros artesanales únicos de artesanos apasionados.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://handcrafted-haven.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Handcrafted Haven",
              "description": "Descubre tesoros artesanales únicos de artesanos apasionados de todo el mundo.",
              "url": "https://handcrafted-haven.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://handcrafted-haven.vercel.app/products?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-grow">
                  {children}
                </main>
              </div>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}