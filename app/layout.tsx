import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue, DM_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import "remixicon/fonts/remixicon.css";
import "../styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Vrushali Devlekar | Portfolio",
  description: "Enterprise-grade Full Stack Engineer & UI Designer based in Mumbai, India. Specialized in high-performance web systems and developer tooling UI.",
  keywords: ["Full Stack Developer", "Next.js", "React", "TypeScript", "DevOps", "Web Developer Portfolio"],
  authors: [{ name: "Vrushali Devlekar" }],
  icons: {
    icon: "/tap.png",
    shortcut: "/tap.png",
    apple: "/tap.png",
  },
  openGraph: {
    title: "Vrushali Devlekar | Portfolio",
    description: "Enterprise-grade Full Stack Engineer & UI Designer based in Mumbai, India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${bebasNeue.variable} ${dmMono.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
