import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "[SUCCESS] Message transmitted",
      description: "Thank you for reaching out. Response incoming soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "EMAIL_ADDRESS",
      value: "sohaibkamash@gmail.com",
      href: "mailto:sohaibkamash@gmail.com"
    },
    {
      icon: Phone,
      label: "PHONE_NUMBER",
      value: "+218 948890001",
      href: "tel:+218948890001"
    },
    {
      icon: MapPin,
      label: "LOCATION_DATA",
      value: "Benghazi, LIBYA",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, hsl(var(--border)) 0px, transparent 1px, transparent 10px),
            repeating-linear-gradient(90deg, hsl(var(--border)) 0px, transparent 1px, transparent 10px)
          `,
        }} />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ASCII Header */}
        <div className="text-center mb-16 space-y-4">
          <pre className="text-primary text-xs md:text-sm inline-block">
{`
╔═══════════════════════════════════════════════════════════╗
║                    CONTACT.PROTOCOL                       ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono text-sm">
            [INIT] ESTABLISHING CONNECTION...
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="border-2 border-primary/30 p-6 bg-black/50 font-mono">
              <div className="flex items-center gap-2 text-primary mb-4 pb-2 border-b border-primary/30">
                <span>&gt;&gt;</span>
                <h3 className="text-lg font-bold">TRANSMISSION_REQUEST</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>
            
            <div className="space-y-3">
              {contactInfo.map((item, idx) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block border-2 border-border hover:border-primary transition-all card-hover bg-black/50"
                >
                  <div className="flex items-center gap-4 p-4 font-mono">
                    <div className="border border-primary p-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-primary text-xs">[{idx + 1}]</span>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                      <p className="text-sm text-foreground">{item.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="border-2 border-primary/30 bg-black/50 p-6">
            <div className="flex items-center gap-2 text-primary mb-6 pb-3 border-b border-primary/30 font-mono">
              <span>&gt;</span>
              <span className="text-sm">MESSAGE_FORM.SH</span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span>INPUT_NAME</span>
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-black border-2 border-border focus:border-primary font-mono text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span>INPUT_EMAIL</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-black border-2 border-border focus:border-primary font-mono text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">$</span>
                  <span>INPUT_MESSAGE</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="bg-black border-2 border-border focus:border-primary font-mono text-sm resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg"
                className="w-full border-2 border-primary bg-transparent hover:bg-primary hover:text-black text-primary font-mono hover:glow-terminal"
              >
                [TRANSMIT_MESSAGE]
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-primary/30">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <span className="text-primary">&gt;</span>
                <span>AWAITING_INPUT</span>
                <span className="cursor-blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
