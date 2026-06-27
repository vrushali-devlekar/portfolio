export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t border-border bg-card/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vrushali Devlekar. All rights reserved.
      </p>
      <div className="flex items-center gap-4 text-muted-foreground">
        <a
          href="https://github.com/vrushali-devlekar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="GitHub Profile"
        >
          <i className="ri-github-line text-lg"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/vrushali-devlekar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="LinkedIn Profile"
        >
          <i className="ri-linkedin-line text-lg"></i>
        </a>
        <a
          href="https://x.com/vrushali_i"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          aria-label="X (Twitter) Profile"
        >
          <i className="ri-twitter-x-line text-lg"></i>
        </a>
      </div>
    </footer>
  );
}
