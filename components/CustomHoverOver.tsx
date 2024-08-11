import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export default function HoverOverWindow({
  children,
  content,
  className,
  open,
}: {
  children: React.ReactNode;
  content?: any;
  className?: string;
  open?: boolean;
}) {
  return (
    <HoverCard open={open}>
      <HoverCardTrigger asChild>
        <div>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent className={cn("-translate-y-2", className)}>
        {content}
      </HoverCardContent>
    </HoverCard>
  );
}
