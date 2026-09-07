import { useState } from "react";
import { GitCommit, GitBranch, GitMerge, CheckCircle2, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimelineEntry {
  hash: string;
  branch: string;
  tag?: string;
  timestamp: string;
  role: string;
  entity: string;
  type: "WORK" | "EDUCATION" | "FREELANCE";
  summary: string;
  achievements: string[];
  stack: string[];
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    hash: "commit a4f91c2",
    branch: "origin/production",
    tag: "v3.2.0-prod",
    timestamp: "2024 - PRESENT",
    role: "Senior Full-Stack Engineer / Cloud Architect",
    entity: "Independent Contractor & Client Solutions",
    type: "FREELANCE",
    summary:
      "Directing architecture and implementation of scalable web APIs, real-time WebSocket infrastructure, and cross-platform mobile products for high-throughput enterprise systems.",
    achievements: [
      "Architected distributed microservices handling 1,800+ req/sec with sub-35ms p95 latency and automated failover.",
      "Engineered real-time fleet telematics daemon using Swoole and Laravel WebSockets supporting 5,000+ concurrent driver streams.",
      "Constructed PCI-compliant Stripe payment automation pipelines with idempotent webhook ingestion and financial auditing."
    ],
    stack: ["React", "TypeScript", "PHP Laravel", "Flutter", "PostgreSQL", "Redis", "Docker", "AWS"]
  },
  {
    hash: "commit c4d97f2",
    branch: "origin/career",
    tag: "v2.1.0-release",
    timestamp: "2022 - 2024",
    role: "Full-Stack Web & Mobile Developer",
    entity: "Tech Solutions & Agency Client Delivery",
    type: "WORK",
    summary:
      "Delivered end-to-end full-stack web platforms and cross-platform Flutter applications from concept to production deployment.",
    achievements: [
      "Built multi-tenant ERP & CRM platform featuring custom RBAC matrices and automated background PDF invoice generation.",
      "Shipped cross-platform Flutter delivery app with live GPS tracking, smooth route polyline drawing, and real-time push alerts.",
      "Optimized complex relational queries in MySQL/MariaDB with spatial indexing, cutting p99 query latency by 45%."
    ],
    stack: ["Flutter", "Dart", "Laravel", "React", "MySQL", "MariaDB", "TailwindCSS", "Firebase"]
  },
  {
    hash: "commit 9b3a0e1",
    branch: "origin/feat/apis",
    tag: "v1.0.4-stable",
    timestamp: "2020 - 2022",
    role: "Software Developer & API Integrator",
    entity: "Commercial Software & Enterprise Integrations",
    type: "WORK",
    summary:
      "Developed and maintained RESTful APIs, core database migrations, client dashboards, and third-party payment system integrations.",
    achievements: [
      "Designed secure REST APIs handling user authentication, order processing, and payment gateway webhooks.",
      "Maintained automated database migration workflows, seeding routines, and unit/feature integration test suites.",
      "Collaborated closely with cross-functional product stakeholders to convert operational requirements into reliable software."
    ],
    stack: ["PHP", "JavaScript", "MySQL", "REST APIs", "Git", "Linux", "TailwindCSS"]
  },
  {
    hash: "commit 1a04d5e",
    branch: "origin/init",
    tag: "v0.0.1-init",
    timestamp: "2018 - 2022",
    role: "B.Sc. in Computer Science / Software Engineering",
    entity: "Technical Education & Computer Science Foundations",
    type: "EDUCATION",
    summary:
      "Comprehensive academic foundation in software engineering, operating systems, distributed architectures, and algorithmic problem solving.",
    achievements: [
      "In-depth studies in Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, and Computer Networks.",
      "Capstone Project: Designed and implemented a real-time distributed management system with relational data persistence and role-based security.",
      "Graduated with honors, focusing on software design patterns, clean code principles, and Unix system programming."
    ],
    stack: ["Algorithms", "Data Structures", "OOP", "C++", "Java", "SQL", "Unix/Linux"]
  }
];

