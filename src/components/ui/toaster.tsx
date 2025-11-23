import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="border-2 border-primary bg-black/95 font-mono">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-primary flex items-center gap-2"><span>&gt;</span>{title}</ToastTitle>}
              {description && <ToastDescription className="text-muted-foreground pl-4">{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose className="border border-primary/50 hover:border-primary" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
