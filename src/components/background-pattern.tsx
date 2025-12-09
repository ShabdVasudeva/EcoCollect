import { cn } from "@/lib/utils";
import { Recycle, Leaf, Cpu, Battery, Server } from "lucide-react";

export function BackgroundPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none w-full h-full",
        className
      )}
    >
      <div className="absolute left-[10%] top-[15%]">
        <Recycle className="h-16 w-16 text-foreground/5" strokeWidth={1}/>
      </div>
      <div className="absolute right-[12%] top-[20%]">
        <Leaf className="h-20 w-20 text-foreground/5" strokeWidth={1} />
      </div>
      <div className="absolute left-[5%] top-[60%]">
        <Cpu className="h-24 w-24 text-foreground/5" strokeWidth={1} />
      </div>
      <div className="absolute right-[8%] top-[75%]">
        <Battery className="h-12 w-12 text-foreground/5" strokeWidth={1} />
      </div>
       <div className="absolute left-[45%] top-[40%]">
        <Server className="h-16 w-16 text-foreground/5" strokeWidth={1} />
      </div>
        <div className="absolute left-[20%] top-[90%]">
        <Leaf className="h-12 w-12 text-foreground/5" strokeWidth={1} />
      </div>
       <div className="absolute right-[30%] top-[95%]">
        <Recycle className="h-14 w-14 text-foreground/5" strokeWidth={1} />
      </div>
    </div>
  );
}
