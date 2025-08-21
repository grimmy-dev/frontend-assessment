import { Agent, AGENT_TYPES, DATA_CONNECTORS } from "@/lib/constants";
import { useCallback, useMemo, useState } from "react";

export interface CreatedAgent {
  id: string;
  agent: Agent;
  connectedDataSources: string[];
  createdAt: Date;
  name: string;
}

export const useAgentDialog = () => {
  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "configure" | "data-sources" | "review"
  >("configure");

  // Agent configuration state
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentName, setAgentName] = useState("");

  // Data sources state
  const [connectedDataSources, setConnectedDataSources] = useState<string[]>(
    []
  );

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Created agents storage
  const [createdAgents, setCreatedAgents] = useState<CreatedAgent[]>([]);

  // Memoized filtered agents with optimized filtering
  const filteredAgents = useMemo(() => {
    if (!searchQuery && selectedCategory === "All Categories") {
      return AGENT_TYPES;
    }

    const lowerSearchQuery = searchQuery.toLowerCase();

    return AGENT_TYPES.filter((agent) => {
      const matchesSearch =
        !searchQuery ||
        agent.name.toLowerCase().includes(lowerSearchQuery) ||
        agent.description.toLowerCase().includes(lowerSearchQuery);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        agent.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Memoized available data sources with connection status
  const availableDataSources = useMemo(
    () =>
      DATA_CONNECTORS.map((connector) => ({
        ...connector,
        isConnected: connectedDataSources.includes(connector.id),
      })),
    [connectedDataSources]
  );

  // Data source toggle handler
  const toggleDataSource = useCallback((id: string) => {
    setConnectedDataSources((prev) =>
      prev.includes(id) ? prev.filter((dsId) => dsId !== id) : [...prev, id]
    );
  }, []);

  // Dialog reset handler
  const resetDialog = useCallback(() => {
    setSelectedAgent(null);
    setConnectedDataSources([]);
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setAgentName("");
    setActiveTab("configure");
  }, []);

  // Agent creation handler with optimized performance
  const createAgent = useCallback(() => {
    if (!selectedAgent) return;

    setIsOpen(false);

    const newAgent: CreatedAgent = {
      id: `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      agent: selectedAgent,
      connectedDataSources: [...connectedDataSources],
      createdAt: new Date(),
      name: agentName.trim()
        ? `${agentName.trim()} (${selectedAgent.name})`
        : selectedAgent.name,
    };

    setCreatedAgents((prev) => [...prev, newAgent]);

    // Reset dialog after a brief delay for better UX
    setTimeout(() => {
      resetDialog();
    }, 100);
  }, [selectedAgent, connectedDataSources, agentName, resetDialog]);

  // Agent deletion handler
  const deleteAgent = useCallback((agentId: string) => {
    setCreatedAgents((prev) => prev.filter((agent) => agent.id !== agentId));
  }, []);

  // Computed properties
  const canProceedToDataSources = useMemo(
    () => selectedAgent !== null,
    [selectedAgent]
  );
  const canProceedToReview = useMemo(
    () => canProceedToDataSources && connectedDataSources.length > 0,
    [canProceedToDataSources, connectedDataSources.length]
  );

  // Optimized setters that prevent unnecessary re-renders
  const setSearchQueryOptimized = useCallback(
    (query: string) => {
      if (query !== searchQuery) {
        setSearchQuery(query);
      }
    },
    [searchQuery]
  );

  const setSelectedCategoryOptimized = useCallback(
    (category: string) => {
      if (category !== selectedCategory) {
        setSelectedCategory(category);
      }
    },
    [selectedCategory]
  );

  const setAgentNameOptimized = useCallback(
    (name: string) => {
      if (name !== agentName) {
        setAgentName(name);
      }
    },
    [agentName]
  );

  return {
    // State
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    selectedAgent,
    setSelectedAgent,
    connectedDataSources,
    searchQuery,
    setSearchQuery: setSearchQueryOptimized,
    selectedCategory,
    setSelectedCategory: setSelectedCategoryOptimized,
    agentName,
    setAgentName: setAgentNameOptimized,
    createdAgents,

    // Computed values
    filteredAgents,
    availableDataSources,
    canProceedToDataSources,
    canProceedToReview,

    // Actions
    toggleDataSource,
    resetDialog,
    createAgent,
    deleteAgent,
  };
};
