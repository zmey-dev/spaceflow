
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-8 w-8 rounded-md bg-cowork-700 flex items-center justify-center">
        <span className="text-white font-bold text-lg">SF</span>
      </div>
      <span className="font-semibold text-lg">SpaceFlow</span>
    </div>
  );
}
