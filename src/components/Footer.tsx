import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t-2 border-primary/30 bg-black/50 font-mono">
      <div className="container mx-auto max-w-6xl">
        {/* ASCII Decoration */}
        <div className="text-center mb-6">
          <pre className="text-primary/30 text-xs inline-block">
{`════════════════════════════════════════════════════════════`}
          </pre>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="space-y-2 text-center md:text-left">
            <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
              <span className="text-primary">&gt;</span>
              <span>© {currentYear} SOHAIB_KAMASH | ALL_RIGHTS_RESERVED</span>
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
              <span className="text-primary">$</span>
              <span>BUILD_VERSION: 1.0.0 | STATUS: ONLINE</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/Nick-800"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-border hover:border-primary transition-all hover:glow-terminal bg-black/50"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-primary" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-border hover:border-primary transition-all hover:glow-terminal bg-black/50"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-primary" />
            </a>
            <a
              href="mailto:sohaibkamash@gmail.com"
              className="p-3 border-2 border-border hover:border-primary transition-all hover:glow-terminal bg-black/50"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-primary" />
            </a>
          </div>
        </div>
        
        {/* Footer Status */}
        <div className="mt-6 pt-4 border-t border-primary/30">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="text-primary">●</span>
            <span>SYSTEM_OPERATIONAL</span>
            <span className="text-primary">|</span>
            <span>UPTIME: ∞</span>
            <span className="text-primary">|</span>
            <span className="text-primary cursor-blink">_</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
