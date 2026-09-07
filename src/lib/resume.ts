/**
 * Resume CV text content and download utility.
 */

export const RESUME_TEXT = `================================================================================
SOHAIB KAMASH - SENIOR FULL-STACK ARCHITECT & SYSTEMS ENGINEER
Location: Benghazi, Libya | Phone: +218 948890001
Email: sohaibkamash@gmail.com
GitHub: https://github.com/Nick-800 | LinkedIn: https://linkedin.com/in/sohaib-kamash
================================================================================

EXECUTIVE SUMMARY
--------------------------------------------------------------------------------
Experienced Full-Stack Architect and Lead Systems Engineer with 5+ years in production
designing resilient microservices, high-concurrency real-time mobile platforms, and
enterprise cloud architectures. Proven track record handling 1,800+ req/sec at sub-35ms
latency, telemetry systems with 5,000+ active nodes, and PCI-compliant financial flows.

CORE TECHNICAL SPECIALIZATIONS
--------------------------------------------------------------------------------
• Frontend Engineering:
  - React, TypeScript, Next.js, Tailwind CSS, Vue.js, Web Audio API, Canvas HUDs
  - State Architecture: Zustand, Redux Toolkit, TanStack Query, Radix UI Primitives

• Backend Systems & Distributed Architecture:
  - PHP Laravel, Node.js (Express/Fastify), Python FastAPI, Go microservices
  - Real-Time: WebSockets, Swoole, Socket.io, Redis Pub/Sub, RabbitMQ
  - API Standards: RESTful Architecture, GraphQL, OpenAPI/Swagger specifications

• Mobile Development:
  - Flutter & Dart, Provider/Bloc architectures, background telemetry, offline sync
  - Deep integration with Google Maps SDK, geolocation tracking, push notifications

• Data Architecture & Persistence:
  - Relational: PostgreSQL, MariaDB, MySQL (schema indexing, query tuning, ACID)
  - In-Memory & Caching: Redis (session clustering, rate limiting, pub/sub queues)
  - Vector & AI: PostgreSQL pgvector, LangChain RAG pipelines

• DevOps, Infrastructure & Security:
  - Docker, Docker Compose, Linux Administration (Debian/Ubuntu/Alpine)
  - CI/CD automation with GitHub Actions, Nginx reverse proxy, SSL/TLS, Let's Encrypt
  - Authentication: OAuth2, JWT, Laravel Sanctum/Passport, Role-Based Access Control (RBAC)

NOTABLE PRODUCTION PROJECTS
--------------------------------------------------------------------------------
1. E-Commerce Microservices Platform
   - Stack: React, Node.js, PostgreSQL, Stripe API, Redis, Docker
   - Distributed commerce system with event-driven order processing and sub-50ms catalog lookups.
   - Fully automated payment reconciliation with webhook idempotency.

2. Logistics & Fleet Telematics Engine
   - Stack: Flutter, Laravel Swoole, WebSockets, MariaDB, Redis
   - Real-time fleet telemetry daemon processing continuous position heartbeats for 5,000+ drivers.
   - Built sub-second route dispatching algorithms with geofencing triggers.

3. Enterprise Multi-Tenant CRM & Resource Portal
   - Stack: React, PHP Laravel, PostgreSQL, Docker, Tailwind CSS
   - Multi-tenant enterprise CRM with fine-grained RBAC and audit logging.
   - Scalable analytics dashboard serving complex aggregations across millions of records.

4. Smart Delivery Mobile App
   - Stack: Flutter, Provider, Firebase Cloud Messaging, Google Maps API
   - Customer-facing logistics app with live delivery driver tracking, in-app messaging,
     and seamless status updates.

5. Cyberpunk CRT Interactive Terminal Portfolio
   - Stack: React, TypeScript, Tailwind CSS, Web Audio API, cmdk, Canvas 2D
   - Immersive developer experience featuring hardware-accelerated Matrix digital rain,
     synthetic vintage audio synthesis, and interactive shell command line.

6. Corporate AI Knowledge & Retrieval Engine
   - Stack: FastAPI, LangChain, PostgreSQL pgvector, Python
   - Enterprise RAG assistant with semantic document chunking and vector indexing.

EDUCATION & PROFESSIONAL MILESTONES
--------------------------------------------------------------------------------
• BSc in Computer Science / Software Engineering
• 5+ Years Continuous Production Deployment Experience
• Contributor to open-source developer tooling and retro UX experimentation

================================================================================
Transmitted via Sohaib Kamash Cyberpunk HUD Terminal | Status: ONLINE
`;

export const downloadResume = (): void => {
  if (typeof window === "undefined") return;
  const blob = new Blob([RESUME_TEXT], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Sohaib_Kamash_CV.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
