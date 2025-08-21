"use client";

import { memo } from "react";
import { useAgentDialog } from "@/hooks/use-agent-dialog";
import { Button, buttonVariants } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import AgentSelection from "./agent-selection";
import DataSourceConnection from "./data-source-connection";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreatedAgent, DATA_CONNECTORS } from "@/lib/constants";

// Memoized Empty State Component
const EmptyState = memo(() => (
  <Card className="border-dashed border-2">
    <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">No agents yet</h3>
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
        Create your first AI agent to get started with automated data processing
        and insights.
      </p>
    </CardContent>
  </Card>
));

EmptyState.displayName = "EmptyState";

// Memoized Agent Card Component
const CreatedAgentCard = memo(
  ({
    createdAgent,
    onDelete,
  }: {
    createdAgent: CreatedAgent;
    onDelete: (id: string) => void;
  }) => {
    const Icon = createdAgent.agent.icon;

    return (
      <Card className="group hover:shadow-md transition-all duration-200 gap-2 !p-4">
        <CardHeader className="flex items-start gap-3 p-0">
          <div className="flex items-center space-x-3 flex-1 min-w-0 overflow-hidden">
            <div className="p-2 sm:p-2.5 bg-primary/40 rounded-2xl flex-shrink-0">
              <Icon className="size-5 sm:size-6 text-foreground" />
            </div>
            <div className="flex-1 min-w-0 max-w-full overflow-hidden">
              <CardTitle
                className="text-base sm:text-lg truncate"
                title={createdAgent.name}
              >
                {createdAgent.name}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm truncate">
                {createdAgent.agent.category}
              </CardDescription>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="iconSm"
              onClick={() => onDelete(createdAgent.id)}
              className="sm:opacity-0 sm:group-hover:opacity-100 text-muted-foreground sm:hover:text-destructive sm:hover:bg-destructive/20 transition-all"
              aria-label="Delete agent"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="space-y-2">
            <div className="flex items-center justify-start gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Data Sources ({createdAgent.connectedDataSources.length})
              </span>
              {createdAgent.connectedDataSources.map(
                (ds_id: string, idx: number) => {
                  const connector = DATA_CONNECTORS.find((c) => c.id === ds_id);
                  const DSIcon = connector?.icon;
                  const DS_name = connector?.name;

                  return (
                    <div
                      key={idx}
                      className="bg-primary/60 rounded-2xl p-1"
                      title={DS_name}
                    >
                      {DSIcon ? <DSIcon className="size-4" /> : null}
                    </div>
                  );
                }
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              Created {createdAgent.createdAt.toLocaleDateString()} at{" "}
              {createdAgent.createdAt.toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CreatedAgentCard.displayName = "CreatedAgentCard";

const AgentDialog = () => {
  const {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    selectedAgent,
    setSelectedAgent,
    connectedDataSources,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    agentName,
    setAgentName,
    filteredAgents,
    availableDataSources,
    toggleDataSource,
    resetDialog,
    createAgent,
    createdAgents,
    deleteAgent,
    canProceedToDataSources,
    canProceedToReview,
  } = useAgentDialog();

  const handleClose = (open: boolean) => {
    if (!open) {
      resetDialog();
    }
    setIsOpen(open);
  };

  return (
    <div className="space-y-6 lg:space-y-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Agents
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Manage and configure your AI agents
          </p>
        </div>
        {createdAgents.length > 0 && (
          <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
              <Button size="sm" className="text-xs w-full sm:w-auto">
                <Plus className="size-4 mr-2" />
                Add New Agent
              </Button>
            </DialogTrigger>
          </Dialog>
        )}
      </div>

      {/* Agents Grid or Empty State */}
      {createdAgents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {createdAgents.map((createdAgent) => (
            <CreatedAgentCard
              key={createdAgent.id}
              createdAgent={createdAgent}
              onDelete={deleteAgent}
            />
          ))}
        </div>
      ) : (
        <>
          <EmptyState />
          <div className="flex justify-center">
            <Dialog open={isOpen} onOpenChange={handleClose}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Agent
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </>
      )}

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="!max-w-5xl w-full h-[86vh] flex flex-col p-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b flex-shrink-0">
            <DialogTitle>Create New Agent</DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex flex-col min-h-0 px-4 sm:px-6">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as any)}
              className="flex flex-col h-full"
            >
              <TabsList className="grid grid-cols-3 w-full mb-4 flex-shrink-0">
                <TabsTrigger value="configure" className="text-xs sm:text-sm">
                  Configure
                </TabsTrigger>
                <TabsTrigger
                  value="data-sources"
                  className="text-xs sm:text-sm"
                  disabled={!canProceedToDataSources}
                >
                  Data Sources
                </TabsTrigger>
                <TabsTrigger
                  value="review"
                  className="text-xs sm:text-sm"
                  disabled={!canProceedToReview}
                >
                  Review
                </TabsTrigger>
              </TabsList>

              {/* Step 1 - Configure */}
              <TabsContent
                value="configure"
                className="flex-1 flex flex-col mt-0 space-y-4"
              >
                <div className="space-y-4 flex-shrink-0">
                  <div className="space-y-2">
                    <Label htmlFor="agent-name" className="text-sm font-medium">
                      Agent Name (Optional)
                    </Label>
                    <Input
                      id="agent-name"
                      placeholder="Enter a custom name for your agent..."
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      className="transition-all focus:ring-2"
                    />
                  </div>
                </div>

                <div className="flex-1 min-h-0">
                  <AgentSelection
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    filteredAgents={filteredAgents}
                    selectedAgent={selectedAgent}
                    setSelectedAgent={setSelectedAgent}
                  />
                </div>
              </TabsContent>

              {/* Step 2 - Data Sources */}
              <TabsContent value="data-sources" className="flex-1 mt-0 min-h-0">
                <DataSourceConnection
                  availableDataSources={availableDataSources}
                  toggleDataSource={toggleDataSource}
                  selectedAgent={selectedAgent}
                  connectedDataSources={connectedDataSources}
                  agentName={agentName}
                />
              </TabsContent>

              {/* Step 3 - Review */}
              <TabsContent
                value="review"
                className="flex-1 mt-0 min-h-0 overflow-y-auto p-2"
              >
                <div className="space-y-4 pb-4">
                  <h3 className="text-lg font-semibold">Review Agent</h3>
                  <Card className="!p-4 gap-2">
                    <CardHeader className="bg-muted rounded-lg p-2">
                      <CardTitle className="text-base sm:text-lg">
                        {agentName || selectedAgent?.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {selectedAgent?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-0">
                      <p className="text-sm">
                        Category:{" "}
                        <span className="font-medium text-xs bg-primary/20 p-1 rounded-md border border-primary text-primary">
                          {selectedAgent?.category}
                        </span>
                      </p>

                      <div>
                        <p className="text-sm font-medium mb-3">
                          Connected Data Sources: {connectedDataSources.length}
                        </p>
                        {connectedDataSources.length > 0 ? (
                          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                            {availableDataSources
                              .filter((ds) =>
                                connectedDataSources.includes(ds.id)
                              )
                              .map((ds) => {
                                const Icon = ds.icon;
                                return (
                                  <Card key={ds.id} className="!p-4 gap-2">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={buttonVariants({
                                          size: "iconSm",
                                          variant: "secondary",
                                        })}
                                      >
                                        <Icon className="size-4" />
                                      </div>
                                      <span className="font-medium text-sm">
                                        {ds.name}
                                      </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {ds.description}
                                    </p>
                                  </Card>
                                );
                              })}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No data sources connected
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Navigation */}
          <div className="flex-shrink-0 border-t bg-background p-4 sm:p-6">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
              <DialogClose asChild onClick={resetDialog}>
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  Cancel
                </Button>
              </DialogClose>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3">
                {activeTab === "configure" && (
                  <Button
                    size="sm"
                    onClick={() => setActiveTab("data-sources")}
                    disabled={!canProceedToDataSources}
                    className="w-full sm:w-auto"
                  >
                    Next
                  </Button>
                )}

                {activeTab === "data-sources" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTab("configure")}
                      className="w-full sm:w-auto"
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setActiveTab("review")}
                      disabled={!canProceedToReview}
                      className="w-full sm:w-auto"
                    >
                      Next
                    </Button>
                  </>
                )}

                {activeTab === "review" && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveTab("data-sources")}
                      className="w-full sm:w-auto"
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      onClick={createAgent}
                      className="w-full sm:w-auto"
                    >
                      Create Agent
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentDialog;
