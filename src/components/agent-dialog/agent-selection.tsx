import { memo } from "react";
import { Agent, CATEGORIES } from "@/lib/constants";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AgentCard from "@/components/agent-dialog/agent-card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AgentSelectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredAgents: Agent[];
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent) => void;
}

// Memoized Category Button Component
const CategoryButton = memo(
  ({
    category,
    isSelected,
    onClick,
  }: {
    category: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className="whitespace-nowrap text-xs sm:text-sm h-7 sm:h-8 px-3 flex-shrink-0"
      onClick={onClick}
    >
      {category}
    </Button>
  )
);

CategoryButton.displayName = "CategoryButton";

// Memoized No Results Component
const NoResults = memo(() => (
  <div className="col-span-full text-center py-8 lg:py-12">
    <p className="text-muted-foreground text-sm">
      No agents found matching your criteria.
    </p>
  </div>
));

NoResults.displayName = "NoResults";

const AgentSelection = memo(
  ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredAgents,
    selectedAgent,
    setSelectedAgent,
  }: AgentSelectionProps) => (
    <div className="flex flex-col h-full min-h-0">
      {/* Search Bar */}
      <div className="relative mb-4 flex-shrink-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Categories */}
      <div className="mb-4 flex-shrink-0">
        <h3 className="font-medium mb-3 text-sm">Categories</h3>
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2 sm:pb-0 sm:grid sm:grid-cols-2 lg:flex lg:flex-wrap">
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        <ScrollBar orientation="horizontal"/>
        </ScrollArea>

      </div>

      {/* Agents Grid */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 h-80">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isSelected={selectedAgent?.id === agent.id}
                  onSelect={() => setSelectedAgent(agent)}
                />
              ))
            ) : (
              <NoResults />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
);

AgentSelection.displayName = "AgentSelection";

export default AgentSelection;
