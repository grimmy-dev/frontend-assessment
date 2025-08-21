import { memo } from "react";
import { Agent, DataConnector } from "@/lib/constants";
import DataConnectorCard from "./data-connector-card";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataSourceConnectionProps {
  availableDataSources: DataConnector[];
  toggleDataSource: (id: string) => void;
  selectedAgent: Agent | null;
  connectedDataSources: string[];
  agentName: string;
}

// Memoized Connected Source Item Component
const ConnectedSourceItem = memo(
  ({ dataSource }: { dataSource: DataConnector }) => (
    <div className="flex items-center space-x-2 text-sm p-2 bg-muted/50 rounded-md">
      <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
      <span className="truncate">{dataSource.name}</span>
    </div>
  )
);

ConnectedSourceItem.displayName = "ConnectedSourceItem";

// Memoized Agent Summary Component
const AgentSummary = memo(
  ({
    selectedAgent,
    agentName,
    connectedDataSources,
    availableDataSources,
  }: {
    selectedAgent: Agent | null;
    agentName: string;
    connectedDataSources: string[];
    availableDataSources: DataConnector[];
  }) => {
    if (!selectedAgent) {
      return (
        <Card className="h-full">
          <CardContent className="p-4 flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm text-center">
              Please select an agent to see configuration
            </p>
          </CardContent>
        </Card>
      );
    }

    const Icon = selectedAgent.icon;
    const connectedSources = availableDataSources.filter((ds) =>
      connectedDataSources.includes(ds.id)
    );

    return (
      <Card className="h-full gap-2">
        <CardHeader>
          <CardTitle className="text-base">Agent Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Agent Info */}
          <div className="flex items-center space-x-3 p-3 border rounded-lg bg-muted/30">
            <div className="p-2 bg-background rounded-lg flex-shrink-0">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-medium text-sm truncate">
                {agentName || selectedAgent.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {selectedAgent.category}
              </p>
            </div>
          </div>

          {/* Connected Data Sources */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Connected Sources:</p>
              <Badge variant="secondary" className="text-xs">
                {connectedDataSources.length}
              </Badge>
            </div>

            {connectedSources.length > 0 ? (
              <ScrollArea className="h-full">
                <div className="space-y-2 max-h-20 md:max-h-96">
                  {connectedSources.map((ds) => (
                    <ConnectedSourceItem key={ds.id} dataSource={ds} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-md text-center">
                No data sources connected yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

AgentSummary.displayName = "AgentSummary";

const DataSourceConnection = memo(
  ({
    availableDataSources,
    toggleDataSource,
    selectedAgent,
    connectedDataSources,
    agentName,
  }: DataSourceConnectionProps) => {
    return (
      <div className="flex flex-col h-full min-h-0">
        {/* Mobile: Agent Summary First */}
        <div className="sm:hidden mb-4 flex-shrink-0">
          <AgentSummary
            selectedAgent={selectedAgent}
            agentName={agentName}
            connectedDataSources={connectedDataSources}
            availableDataSources={availableDataSources}
          />
        </div>

        {/* Data Sources Header */}
        <h3 className="font-medium mb-4 text-sm flex-shrink-0">
          Data Sources in your Workspace ({availableDataSources.length})
        </h3>

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 flex flex-col sm:flex-row gap-4">
          {/* Data Sources List */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full pr-1">
              <div className="grid grid-cols-1 lg:grid-cols-1  gap-3 p-2">
                {availableDataSources.map((dataSource) => (
                  <DataConnectorCard
                    key={dataSource.id}
                    dataSource={dataSource}
                    onToggle={() => toggleDataSource(dataSource.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Desktop: Agent Summary Sidebar */}
          <div className="hidden sm:block sm:w-72 lg:w-80 flex-shrink-0">
            <AgentSummary
              selectedAgent={selectedAgent}
              agentName={agentName}
              connectedDataSources={connectedDataSources}
              availableDataSources={availableDataSources}
            />
          </div>
        </div>
      </div>
    );
  }
);

DataSourceConnection.displayName = "DataSourceConnection";

export default DataSourceConnection;
