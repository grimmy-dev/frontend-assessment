import { memo, useCallback } from "react";
import { DataConnector } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataConnectorCardProps {
  dataSource: DataConnector;
  onToggle: () => void;
}

const DataConnectorCard = memo(
  ({ dataSource, onToggle }: DataConnectorCardProps) => {
    const Icon = dataSource.icon;

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        onToggle();
      },
      [onToggle]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      },
      [onToggle]
    );

    return (
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md h-16 sm:h-20",
          dataSource.isConnected &&
            "bg-primary/10 border-primary hover:bg-primary/15"
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-pressed={dataSource.isConnected}
        aria-label={`${dataSource.isConnected ? "Disconnect" : "Connect"} ${
          dataSource.name
        }`}
      >
        <CardContent className="flex items-center justify-between p-3 h-full">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2 bg-primary/40 rounded-lg flex-shrink-0">
              <Icon className="size-4 sm:size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm sm:text-base truncate">
                {dataSource.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-2">
                {dataSource.description}
              </p>
            </div>
          </div>
          {dataSource.isConnected && (
            <Button
              variant={dataSource.isConnected ? "default" : "outline"}
              size="iconSm"
              className="text-xs flex-shrink-0 ml-2"
              aria-label={dataSource.isConnected ? "Disconnect" : "Connect"}
            >
              <CheckIcon className="size-3 sm:size-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
);

DataConnectorCard.displayName = "DataConnectorCard";

export default DataConnectorCard;
