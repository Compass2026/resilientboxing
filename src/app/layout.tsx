import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Resilient Boxing | O'Fallon, MO | Faith & Boxing",
  description:
    "Resilient Boxing uses Faith & Boxing to help you find the best version of who you are. Located at 51 Elaine Dr, O'Fallon, MO. Call (314) 315-5046.",
  keywords: [
    "boxing gym O'Fallon MO",
    "Resilient Boxing",
    "boxing classes O'Fallon",
    "kickboxing Missouri",
    "faith-based fitness",
    "Fight Camp",
    "weight training boxing",
    "WellnessLiving boxing",
  ],
  authors: [{ name: "Resilient Boxing" }],
  openGraph: {
    title: "Resilient Boxing | Faith & Boxing | O'Fallon, MO",
    description:
      "More than a gym. A community built on faith, grit, and the refusal to stay down. First class free.",
    url: "https://resilientboxing.com",
    siteName: "Resilient Boxing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resilient Boxing | O'Fallon, MO",
    description: "Faith & Boxing. Your comeback starts here.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="bg-[#0A0A0A] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
