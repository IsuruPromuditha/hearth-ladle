import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/recipes";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ui",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Hearth & Ladle – Trusted Family Recipes & Everyday Comfort Cooking",
    template: "%s – Hearth & Ladle",
  },
  description:
    "Reliable, kitchen-tested recipes with simple everyday ingredients, step-by-step guides, and family favorites.",
  openGraph: {
    siteName: "Hearth & Ladle",
    title: "Hearth & Ladle – Trusted Family Recipes & Everyday Comfort Cooking",
    description:
      "Reliable, kitchen-tested recipes with simple everyday ingredients, step-by-step guides, and family favorites.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem("hl-theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}