import AgentDialog from "@/components/agent-dialog/agent-dialog";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Page Header */}
        <header className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Agent Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Create and manage your AI agents with custom data sources
          </p>
        </header>

        {/* Agent Dialog Component */}
        <AgentDialog />
      </div>
    </main>
  );
}
