import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Terminal, 
  ExternalLink, 
  Github, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Database, 
  Server, 
  Network, 
  Activity,
  Layers
} from "lucide-react";

type FilterTab = "ALL" | "REACT_WEB" | "LARAVEL_API" | "FLUTTER_MOBILE";

interface ArchitectureSpec {
  database_schema: string;
  architecture_pattern: string;
  api_endpoints: string[];
  performance_metrics: string;
  infrastructure: string[];
}

interface Project {
  id: string;
  numericId: string;
  title: string;
  categories: FilterTab[];
  branch: string;
  status: "PRODUCTION" | "ACTIVE_RELEASE" | "DEPLOYED";
  description: string;
  techStack: string[];
  codeUrl: string;
  demoUrl?: string;
  spec: ArchitectureSpec;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "proj_01",
    numericId: "PROJ_01",
    title: "E-Commerce Microservices Platform",
    categories: ["REACT_WEB"],
    branch: "main",
    status: "PRODUCTION",
    description:
      "High-throughput distributed commerce system with event-driven order processing, Redis caching layer, PCI-compliant Stripe checkout, and resilient inventory reservation.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "TailwindCSS", "Redis", "Docker"],
    codeUrl: "https://github.com/Nick-800",
    demoUrl: "https://github.com/Nick-800",
    spec: {
      architecture_pattern: "Event-Driven Microservices (API Gateway + Pub/Sub Worker)",
      database_schema: "PostgreSQL 16 (B-tree indexed orders, partitioned line_items, PgBouncer pool)",
      api_endpoints: [
        "POST /api/v1/auth/tokens (JWT + Refresh)",
        "GET  /api/v1/catalog/products?category=hardware",
        "POST /api/v1/checkout/session (Stripe intent)",
        "POST /api/v1/webhooks/stripe (Event dispatcher)"
      ],
      performance_metrics: "1,800 req/sec | p95 latency < 32ms | 99.98% SLA",
      infrastructure: ["Docker Compose", "Nginx Reverse Proxy", "Redis Cache", "RabbitMQ Queue"]
    }
  },
  {
    id: "proj_02",
    numericId: "PROJ_02",
    title: "Logistics & Fleet Tracking App",
    categories: ["FLUTTER_MOBILE", "LARAVEL_API"],
    branch: "main",
    status: "PRODUCTION",
    description:
      "Real-time telematics dispatch suite coordinating multi-vehicle fleet routing, sub-second GPS telemetry over WebSockets, and digital proof-of-delivery signatures.",
    techStack: ["Flutter", "Laravel", "MariaDB", "WebSocket", "Docker", "Redis"],
    codeUrl: "https://github.com/Nick-800",
    demoUrl: "https://github.com/Nick-800",
    spec: {
      architecture_pattern: "Hybrid RESTful Core + Swoole WebSocket Telemetry Daemon",
      database_schema: "MariaDB 10.11 with GIS Spatial indexing for coordinates & driver tracking",
      api_endpoints: [
        "WSS  /ws/v1/telemetry/drivers (Bidirectional <200ms)",
        "POST /api/v1/dispatch/routes/optimize (Dijkstra TSP)",
        "GET  /api/v1/fleet/status?zone=nordic",
        "POST /api/v1/deliveries/confirm-pod (Signature + Geo)"
      ],
      performance_metrics: "5,000 simultaneous telemetry sockets | Geo-fence query < 15ms",
      infrastructure: ["Laravel Horizon", "Redis Sentinel", "Docker Swarm", "Traefik SSL"]
    }
  },
  {
    id: "proj_03",
    numericId: "PROJ_03",
    title: "Enterprise CRM & Resource Portal",
    categories: ["LARAVEL_API", "REACT_WEB"],
    branch: "main",
    status: "PRODUCTION",
    description:
      "Multi-tenant corporate resource & client pipeline management platform supporting dynamic RBAC permission matrices, automated invoice queues, and compliance audit logs.",
    techStack: ["PHP Laravel", "React", "MySQL", "Redis", "TailwindCSS", "Docker"],
    codeUrl: "https://github.com/Nick-800",
    demoUrl: "https://github.com/Nick-800",
    spec: {
      architecture_pattern: "Multi-Tenant Modular Monolith with Decoupled React SPA Dashboard",
      database_schema: "MySQL 8.0 InnoDB Cluster with tenant-scoped schema isolation & audit triggers",
      api_endpoints: [
        "POST /api/v1/tenants/auth (OAuth2 PKCE)",
        "GET  /api/v1/crm/leads?status=negotiation",
        "POST /api/v1/invoices/batch-generate (Async worker)",
        "GET  /api/v1/audit/logs?range=30d"
      ],
      performance_metrics: "12,000+ daily ledger operations | Zero cross-tenant data leakage",
      infrastructure: ["Redis Queue Clusters", "AWS S3 Private Buckets", "Supervisor Workers"]
    }
  },
  {
    id: "proj_04",
    numericId: "PROJ_04",
    title: "Smart Delivery Mobile App",
    categories: ["FLUTTER_MOBILE"],
    branch: "main",
    status: "ACTIVE_RELEASE",
    description:
      "Cross-platform on-demand delivery customer application featuring smooth map route polylines, real-time courier geo-fencing, live push updates, and SMS OTP verification.",
    techStack: ["Flutter", "Dart", "Firebase", "Google Maps API", "FCM"],
    codeUrl: "https://github.com/Nick-800",
    demoUrl: "https://github.com/Nick-800",
    spec: {
      architecture_pattern: "Clean Architecture (BLoC State Pattern) + Offline-First Local Cache",
      database_schema: "Cloud Firestore NoSQL (Realtime listeners) + Local Hive key-value cache",
      api_endpoints: [
        "SDK  GoogleMaps.Directions.computeRouteMatrix()",
        "POST /functions/v1/verifyOtpAndAssignCourier",
        "POST /functions/v1/notifyPushOrderStateChange",
        "GET  /firestore/collections/orders/{id}/tracking"
      ],
      performance_metrics: "60 FPS rendering on mid-tier mobile | 99.6% crash-free sessions",
      infrastructure: ["Firebase Cloud Functions", "Google Cloud KMS", "Firebase FCM"]
    }
  },
  {
    id: "proj_05",
    numericId: "PROJ_05",
    title: "Cyberpunk CRT Portfolio",
    categories: ["REACT_WEB"],
    branch: "main",
    status: "DEPLOYED",
    description:
      "Immersive retro-futuristic CRT terminal developer portfolio featuring interactive bash shell CLI, live multi-theme color matrix switching, and scanline rendering.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    codeUrl: "https://github.com/Nick-800",
    demoUrl: "https://github.com/Nick-800",
    spec: {
      architecture_pattern: "Single-Page Application with Dynamic CSS Custom Properties Token Engine",
      database_schema: "Client-side state hydration + LocalStorage command history buffer",
      api_endpoints: [
        "CLIENT bash.execute('theme amber | cyan | rose | green')",
        "CLIENT terminal.history.push({ command, timestamp })",
        "CLIENT audioSynthesizer.beep({ frequency: 800Hz })",
        "CLIENT window.performance.navigationTiming()"
      ],
      performance_metrics: "100/100 Lighthouse Performance | <100ms FCP | 0 bundle runtime lag",
      infrastructure: ["Vite SWC Builder", "Vercel Edge CDN", "Tailwind JIT Compiler"]
    }
  },
  {
    id: "proj_06",
    numericId: "PROJ_06",
    title: "AI Knowledge & Query Engine",
    categories: ["REACT_WEB"],
    branch: "main",
    status: "ACTIVE_RELEASE",
    description:
      "Retrieval-Augmented Generation (RAG) platform indexing technical manuals and codebases with semantic vector embeddings and low-latency streaming terminal responses.",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Vector DB", "TailwindCSS"],
    codeUrl: "https://github.com/Nick-800",
    demoUrl: "https://github.com/Nick-800",
    spec: {
      architecture_pattern: "Serverless Vector RAG Pipeline with Edge SSE Stream Delivery",
      database_schema: "Vector DB (1536-dim cosine similarity index) + Metadata document store",
      api_endpoints: [
        "POST /api/v1/documents/embed (Recursive text chunking)",
        "POST /api/v1/query/stream (SSE token-by-token)",
        "GET  /api/v1/analytics/queries?topK=50",
        "POST /api/v1/feedback/relevance (RLHF logging)"
      ],
      performance_metrics: "Time-to-first-token < 115ms | 94.8% retrieval precision",
      infrastructure: ["Vercel Edge Functions", "Pinecone Vector Store", "OpenAI Embeddings"]
    }
  }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL");
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: "ALL", label: "[ALL]" },
    { key: "REACT_WEB", label: "[REACT_WEB]" },
    { key: "LARAVEL_API", label: "[LARAVEL_API]" },
    { key: "FLUTTER_MOBILE", label: "[FLUTTER_MOBILE]" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === "ALL") return true;
    return project.categories.includes(activeFilter);
  });

  const toggleSpec = (id: string) => {
    setExpandedSpecs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="projects" className="py-20 px-4 relative">
      {/* Background Matrix Pattern */}
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

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <pre className="text-primary text-xs md:text-sm inline-block">
{`
╔═══════════════════════════════════════════════════════════╗
║                  DEPLOYED_PROJECTS.DB                     ║
╚═══════════════════════════════════════════════════════════╝
`}
          </pre>
          <p className="text-muted-foreground font-mono text-sm">
            [SCAN] QUERYING REPOSITORIES & DEPLOYMENTS... FOUND {PROJECTS_DATA.length} MODULES
          </p>
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono">
          <div className="p-1 border-2 border-primary/30 bg-black/60 flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.key;
              const count =
                tab.key === "ALL"
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.categories.includes(tab.key)).length;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-3 py-1.5 text-xs transition-all border ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                      : "bg-transparent text-foreground/80 border-transparent hover:border-primary/50 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {isActive && <span className="mr-1">&gt;</span>}
                  {tab.label} <span className="opacity-70 text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isSpecOpen = !!expandedSpecs[project.id];

            return (
              <div
                key={project.id}
                className="border-2 border-primary/30 bg-black/60 flex flex-col justify-between card-hover hover:border-primary transition-all duration-300 relative group"
              >
                {/* Window Terminal Header */}
                <div className="bg-primary/10 border-b-2 border-primary/30 px-4 py-2.5 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-primary font-bold shrink-0">[{project.numericId}]</span>
                    <span className="text-foreground/90 font-medium truncate">{project.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2 text-primary/70 shrink-0">
                    <span className="hover:text-primary transition-colors cursor-default text-xs">◼</span>
                    <span className="hover:text-primary transition-colors cursor-default text-xs">◻</span>
                    <span className="hover:text-primary transition-colors cursor-default text-xs">✕</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 font-mono flex-1">
                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="border border-primary/40 px-2 py-0.5 text-primary bg-primary/5">
                      [STATUS: {project.status}]
                    </span>
                    <span className="border border-border px-2 py-0.5 text-muted-foreground bg-muted/20">
                      [BRANCH: {project.branch}]
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/90 leading-relaxed font-mono">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Layers className="h-3 w-3 text-primary" />
                      <span>STACK_COMPONENTS:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border border-primary/30 text-primary text-[11px] font-mono hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_8px_hsl(var(--primary)/0.4)] transition-all cursor-default"
                        >
                          [{tech}]
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Architecture Spec Drawer */}
                  {isSpecOpen && (
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-primary/30 bg-black/90 p-3 space-y-3 text-xs animate-in fade-in-50 duration-200">
                      <div className="flex items-center justify-between text-primary pb-1.5 border-b border-primary/20">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Cpu className="h-3.5 w-3.5" />
                          $ cat spec.json
                        </span>
                        <span className="text-[10px] text-muted-foreground">[READ_ONLY]</span>
                      </div>

                      {/* Pattern */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-primary text-[11px]">
                          <Server className="h-3 w-3" />
                          <span className="font-semibold">ARCHITECTURE_PATTERN:</span>
                        </div>
                        <p className="pl-4 text-foreground/80 text-[11px]">{project.spec.architecture_pattern}</p>
                      </div>

                      {/* DB Schema */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-primary text-[11px]">
                          <Database className="h-3 w-3" />
                          <span className="font-semibold">DATABASE_SCHEMA:</span>
                        </div>
                        <p className="pl-4 text-foreground/80 text-[11px]">{project.spec.database_schema}</p>
                      </div>

                      {/* Endpoints */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-primary text-[11px]">
                          <Network className="h-3 w-3" />
                          <span className="font-semibold">KEY_API_ENDPOINTS:</span>
                        </div>
                        <div className="pl-4 space-y-0.5">
                          {project.spec.api_endpoints.map((ep, idx) => (
                            <div key={idx} className="text-muted-foreground font-mono text-[10px] hover:text-primary transition-colors">
                              &gt; {ep}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-primary text-[11px]">
                          <Activity className="h-3 w-3" />
                          <span className="font-semibold">METRICS_&_SLA:</span>
                        </div>
                        <p className="pl-4 text-foreground/80 text-[11px]">{project.spec.performance_metrics}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="border-t-2 border-primary/30 p-3 bg-black/40 flex flex-wrap items-center justify-between gap-2 font-mono">
                  {/* Inspect Architecture Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSpec(project.id)}
                    className="text-xs text-primary hover:text-primary hover:bg-primary/10 border border-primary/40 hover:border-primary font-mono h-8 px-2.5"
                  >
                    <span className="mr-1">$</span>
                    cat spec.json
                    {isSpecOpen ? (
                      <ChevronUp className="h-3.5 w-3.5 ml-1.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                    )}
                  </Button>

                  <div className="flex items-center gap-2">
                    {/* View Code */}
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border border-primary/40 text-foreground hover:text-primary hover:border-primary hover:bg-primary/10 font-mono text-xs h-8 px-2.5"
                    >
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        <Github className="h-3.5 w-3.5 text-primary" />
                        <span>[VIEW_CODE]</span>
                      </a>
                    </Button>

                    {/* Live Demo */}
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs h-8 px-2.5 shadow-[0_0_10px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_15px_hsl(var(--primary)/0.6)]"
                    >
                      <a
                        href={project.demoUrl || project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        <span>[LIVE_DEMO]</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom System Status Line */}
        <div className="mt-12 border border-primary/30 p-3 bg-black/50 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-primary">&gt;&gt;</span>
            <span>SHOWCASE_QUERY: STATUS_OK</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-foreground/80">{filteredProjects.length} REPOSITORIES MOUNTED</span>
          </div>
          <a
            href="https://github.com/Nick-800"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:glow-terminal flex items-center gap-1 transition-all"
          >
            <span>[GITHUB_PROFILE]</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
