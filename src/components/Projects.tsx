import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "E-COMMERCE_PLATFORM",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "TASK_MANAGEMENT_APP",
      description: "Collaborative project management tool with real-time updates, team collaboration features.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "AI_CHAT_ASSISTANT",
      description: "Intelligent chatbot powered by GPT-4, with custom training and conversation memory.",
      tech: ["React", "OpenAI", "Firebase", "Material-UI"],
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "POSTING_PLATFORMs",
      description: "SaaS platform for creating beautiful portfolio websites with drag-and-drop interface.",
      tech: ["Vue.js", "Express", "MongoDB", "AWS"],
      github: "https://github.com",
      live: "https://example.com"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* ASCII Header */}
        <div className="text-center mb-16 space-y-4">
          <pre className="text-primary text-xs md:text-sm inline-block">
{`
╔═══════════════════════════════════════════════════════════╗
║                   PROJECTS.DIRECTORY                      ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono text-sm">
            [FETCH] LOADING PROJECT FILES...
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={project.title}
              className="border-2 border-primary/30 bg-black/50 hover:border-primary transition-all card-hover overflow-hidden"
            >
              {/* Project Header */}
              <div className="bg-primary/10 border-b-2 border-primary/30 p-3 font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">[{(idx + 1).toString().padStart(2, '0')}]</span>
                    <span className="text-sm text-foreground">{project.title}</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-xs text-primary">◼</span>
                    <span className="text-xs text-primary">◻</span>
                    <span className="text-xs text-primary">✕</span>
                  </div>
                </div>
              </div>
              
              {/* ASCII Decoration */}
              <div className="bg-black/30 p-4 border-b border-primary/20 font-mono text-xs text-primary">
                <pre>
{`┌─────────────────────────────────────┐
│  PROJECT_EXECUTABLE                 │
└─────────────────────────────────────┘`}
                </pre>
              </div>
              
              {/* Project Content */}
              <div className="p-6 space-y-4 font-mono">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-primary">&gt;</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                {/* Tech Stack */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary text-xs">
                    <span>$</span>
                    <span>cat STACK.TXT</span>
                  </div>
                  <div className="pl-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs border border-border text-muted-foreground bg-black/50"
                      >
                        [{tech}]
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="pt-4 border-t border-primary/20 space-y-2">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 border-2 border-border hover:border-primary bg-transparent font-mono text-xs"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-2" />
                        [VIEW_CODE]
                      </a>
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 border-2 border-primary bg-transparent hover:bg-primary hover:text-black text-primary font-mono text-xs"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-2" />
                        [LIVE_DEMO]
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Footer Status */}
              <div className="border-t-2 border-primary/30 bg-black/30 p-2 font-mono text-xs text-muted-foreground">
                [STATUS: DEPLOYED] [UPTIME: 99.9%]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
