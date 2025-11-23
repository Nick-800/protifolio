import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "FRONTEND",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"]
    },
    {
      title: "BACKEND",
      skills: ["PHP Laravel", "Node.js", "MySQL", "MariaDB", "GraphQL"]
    },
    {
      title: "TOOLS_&_OTHERS",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Figma"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 relative">
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
║                    TECH_STACK.CONFIG                      ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono text-sm">
            [SCAN] ANALYZING SKILL_SET...
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div 
              key={category.title}
              className="border-2 border-primary/30 bg-black/50 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-primary/10 border-b-2 border-primary/30 p-4">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-primary">[{idx + 1}]</span>
                  <h3 className="text-lg font-bold text-primary">{category.title}</h3>
                </div>
              </div>
              
              {/* Skills List */}
              <div className="p-4 space-y-2">
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skill}
                    className="border border-border hover:border-primary transition-all p-2 font-mono text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-primary">&gt;</span>
                      <span className="text-foreground">{skill}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-1 flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 flex-1 ${
                            i < (10 - skillIdx) ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="border-t-2 border-primary/30 p-2 bg-black/30">
                <span className="text-xs text-muted-foreground font-mono">
                  [{category.skills.length} SKILLS LOADED]
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Status Bar */}
        <div className="mt-12 border border-primary/30 p-3 bg-black/50 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">SCAN_COMPLETE</span>
            <span className="text-primary">[✓] ALL_SYSTEMS_OPERATIONAL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
