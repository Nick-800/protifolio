import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Terminal, AlertTriangle, RotateCcw, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-4 scanline overflow-hidden select-none">
      {/* Background ambient CRT phosphor glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_hsl(var(--background))_90%)]" />

      {/* Main Terminal Frame */}
      <div className="relative z-10 w-full max-w-3xl border-2 border-primary/60 bg-black/80 p-6 md:p-8 terminal-border backdrop-blur-sm">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-primary/40 pb-3 mb-6">
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider">
            <Terminal className="w-4 h-4 animate-pulse" />
            <span>CRT_BIOS_v4.04 // EMERGENCY_INTERRUPT</span>
          </div>
          <div className="flex items-center gap-2 text-destructive text-xs tracking-widest uppercase font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-destructive animate-ping" />
            <span>HALT_ERR</span>
          </div>
        </div>

        {/* ASCII Header Banner */}
        <div className="overflow-x-auto text-destructive/90 text-xs sm:text-sm leading-none font-bold whitespace-pre mb-6">
{`
 ╔═══════════════════════════════════════════════════════════════════════╗
 ║  [KERNEL PANIC: 404 - SECTOR_NOT_FOUND]                               ║
 ║  FATAL MEMORY ANOMALY DETECTED AT VIRTUAL BUS REGISTER               ║
 ╚═══════════════════════════════════════════════════════════════════════╝
`}
        </div>

        {/* Diagnostic / Error Trace */}
        <div className="space-y-4 text-xs md:text-sm">
          <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 p-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-destructive font-bold">
                CRITICAL_FAILURE: Invalid route address requested.
              </p>
              <p className="text-muted-foreground mt-1 break-all">
                Target URI: <code className="text-primary bg-primary/10 px-1 py-0.5">{location.pathname}</code> does not resolve to any known memory sector.
              </p>
            </div>
          </div>

          <div className="bg-black/60 border border-primary/20 p-3 space-y-1 font-mono text-[11px] md:text-xs text-muted-foreground">
            <p className="text-primary/90 font-semibold">Memory dump: 0x000000404... Invalid route address requested</p>
            <p>EAX: 0x00404000  EBX: 0x0000DEAD  ECX: 0x00000000  EDX: 0x00000001</p>
            <p>ESI: 0x00007FFF  EDI: 0x00000000  EBP: 0x7FFF5FB3  ESP: 0x7FFF5FB0</p>
            <p className="text-primary/70 mt-2">Call Stack Trace:</p>
            <p className="pl-2">&gt; [0x00404000] ROUTE_DISPATCHER() -&gt; UNRESOLVED_SYMBOL</p>
            <p className="pl-2">&gt; [0x00404018] VIRTUAL_SECTOR_LOOKUP_FAILED -&gt; CORRUPTED_POINTER</p>
            <p className="pl-2">&gt; [0x0040402C] KERNEL_HALT() -&gt; AWAITING_USER_REBOOT</p>
          </div>

          {/* Interactive Shell Prompt Line */}
          <div className="flex items-center gap-2 text-xs md:text-sm pt-2">
            <span className="text-primary font-bold">&gt;</span>
            <span className="text-muted-foreground">root@crt-terminal:~#</span>
            <span className="text-foreground">reboot --force --target=MAIN_SECTOR</span>
            <span className="inline-block w-2.5 h-4 bg-primary cursor-blink ml-0.5" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-primary/30 flex flex-wrap gap-4 items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-primary bg-primary/10 hover:bg-primary hover:text-background font-mono text-sm font-bold tracking-wider transition-all duration-150 glow-terminal"
          >
            <RotateCcw className="w-4 h-4" />
            <span>[REBOOT_SYSTEM]</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN_TO_ROOT_SECTOR (/)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
