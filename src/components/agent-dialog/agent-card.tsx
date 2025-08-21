import { memo } from "react";
import { Agent } from "@/lib/constants";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onSelect: () => void;
}

const AgentCard = memo(({ agent, isSelected, onSelect }: AgentCardProps) => {
  const Icon = agent.icon;

  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200 hover:shadow-md h-24",
        isSelected ? "ring-1 ring-primary bg-primary/20" : "hover:bg-muted/50"
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={isSelected}
      aria-label={`Select ${agent.name} agent`}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 size-5 bg-primary rounded-full flex items-center justify-center z-10">
          <Check className="size-3 text-primary-foreground" />
        </div>
      )}

      <CardContent className="h-full">
        <div className="flex items-start gap-3 h-full">
          <div className="flex-shrink-0 p-1.5 sm:p-2 bg-primary/40 rounded-lg">
            <Icon className="size-5 sm:size-6" aria-hidden="true" />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-start gap-2 mb-1">
              <h3 className="font-medium text-sm sm:text-base truncate flex-1">
                {agent.name}
              </h3>
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="text-xs whitespace-nowrap flex-shrink-0"
              >
                {agent.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {agent.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

AgentCard.displayName = "AgentCard";

export default AgentCard;
