import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  buttonColor: string;
  onLaunch: () => void;
  className?: string;
}

export default function ToolCard({
  title,
  description, 
  icon: Icon,
  iconColor,
  buttonColor,
  onLaunch,
  className = ""
}: ToolCardProps) {
  return (
    <div className={`tool-card ${className}`}>
      <div className="flex items-center mb-4">
        <div className={`icon-bg ${iconColor} mr-3`}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button 
        onClick={onLaunch}
        className={`w-full h-10 ${buttonColor}`}
      >
        <Icon className="h-4 w-4 mr-2" />
        Launch Tool
      </Button>
    </div>
  );
}
