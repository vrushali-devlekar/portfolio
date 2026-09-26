import type { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Syne,
  DM_Mono,
  DM_Sans,
} from "next/font/google";
import { Providers } from "./providers";
import "remixicon/fonts/remixicon.css";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vrushali-devlekar.vercel.app"),
  title: {
    default: "Vrushali Devlekar | Full Stack & Creative Developer",
    template: "%s | Vrushali Devlekar",
  },
  description:
    "Personal portfolio and engineering case studies by Vrushali Devlekar. High-performance web systems, distributed architectures, and modern UI engineering.",
  keywords: [
    "Vrushali Devlekar",
    "Full Stack Developer",
    "Creative Developer",
    "Next.js",
    "React",
    "TypeScript",
    "DevOps",
    "Docker",
    "Web Performance",
    "Portfolio",
  ],
  authors: [
    { name: "Vrushali Devlekar", url: "https://github.com/vrushali-devlekar" },
  ],
  creator: "Vrushali Devlekar",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
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
    "https://www.instagram.com/rushu4miiday/",
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
      className={`${inter.variable} ${plusJakartaSans.variable} ${syne.variable} ${dmMono.variable} ${dmSans.variable}`}
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
