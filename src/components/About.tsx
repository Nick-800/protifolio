import { Code2, Rocket, Users } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "CLEAN_CODE",
      description: "Writing maintainable, scalable code following best practices"
    },
    {
      icon: Rocket,
      title: "FAST_DELIVERY",
      description: "Efficient development workflow with modern tools"
    },
    {
      icon: Users,
      title: "COLLABORATION",
      description: "Strong team player with excellent communication skills"
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* ASCII Header */}
        <div className="text-center mb-16 space-y-4">
          <pre className="text-primary text-xs md:text-sm inline-block">
{`
╔═══════════════════════════════════════════════════════════╗
║                       ABOUT_ME.TXT                        ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono">
            [INFO] LOADING USER PROFILE...
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <div className="border-2 border-primary/30 p-6 bg-black/50">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-2 text-primary pb-2 border-b border-primary/30">
                <span>&gt;&gt;</span>
                <span>PROFILE.DESCRIPTION</span>
              </div>
              
              <div className="pl-4 space-y-4">
                <p className="leading-relaxed text-foreground">
                  <span className="text-primary">[1]</span> I'm a full-stack developer with a passion for building beautiful, 
                  functional web applications. With expertise in modern JavaScript 
                  frameworks and a keen eye for design, I bring ideas to life.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  <span className="text-primary">[2]</span> When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open-source projects, or sharing knowledge with 
                  the developer community.
                </p>
                
                <div className="pt-4 border-t border-primary/30">
                  <span className="text-primary">[STATUS]</span>
                  <span className="text-foreground ml-2">AVAILABLE_FOR_HIRE ✓</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Highlights Section */}
          <div className="space-y-4">
            {highlights.map((item, index) => (
              <div 
                key={item.title}
                className="border-2 border-border hover:border-primary transition-all card-hover p-4 bg-black/50"
              >
                <div className="flex gap-4 font-mono">
                  <div className="flex-shrink-0">
                    <div className="border border-primary p-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-xs">[{index + 1}]</span>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* ASCII Footer */}
        <div className="mt-12 text-center">
          <pre className="text-primary/50 text-xs inline-block">
{`─────────────────────────────────────────────────────────────`}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default About;
