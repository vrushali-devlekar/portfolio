export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolInstruction {
  step: number;
  title: string;
  description: string;
}

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolItem {
  slug: string;
  title: string;
  shortName: string;
  description: string;
  category: "Developer Utility" | "Media Optimization" | "Web Development" | "SEO & Marketing" | "P2P Network Tool";
  iconName: string;
  badge: string;
  href: string;
  githubUrl?: string;
  projectUrl?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
  };
  highlights: string[];
  features: ToolFeature[];
  instructions: ToolInstruction[];
  faqs: ToolFAQ[];
}

export const TOOLS: ToolItem[] = [
  {
    slug: "json-formatter",
    title: "Free JSON Formatter & Validator Online",
    shortName: "JSON Formatter & Validator",
    description: "Format, validate, minify, and inspect JSON directly in your browser with real-time error detection and zero server uploads.",
    category: "Developer Utility",
    iconName: "ri-code-s-slash-line",
    badge: "100% Client-Side",
    href: "/tools/json-formatter",
    seo: {
      title: "Free JSON Formatter & Validator Online | Vrushali Devlekar",
      description: "Format, validate, minify, and inspect JSON directly in your browser with this free online JSON formatter with syntax error highlights.",
      keywords: [
        "free online JSON formatter",
        "JSON validator",
        "JSON minifier",
        "format JSON browser",
        "JSON parser online",
        "beautify JSON",
        "JSON syntax validator",
      ],
      canonical: "https://vrushali-devlekar.vercel.app/tools/json-formatter",
    },
    highlights: [
      "Zero server transmission (100% local client-side processing)",
      "Real-time syntax validation with line & column error diagnostics",
      "Instant 2-space, 4-space, or tab indentation beautification",
      "One-click minify and clipboard copy",
    ],
    features: [
      {
        title: "Intelligent JSON Syntax Validation",
        description: "Detects unescaped quotes, trailing commas, unmatched brackets, and unexpected tokens with exact character position highlights.",
      },
      {
        title: "Customizable Indentation",
        description: "Choose between compact 2-space formatting, readable 4-space standard, or clean tab indents.",
      },
      {
        title: "Instant Minification",
        description: "Strip all unnecessary whitespace and carriage returns to minimize payload size for production network requests.",
      },
      {
        title: "Privacy Guaranteed",
        description: "Your JSON data never leaves your device. All parsing and formatting occur purely in your browser runtime memory.",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Paste Raw JSON",
        description: "Paste your raw, minified, or unformatted JSON text into the input editor.",
      },
      {
        step: 2,
        title: "Select Formatting Action",
        description: "Click 'Format' to beautify, 'Validate' to check syntax compliance, or 'Minify' to condense.",
      },
      {
        step: 3,
        title: "Inspect Diagnostics & Copy",
        description: "Review detailed character and line metrics, fix any highlighted errors, and copy the clean JSON output.",
      },
    ],
    faqs: [
      {
        question: "What is a JSON formatter?",
        answer: "A JSON formatter is a developer utility that parses JavaScript Object Notation (JSON) strings, validates their structural syntax, and organizes the keys and values with clear indentation and line breaks for human readability.",
      },
      {
        question: "Is my JSON uploaded to a server?",
        answer: "No. All JSON processing, parsing, and formatting run 100% client-side inside your web browser using native JavaScript JSON parsers. Your confidential payloads, tokens, or API responses never touch any external server.",
      },
      {
        question: "Can I minify JSON with this tool?",
        answer: "Yes. Clicking the 'Minify' button removes all line breaks, indentation, and extra whitespace, producing a clean, single-line string ready for HTTP payloads and configuration files.",
      },
      {
        question: "How does the tool highlight syntax errors?",
        answer: "When invalid JSON is entered, our parser catches the syntax exception, identifies the precise line number, column offset, and unexpected token, and displays an informative diagnostic alert to help you fix the issue quickly.",
      },
      {
        question: "Is this JSON formatter free to use?",
        answer: "Yes, this tool is 100% free with no usage limits, no login required, and no advertising trackers.",
      },
    ],
  },
  {
    slug: "image-compressor",
    title: "Free Image Compressor Online | JPG, PNG & WebP",
    shortName: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images directly in your browser with adjustable quality sliders and instant local download.",
    category: "Media Optimization",
    iconName: "ri-image-edit-line",
    badge: "Lossy / Lossless",
    href: "/tools/image-compressor",
    seo: {
      title: "Free Image Compressor Online | JPG, PNG & WebP | Vrushali Devlekar",
      description: "Compress JPG, PNG, and WebP images directly in your browser with adjustable quality and instant download. Fast, secure, zero server uploads.",
      keywords: [
        "free image compressor online",
        "compress JPG browser",
        "PNG compressor",
        "WebP image reducer",
        "client-side image compression",
        "reduce image file size online",
      ],
      canonical: "https://vrushali-devlekar.vercel.app/tools/image-compressor",
    },
    highlights: [
      "Compresses JPG, PNG, and WebP images locally via HTML5 Canvas",
      "Dynamic quality slider with real-time before/after size telemetry",
      "Percentage size reduction calculation",
      "Zero server uploads—complete privacy for your photos and design assets",
    ],
    features: [
      {
        title: "Adjustable Compression Ratio",
        description: "Fine-tune the output quality from 1% to 100% to find the optimal trade-off between byte savings and visual fidelity.",
      },
      {
        title: "Side-by-Side Size Comparison",
        description: "Instantly see original file size, compressed file size, and the exact percentage of bandwidth saved.",
      },
      {
        title: "Drag & Drop Interface",
        description: "Drop any photo directly into the browser window or select from your local filesystem with immediate processing.",
      },
      {
        title: "Zero Cloud Processing",
        description: "Images are rendered and compressed directly inside your browser Canvas API without uploading bytes to third-party servers.",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Upload Image",
        description: "Drag and drop a JPG, PNG, or WebP image into the upload area or click to select from your device.",
      },
      {
        step: 2,
        title: "Adjust Quality Slider",
        description: "Use the quality slider to set your desired compression level (typically 75–85% gives optimal results).",
      },
      {
        step: 3,
        title: "Preview & Download",
        description: "Check the calculated savings percentage, preview the compressed image, and click 'Download Compressed Image'.",
      },
    ],
    faqs: [
      {
        question: "How does client-side image compression work?",
        answer: "The tool loads your image into an HTML5 Canvas element in your browser memory and re-encodes the pixel buffer at your chosen compression quality using the browser's native image encoding engine.",
      },
      {
        question: "Are my images uploaded or stored on any server?",
        answer: "No. Your images are never sent over the internet or uploaded to any remote server. Everything is executed on your local machine within your browser sandbox.",
      },
      {
        question: "What image formats are supported?",
        answer: "The tool supports JPEG/JPG, PNG, and WebP images. You can adjust compression parameters and download the optimized version instantly.",
      },
      {
        question: "What is the recommended compression quality?",
        answer: "For web use, a quality setting between 70% and 85% usually yields a 50%–80% reduction in file size with virtually no noticeable difference in human visual perception.",
      },
      {
        question: "Is there a limit on image file size?",
        answer: "Since compression runs in your browser's memory, file sizes up to 50MB are supported seamlessly on modern desktop and mobile browsers.",
      },
    ],
  },
  {
    slug: "webp-converter",
    title: "Free JPG & PNG to WebP Converter Online",
    shortName: "WebP Converter",
    description: "Convert JPG and PNG images to high-performance WebP format directly in your browser with zero server uploads.",
    category: "Media Optimization",
    iconName: "ri-file-transfer-line",
    badge: "Next-Gen Format",
    href: "/tools/webp-converter",
    seo: {
      title: "Free WebP Converter Online | JPG & PNG to WebP | Vrushali Devlekar",
      description: "Convert JPG and PNG images to next-generation WebP format directly in your browser with adjustable compression quality and zero server uploads.",
      keywords: [
        "WebP converter online",
        "convert JPG to WebP",
        "PNG to WebP converter",
        "free image converter browser",
        "next-gen image format",
        "fast WebP conversion",
      ],
      canonical: "https://vrushali-devlekar.vercel.app/tools/webp-converter",
    },
    highlights: [
      "Convert JPG and PNG into high-efficiency Google WebP format",
      "Typical 25%–40% file size savings compared to standard JPEG",
      "Multi-file batch conversion with individual and bulk downloads",
      "Full transparency support for PNG to WebP conversions",
    ],
    features: [
      {
        title: "Next-Gen Format Benefits",
        description: "WebP provides superior lossless and lossy compression for images on the web, significantly improving Google Lighthouse and Core Web Vitals scores.",
      },
      {
        title: "Batch Conversion Support",
        description: "Upload multiple images at once to convert your entire media assets library in a single pass.",
      },
      {
        title: "Alpha Channel Preservation",
        description: "Translucent and transparent backgrounds in PNG files are preserved with high precision during WebP conversion.",
      },
      {
        title: "Pure In-Browser Conversion",
        description: "Fast, private, and offline-capable without relying on external conversion APIs.",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Select Source Images",
        description: "Drop one or more JPG/PNG files onto the converter dropzone.",
      },
      {
        step: 2,
        title: "Configure Export Quality",
        description: "Choose your target WebP export quality (80% default provides outstanding fidelity and compression).",
      },
      {
        step: 3,
        title: "Download Converted Files",
        description: "Download individual `.webp` files or save all converted assets with a single click.",
      },
    ],
    faqs: [
      {
        question: "Why should I convert images to WebP format?",
        answer: "WebP is a modern image format developed by Google that delivers significantly smaller file sizes (often 25%–35% smaller than JPEG and PNG) at equivalent visual quality. Using WebP speeds up website loading times and boosts SEO rankings.",
      },
      {
        question: "Are transparent PNGs supported in WebP conversion?",
        answer: "Yes! WebP fully supports 24-bit RGB color with an 8-bit alpha channel, allowing transparent PNG images to be converted with flawless background transparency and reduced weight.",
      },
      {
        question: "What browsers support WebP images?",
        answer: "WebP is supported by all modern web browsers, including Chrome, Safari (macOS & iOS), Firefox, Edge, and Opera, covering over 96% of global web users.",
      },
      {
        question: "Does converting to WebP upload my files anywhere?",
        answer: "No. The entire conversion is executed locally in your browser using HTML5 Canvas rendering. No images or metadata are ever transmitted to any server.",
      },
      {
        question: "Is there any charge for batch conversion?",
        answer: "No, the WebP converter is 100% free with unlimited conversions.",
      },
    ],
  },
  {
    slug: "favicon-generator",
    title: "Free Online Favicon Generator & Icon Pack Creator",
    shortName: "Favicon Generator",
    description: "Generate website favicons, app icons, and HTML meta tags from any image in seconds directly in your browser.",
    category: "Web Development",
    iconName: "ri-sparkling-2-line",
    badge: "Multi-Resolution",
    href: "/tools/favicon-generator",
    seo: {
      title: "Free Favicon Generator Online | Create Favicons & App Icons | Vrushali Devlekar",
      description: "Generate website favicons, Apple Touch icons, and Android app icons from any image in seconds with complete HTML head snippets. Free and client-side.",
      keywords: [
        "favicon generator online",
        "create website favicon",
        "generate 16x16 32x32 favicon",
        "apple touch icon generator",
        "HTML favicon meta tags",
        "favicon icon pack creator",
      ],
      canonical: "https://vrushali-devlekar.vercel.app/tools/favicon-generator",
    },
    highlights: [
      "Generates standard 16x16, 32x32, 48x48, 180x180 (Apple), 192x192, and 512x512 PWA icons",
      "Live tab and browser bookmark preview simulator",
      "Ready-to-copy HTML <head> implementation tags",
      "Download individual icon sizes or all sizes instantly",
    ],
    features: [
      {
        title: "Standard Multi-Size Generation",
        description: "Produces crisp, high-clarity icon assets optimized for desktop browser tabs, Windows taskbar, iOS homescreen, and Android PWA launchers.",
      },
      {
        title: "Interactive Tab Simulator",
        description: "See how your favicon will look in real dark and light browser tabs next to website titles before deploying.",
      },
      {
        title: "Production HTML Snippet Generator",
        description: "Generates correct `<link rel='icon'>` and `<link rel='apple-touch-icon'>` code snippets compatible with Next.js, Vite, HTML5, and WordPress.",
      },
      {
        title: "Pixel-Perfect Resampling",
        description: "Uses high-quality bicubic interpolation algorithms to keep lines crisp and emblems legible even at 16x16 pixels.",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Upload Source Graphic",
        description: "Upload a high-resolution square image (PNG, SVG, JPG, or WebP; 512x512px recommended).",
      },
      {
        step: 2,
        title: "Preview Icon Sizes",
        description: "Inspect the generated favicon variants across 16px, 32px, 48px, 180px, 192px, and 512px resolutions.",
      },
      {
        step: 3,
        title: "Download & Copy HTML",
        description: "Download the icon assets to your project's `/public` folder and copy the provided `<link>` tags into your site header.",
      },
    ],
    faqs: [
      {
        question: "What sizes are generated by this favicon generator?",
        answer: "The tool generates standard sizes: 16x16px (classic browser tab), 32x32px (retina tab & bookmarks), 48x48px (Windows desktop shortcut), 180x180px (Apple Touch Icon for iOS Safari), 192x192px (Android Chrome launcher), and 512x512px (PWA splash icon).",
      },
      {
        question: "Where should I place the generated favicon files in my project?",
        answer: "Place the downloaded icon files in your web project's root `public/` directory (for Next.js, Vite, Nuxt, Astro) or in your website root folder alongside `index.html`.",
      },
      {
        question: "What HTML tags do I need to include in my website <head>?",
        answer: "The tool automatically generates the exact HTML `<link rel='icon'>` and `<link rel='apple-touch-icon'>` tags. Simply click 'Copy HTML' and paste them into your `<head>` block.",
      },
      {
        question: "What source image format yields the highest quality?",
        answer: "A high-resolution PNG with a transparent background (at least 512x512 pixels) produces the cleanest, crispest results across both light and dark browser themes.",
      },
      {
        question: "Are my logo images stored or uploaded?",
        answer: "No. All icon rasterization and scaling take place purely inside your browser memory using HTML Canvas.",
      },
    ],
  },
  {
    slug: "meta-tag-generator",
    title: "Free SEO & Open Graph Meta Tag Generator Online",
    shortName: "Meta Tag Generator",
    description: "Generate SEO, Open Graph, and Twitter/X social media meta tags for your website with live search and social card previews.",
    category: "SEO & Marketing",
    iconName: "ri-share-forward-box-line",
    badge: "Live Preview",
    href: "/tools/meta-tag-generator",
    seo: {
      title: "Free Meta Tag Generator Online | SEO & Open Graph Tags | Vrushali Devlekar",
      description: "Generate SEO, Open Graph, and Twitter/X social media meta tags with live Google and social card previews. Production-ready HTML code in one click.",
      keywords: [
        "meta tag generator online",
        "open graph tags generator",
        "twitter card generator",
        "SEO meta tags generator",
        "HTML head tags tool",
        "social media meta preview",
      ],
      canonical: "https://vrushali-devlekar.vercel.app/tools/meta-tag-generator",
    },
    highlights: [
      "Generates Standard SEO, Open Graph (Facebook/LinkedIn), and Twitter/X Card tags",
      "Live Google Search snippet and social card preview simulator",
      "Character count counters with optimal length guidance",
      "Clean, formatted, production-ready HTML markup output",
    ],
    features: [
      {
        title: "Comprehensive Tag Support",
        description: "Generates title, description, canonical, robots, author, keywords, Open Graph (`og:title`, `og:image`, `og:url`), and Twitter Cards (`summary_large_image`).",
      },
      {
        title: "Interactive Social Card Simulator",
        description: "See exactly how your website link will appear when shared on X (Twitter), LinkedIn, iMessage, and Google Search results.",
      },
      {
        title: "SEO Best Practice Guidance",
        description: "Built-in character meters keep your page title under 60 characters and description under 160 characters to prevent SERP truncation.",
      },
      {
        title: "One-Click Copy",
        description: "Copy clean, formatted HTML tags directly into your clipboard with a single click.",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Enter Website Metadata",
        description: "Type your website title, description, canonical production URL, author name, and keywords.",
      },
      {
        step: 2,
        title: "Configure Social Share Data",
        description: "Provide Open Graph titles and the URL to your social preview banner image (1200x630px recommended).",
      },
      {
        step: 3,
        title: "Preview & Copy HTML",
        description: "Check the visual cards in the Google Search and Twitter card simulators, then click 'Copy HTML' to paste into your `<head>`.",
      },
    ],
    faqs: [
      {
        question: "What are Open Graph and Twitter Card meta tags?",
        answer: "Open Graph (OG) tags are metadata protocols developed by Facebook that allow any webpage to become a rich object in social graphs. Twitter Cards perform a similar role on X (Twitter). When users share your URL, social platforms read these tags to display rich image cards, titles, and summaries.",
      },
      {
        question: "Why are canonical URLs important for SEO?",
        answer: "A canonical URL (`<link rel='canonical' href='...'>`) tells search engines which URL represents the master copy of a page. This prevents duplicate content penalties when the same page is accessible via HTTP/HTTPS, www/non-www, or with query parameters.",
      },
      {
        question: "What is the recommended size for an Open Graph image?",
        answer: "The recommended dimensions for Open Graph and Twitter summary_large_image banners are 1200 x 630 pixels (1.91:1 aspect ratio), with a maximum file size under 5MB for fast crawler indexing.",
      },
      {
        question: "What are the optimal character lengths for SEO titles and descriptions?",
        answer: "SEO Titles should ideally be between 50 and 60 characters to avoid being cut off on Google results. Meta descriptions should be between 140 and 160 characters for maximum search snippet visibility.",
      },
      {
        question: "Where do I paste the generated HTML tags?",
        answer: "Paste the generated `<meta>` and `<link>` tags inside the `<head>...</head>` section of your HTML document, or inside Next.js metadata objects (`export const metadata = {...}`).",
      },
    ],
  },
  {
    slug: "file-beam",
    title: "File Beam — Zero-Cloud P2P File & Clipboard Transfer",
    shortName: "File Beam",
    description: "Transfer files and clipboard content between nearby devices directly from your browser without installing an app or uploading to the cloud.",
    category: "P2P Network Tool",
    iconName: "ri-send-plane-2-line",
    badge: "Zero-Cloud WebRTC",
    href: "/tools/file-beam",
    githubUrl: "https://github.com/miidaystudio/LAN-Courier",
    seo: {
      title: "File Beam — Zero-Cloud P2P File & Clipboard Transfer Online | Vrushali Devlekar",
      description: "Send files and clipboard text directly between nearby devices in your browser with zero cloud storage, WebRTC peer-to-peer connection, and end-to-end encryption.",
      keywords: [
        "file beam browser",
        "peer to peer file sharing web",
        "transfer files local network",
        "zero cloud file transfer",
        "WebRTC clipboard sharing",
        "browser to browser transfer",
      ],
      canonical: "https://vrushali-devlekar.vercel.app/tools/file-beam",
    },
    highlights: [
      "Zero Cloud Storage: Direct browser-to-browser WebRTC DataChannel streaming",
      "No Account Required: Instant session room codes and QR code pairing",
      "End-to-End Encrypted: Secret beam payload security with zero intermediary hops",
      "Cross-Platform: Works seamlessly across Windows, macOS, Linux, Android, and iOS",
    ],
    features: [
      {
        title: "Direct Peer-to-Peer Data Channels",
        description: "Bypasses external cloud storage servers by establishing a direct WebRTC DataChannel mesh between sending and receiving browser instances.",
      },
      {
        title: "Instant Room Pairing & QR Code",
        description: "Connect phones, laptops, and tablets in seconds using a 6-digit room code or camera QR code scan.",
      },
      {
        title: "Clipboard & File Beam Modes",
        description: "Beam arbitrary text, URLs, and multi-megabyte binary files with live progress tracking and checksum validation.",
      },
      {
        title: "100% Zero-Knowledge Privacy",
        description: "Your files never touch any database or centralized disk. Once the browser tab closes, the ephemeral peer connection ceases completely.",
      },
    ],
    instructions: [
      {
        step: 1,
        title: "Create or Join a Room",
        description: "Click 'Create Room' on your primary device to generate a 6-digit beam code, or enter a code to join an existing session.",
      },
      {
        step: 2,
        title: "Connect Peer Device",
        description: "On your nearby phone, tablet, or laptop, open File Beam and enter the room code to establish the direct WebRTC peer link.",
      },
      {
        step: 3,
        title: "Select Files or Paste Text",
        description: "Drag & drop files or type clipboard messages. The binary stream transfers directly device-to-device with live byte progress.",
      },
    ],
    faqs: [
      {
        question: "How does File Beam transfer files without cloud storage?",
        answer: "File Beam utilizes WebRTC (Web Real-Time Communication) DataChannels. After an ephemeral signaling handshake, data streams directly from the sender device's browser memory to the recipient's browser memory over the local network or direct peer route without passing through any cloud storage server.",
      },
      {
        question: "Do both devices need to be on the same local network?",
        answer: "While File Beam is optimized for high-speed local network (LAN) sharing, WebRTC ICE candidates and STUN protocols allow peer connections across different networks when direct routes are available.",
      },
      {
        question: "Are my files and clipboard data encrypted?",
        answer: "Yes. WebRTC connections mandate DTLS (Datagram Transport Layer Security) and SRTP encryption at the transport layer, ensuring end-to-end cryptographic confidentiality between peers.",
      },
      {
        question: "Do I need to install any app or create an account?",
        answer: "No. File Beam runs entirely inside any modern web browser (Chrome, Safari, Firefox, Edge). There are no native apps, browser extensions, or accounts required.",
      },
      {
        question: "What file sizes can be transferred?",
        answer: "Because files are chunked into binary streams directly between peer memories, you can transfer documents, photos, audio clips, and large videos smoothly without cloud quota restrictions.",
      },
    ],
  },
];

export const TOOLS_LIST = TOOLS;
export const FEATURED_TOOLS = TOOLS.slice(0, 4);

export function getToolBySlug(slug: string): ToolItem | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getRelatedTools(currentSlug: string, count: number = 3): ToolItem[] {
  return TOOLS.filter((tool) => tool.slug !== currentSlug).slice(0, count);
}
