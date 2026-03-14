import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import CookieConsent from "../components/CookieConsent";
import { Roboto_Slab, Work_Sans ,Quicksand } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  display: "swap",
});
export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Hyosene Battery | Graphene Power Solutions",
    template: "%s | Hyosene Battery",
  },
  description:
    "Next-generation graphene-integrated battery systems for drones, aerospace, and renewable energy. Advanced energy storage solutions for the future.",
  keywords: [
    "graphene batteries",
    "energy storage",
    "aerospace battery",
    "drone battery",
    "renewable energy",
    "high-density batteries",
    "lightweight batteries",
  ],
  authors: [{ name: "Hyosene Battery" }],
  creator: "Hyosene Battery",
  publisher: "Hyosene Battery",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://hyosenebattery.com",
    title: "Hyosene Battery | Graphene Power Solutions",
    description:
      "Pioneering the future of energy with high-density, lightweight graphene batteries for aerospace and drones.",
    siteName: "Hyosene Battery",
    locale: "en_US",
    images: [
      {
        url: "https://hyosenebattery.com/logohyosene.jpg",
        width: 1200,
        height: 630,
        alt: "Hyosene Battery - Graphene Power Solutions",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hyosene",
    creator: "@hyosene",
    title: "Hyosene Battery | Graphene Power Solutions",
    description: "Next-generation graphene-based batteries for drones and aerospace.",
    images: ["https://hyosenebattery.com/logohyosene.jpg"],
  },
  metadataBase: new URL("https://hyosenebattery.com"),
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  alternates: {
    canonical: "https://hyosenebattery.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXX";
  
  return (
    <html lang="en">
      {/* Apply Work Sans as default body font */}
      <body className={`${quicksand.className} bg-[#0b0b0d] text-white font-sans`}>
        <Navbar />
        <main className={`pt-16 md:pt-20`}>
          {/* Wrap headings with Roboto Slab class */}
          <div className={quicksand.className}>{children}</div>
        </main>
        <CookieConsent />
      </body>
      {gaId !== "G-XXXXXXX" && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      )}
    </html>
  );
}
