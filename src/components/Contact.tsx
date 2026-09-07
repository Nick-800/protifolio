import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  FileDown,
  ExternalLink,
  Linkedin,
  Github,
  Loader2,
  Terminal,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/lib/audio";
import { downloadResume } from "@/lib/resume";

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { playKeyClick, playTerminalBeep } = useAudio();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isTransmitting, setIsTransmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    playTerminalBeep();
    navigator.clipboard.writeText("sohaibkamash@gmail.com");
    setCopiedEmail(true);
    toast({
      title: "[SUCCESS] Email copied to clipboard",
      description: "sohaibkamash@gmail.com is buffered in memory.",
    });
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
  };

  const handleDownloadCV = () => {
    playTerminalBeep();
    downloadResume();
    toast({
      title: "[TRANSMISSION_COMPLETE] CV Transferred",
      description: "Sohaib_Kamash_CV.txt downloaded successfully.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTransmitting) return;

    setIsTransmitting(true);
    playKeyClick();

    // Simulate realistic transmission packet latency (800ms)
    setTimeout(() => {
      playTerminalBeep();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoUrl = `mailto:sohaibkamash@gmail.com?subject=${subject}&body=${body}`;

      // Open mail client
      try {
        window.location.href = mailtoUrl;
      } catch {
        // Fallback: copy draft
        navigator.clipboard.writeText(`To: sohaibkamash@gmail.com\n${formData.message}`);
      }

      toast({
        title: "[SUCCESS] Message transmitted",
        description:
          "Packet stream delivered to gateway. Response incoming soon.",
      });

      setFormData({ name: "", email: "", message: "" });
      setIsTransmitting(false);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            repeating-linear-gradient(0deg, hsl(var(--border)) 0px, transparent 1px, transparent 10px),
            repeating-linear-gradient(90deg, hsl(var(--border)) 0px, transparent 1px, transparent 10px)
          `,
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ASCII Header */}
        <div className="text-center mb-16 space-y-4">
          <pre className="text-primary text-xs md:text-sm inline-block select-none">
            {`
╔═══════════════════════════════════════════════════════════╗
║                    CONTACT.PROTOCOL                       ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono text-sm">
            [INIT] SECURE CARRIER STREAM ESTABLISHED // AWAITING DISPATCH
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Column: Contact Channels & Credentials */}
          <div className="space-y-6">
            {/* Mission Statement Card */}
            <div className="border-2 border-primary/30 p-6 bg-black/60 font-mono shadow-lg">
              <div className="flex items-center gap-2 text-primary mb-3 pb-2 border-b border-primary/30">
                <span>&gt;&gt;</span>
                <h3 className="text-base sm:text-lg font-bold">TRANSMISSION_REQUEST</h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Available for full-stack engineering contracts, distributed backend architecture,
                mobile telematics apps, or high-impact technical advisory roles. Send a ping or
                transmit packets below.
              </p>
            </div>

            {/* Contact Channels List */}
            <div className="space-y-3 font-mono">
              {/* Email Card with One-Click Copy */}
              <div className="border-2 border-border hover:border-primary transition-all bg-black/60 p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="border border-primary p-3 bg-primary/5">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary text-xs">[1]</span>
                      <p className="text-xs text-muted-foreground">EMAIL_ADDRESS</p>
                    </div>
                    <a
                      href="mailto:sohaibkamash@gmail.com"
                      onClick={() => playKeyClick()}
                      className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors truncate block"
                    >
                      sohaibkamash@gmail.com
                    </a>
                  </div>
                </div>

                {/* One-click Copy Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="h-8 px-2.5 border border-primary/40 hover:border-primary text-primary hover:bg-primary/15 font-mono text-xs flex items-center gap-1.5 shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span className="font-bold text-primary">[COPIED!]</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">[COPY]</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Phone Card */}
              <a
                href="tel:+218948890001"
                onClick={() => playKeyClick()}
                className="block border-2 border-border hover:border-primary transition-all bg-black/60 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="border border-primary p-3 bg-primary/5">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary text-xs">[2]</span>
                      <p className="text-xs text-muted-foreground">PHONE_NUMBER</p>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground">+218 948890001</p>
                  </div>
                </div>
              </a>

              {/* Location Card with Google Maps */}
              <a
                href="https://maps.google.com/?q=Benghazi,+Libya"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playKeyClick()}
                className="block border-2 border-border hover:border-primary transition-all bg-black/60 p-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="border border-primary p-3 bg-primary/5">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-primary text-xs">[3]</span>
                        <p className="text-xs text-muted-foreground">LOCATION_COORDINATES</p>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground">Benghazi, LIBYA</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mr-1" />
                </div>
              </a>
            </div>

            {/* Transmission Card: Download Resume (CV) */}
            <div className="border-2 border-primary/50 bg-black/70 p-5 font-mono relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-primary text-black text-[10px] font-bold tracking-wider">
                DOCUMENTATION
              </div>
              <div className="flex items-start gap-4 mb-4">
                <div className="border border-primary p-3 bg-primary/10">
                  <FileDown className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    RESUME_CREDENTIALS.TXT
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Curriculum vitae covering 5+ years architecture, enterprise case studies, and
                    full-stack telemetry.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  onClick={handleDownloadCV}
                  type="button"
                  className="w-full sm:w-auto flex-1 border-2 border-primary bg-primary/10 hover:bg-primary hover:text-black text-primary font-mono text-xs flex items-center justify-center gap-2 h-9"
                >
                  <FileDown className="h-4 w-4" />
                  <span>[DOWNLOAD_RESUME_CV]</span>
                </Button>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
                  <a
                    href="https://linkedin.com/in/sohaib-kamash"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playKeyClick()}
                    className="p-2 border border-primary/40 hover:border-primary text-muted-foreground hover:text-primary transition-all bg-black/50"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/Nick-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playKeyClick()}
                    className="p-2 border border-primary/40 hover:border-primary text-muted-foreground hover:text-primary transition-all bg-black/50"
                    title="GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="border-2 border-primary/30 bg-black/60 p-6 font-mono shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-primary/30">
                <div className="flex items-center gap-2 text-primary">
                  <Terminal className="h-4 w-4" />
                  <span className="text-sm font-bold">MESSAGE_FORM.SH</span>
                </div>
                <span className="text-[11px] text-muted-foreground">PORT: 443 // TLS</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-primary font-bold">$</span>
                    <span>INPUT_NAME</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name..."
                    value={formData.name}
                    onChange={(e) => {
                      playKeyClick();
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    disabled={isTransmitting}
                    required
                    className="bg-black/80 border-2 border-border focus:border-primary font-mono text-sm disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-primary font-bold">$</span>
                    <span>INPUT_EMAIL</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@domain.com"
                    value={formData.email}
                    onChange={(e) => {
                      playKeyClick();
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    disabled={isTransmitting}
                    required
                    className="bg-black/80 border-2 border-border focus:border-primary font-mono text-sm disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs text-muted-foreground flex items-center gap-2"
                  >
                    <span className="text-primary font-bold">$</span>
                    <span>INPUT_MESSAGE</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Describe project specifications, timeline, or inquiries..."
                    value={formData.message}
                    onChange={(e) => {
                      playKeyClick();
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    disabled={isTransmitting}
                    required
                    rows={5}
                    className="bg-black/80 border-2 border-border focus:border-primary font-mono text-sm resize-none disabled:opacity-50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isTransmitting}
                  className="w-full border-2 border-primary bg-transparent hover:bg-primary hover:text-black text-primary font-mono hover:glow-terminal transition-all h-11 disabled:cursor-not-allowed"
                >
                  {isTransmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span>[TRANSMITTING_PACKETS...]</span>
                    </span>
                  ) : (
                    <span>[TRANSMIT_MESSAGE]</span>
                  )}
                </Button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-primary/30 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-primary">&gt;</span>
                <span>{isTransmitting ? "STREAM_ACTIVE" : "AWAITING_INPUT"}</span>
                <span className="cursor-blink">_</span>
              </div>
              <span className="text-[10px] text-primary/70">[ENC: AES-256]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