const Timeline = () => {
  const [filter, setFilter] = useState<"ALL" | "WORK" | "EDUCATION">("ALL");

  const filteredData = TIMELINE_DATA.filter((entry) => {
    if (filter === "ALL") return true;
    if (filter === "WORK") return entry.type === "WORK" || entry.type === "FREELANCE";
    if (filter === "EDUCATION") return entry.type === "EDUCATION";
    return true;
  });

  return (
    <section id="timeline" className="py-20 px-4 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <pre className="text-primary text-xs md:text-sm inline-block">
{`
╔═══════════════════════════════════════════════════════════╗
║                 SYSTEM_BOOT.LOG / GIT_HISTORY             ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono text-sm">
            [EXEC] git log --graph --all --decorate --date=relative --oneline
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-12 font-mono">
          <div className="p-1 border-2 border-primary/30 bg-black/60 flex gap-2">
            {[
              { key: "ALL", label: "[ALL_LOGS]" },
              { key: "WORK", label: "[EXPERIENCE]" },
              { key: "EDUCATION", label: "[EDUCATION]" },
            ].map((tab) => {
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as typeof filter)}
                  className={`px-3 py-1.5 text-xs transition-all border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                      : "bg-transparent text-foreground/80 border-transparent hover:border-primary/50 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {isActive && <span className="mr-1">&gt;</span>}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Git Log Stream Container */}
        <div className="relative border-2 border-primary/30 bg-black/60 p-6 md:p-8 font-mono">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-primary/30 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <span className="text-primary font-bold">BRANCH: origin/career</span>
              <span className="hidden sm:inline text-border">|</span>
              <span className="hidden sm:inline">COMMITS: {TIMELINE_DATA.length} COMMITTED TO MAIN</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="cursor-blink">&gt;_</span>
              <span>LIVE_STREAM</span>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="relative space-y-10 before:absolute before:inset-0 before:left-3 md:before:left-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-primary/20">
            {filteredData.map((item) => (
              <div key={item.hash} className="relative pl-8 md:pl-12 group">
                {/* Node Marker */}
                <div className="absolute left-1.5 md:left-3.5 -translate-x-1/2 top-1.5 h-3.5 w-3.5 rounded-none border-2 border-primary bg-black group-hover:bg-primary group-hover:shadow-[0_0_12px_hsl(var(--primary))] transition-all duration-300 flex items-center justify-center">
                  <div className="h-1 w-1 bg-primary group-hover:bg-black" />
                </div>

                {/* Commit Box Container */}
                <div className="border border-border group-hover:border-primary bg-black/40 group-hover:bg-black/80 transition-all duration-200 p-5 space-y-4 shadow-sm hover:shadow-[0_0_15px_hsl(var(--primary)/0.25)]">
                  {/* Git Commit Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-primary/20 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-primary font-bold flex items-center gap-1">
                        <GitCommit className="h-3.5 w-3.5" />
                        {item.hash}
                      </span>
                      <span className="text-muted-foreground">({item.branch})</span>
                      {item.tag && (
                        <span className="border border-primary/50 px-1.5 py-0.2 text-[10px] text-primary bg-primary/10">
                          tag: {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span>{item.timestamp}</span>
                    </div>
                  </div>

                  {/* Role and Entity */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base md:text-lg">
                      {item.type === "EDUCATION" ? (
                        <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-primary shrink-0" />
                      )}
                      <span className="text-primary">&gt;</span>
                      <span>{item.role}</span>
                    </div>
                    <div className="text-sm text-primary/80 font-medium pl-6">
                      @ {item.entity}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed pl-6">
                    {item.summary}
                  </p>

                  {/* Achievements List */}
                  <div className="pl-6 space-y-1.5 pt-1">
                    <div className="text-[11px] text-muted-foreground">KEY_ACHIEVEMENTS:</div>
                    <ul className="space-y-1.5">
                      {item.achievements.map((ach, i) => (
                        <li key={i} className="text-xs text-foreground/90 flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Badges */}
                  <div className="pl-6 pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground mr-1">COMMIT_ARTIFACTS:</span>
                    {item.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-[10px] border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Git Log Footer Status */}
          <div className="mt-8 pt-4 border-t border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <GitMerge className="h-3.5 w-3.5 text-primary" />
              <span>HEAD: detached at origin/production | Tree clean</span>
            </div>
            <div className="text-primary">
              [✓] LOG_RECORDS_VERIFIED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
