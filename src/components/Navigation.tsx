import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b-2 border-primary/50 glow-terminal" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 text-primary hover:glow-terminal transition-all"
          >
            <Terminal className="h-5 w-5" />
            <span className="text-lg font-bold">&gt; DEV_PORTFOLIO</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 border border-primary/30 p-1 bg-black/50">
            {navItems.map((item, idx) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="text-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/50 font-mono text-xs px-3"
              >
                [{idx + 1}] {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden border-2 border-primary/50 hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-primary" />
            ) : (
              <Menu className="h-5 w-5 text-primary" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t-2 border-primary/30 bg-black/95">
            {navItems.map((item, idx) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/50 font-mono text-sm"
              >
                <span className="text-primary mr-2">&gt;</span>
                [{idx + 1}] {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {/* Status Indicator */}
      {isScrolled && (
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
    </nav>
  );
};

export default Navigation;
