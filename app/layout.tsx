import type { Metadata } from "next";
import {
  DM_Sans,
  Bebas_Neue,
  DM_Mono,
  Playfair_Display,
} from "next/font/google";
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
  metadataBase: new URL("https://vrushali-devlekar.vercel.app"),
  title: {
    default: "Vrushali Devlekar | Full Stack & Three.js Developer",
    template: "%s | Vrushali Devlekar",
  },
  description:
    "Enterprise-grade Full Stack Engineer & Three.js Developer based in Mumbai, India. Specialized in high-performance web systems, interactive WebGL, and modern UI engineering.",
  keywords: [
    "Vrushali Devlekar",
    "Full Stack Developer",
    "Three.js Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Mumbai Developer",
    "India Software Engineer",
    "Web Developer Portfolio",
  ],
  authors: [
    { name: "Vrushali Devlekar", url: "https://github.com/vrushali-devlekar" },
  ],
  creator: "Vrushali Devlekar",
  icons: {
    icon: "/vrushali.webp",
    shortcut: "/vrushali.webp",
    apple: "/vrushali.webp",
  },
  openGraph: {
    title: "Vrushali Devlekar | Full Stack & Three.js Developer",
    description:
      "Full Stack Engineer & Three.js Developer based in Mumbai, India. Specialized in high-performance web systems and interactive WebGL experiences.",
    url: "https://vrushali-devlekar.vercel.app",
    siteName: "Vrushali Devlekar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vrushali Devlekar - Full Stack & Three.js Developer | Mumbai, India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrushali Devlekar | Full Stack & Three.js Developer",
    description:
      "Full Stack Engineer & Three.js Developer based in Mumbai, India. Specialized in high-performance web systems and interactive WebGL experiences.",
    creator: "@vrushali_i",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "R3AE_Io4QB3ELHr-EBdZ2dY6Y85OUWpGEHfVvU7zuwU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vrushali Devlekar",
  url: "https://vrushali-devlekar.vercel.app/",
  image: "https://vrushali-devlekar.vercel.app/my1.webp",
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Full Stack Engineer",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "India",
  },
  sameAs: [
    "https://www.linkedin.com/in/vrushali-devlekar/",
    "https://github.com/vrushali-devlekar",
    "https://www.instagram.com/rushu.jsx/",
    "https://x.com/vrushali_i",
  ],
  knowsAbout: [
    "Full Stack Web Development",
    "Three.js",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "DevOps",
    "UI/UX Design",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
