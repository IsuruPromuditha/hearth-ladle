import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/recipes";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-ui" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Hearth & Ladle", template: "%s – Hearth & Ladle" },
  description: "Reliable recipes with simple ingredients.",
  openGraph: { siteName: "Hearth & Ladle", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${serif.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
