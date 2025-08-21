# FRONTEND_AGENT_ASSIGNMENT

**Frontend Assignment: Agent Creation Dialog Box**

## 📖 Overview

This project implements a **multi-step dialog box** for creating and configuring AI agents.
It allows users to:

1. Select from a list of available agents (with search and category filtering).
2. Connect the selected agent to organizational data sources.
3. Review and finalize their agent configuration.

This assignment demonstrates building real-world UI workflows with **React, Next.js, TypeScript, and TailwindCSS**.

---

## 🚀 Features

- **Multi-Step Modal Dialog** with animated transitions and focus management.
- **Agent Selection**

  - Search agents by name with debounce.
  - Filter agents by category.
  - Responsive card grid layout with hover/selection states.

- **Data Source Connection**

  - Connect/disconnect data sources.
  - Agent summary panel with live status.
  - Responsive two-panel layout (desktop) and stacked layout (mobile).

- **Review Screen** with a full summary of agent configuration.
- **State Management** handled with React hooks (`useAgentDialog`).
- **Accessibility**

  - Keyboard navigation (Tab, Enter, Escape).
  - Proper ARIA labels and roles.
  - Screen-reader friendly components.

- **Responsive Design** with mobile, tablet, and desktop support.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (React 18)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Shadcn/UI, Lucide Icons
- **State Management**: React hooks + custom hook (`useAgentDialog`)

---

## 📂 Project Structure

```
src/
├──app/
    └── page.tsx                      # Home page with AgentDialog
├── components/
│   ├── agent-dialog/
│   │   ├── agent-dialog.tsx          # Main multi-step modal
│   │   ├── agent-selection.tsx       # Agent selection screen
│   │   ├── agent-card.tsx            # Card for individual agent
│   │   ├── data-source-connection.tsx# Data source linking screen
│   │   ├── data-connector-card.tsx   # Card for individual data source
│   └── ui/                           # Reusable UI components
├── hooks/
│   └── use-agent-dialog.ts           # Centralized dialog state
├── types/                            # TypeScript types
└──  lib/                             # Some constants and other utilities

```

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/grimmy-dev/frontend-assessment
cd FRONTEND_AGENT_ASSIGNMENT

# Install dependencies
npm install

# Run dev server
npm run dev
```

App runs at: [http://localhost:3000](http://localhost:3000)

---

## 🎯 How It Works

1. **Open the Agent Dialog** → Click **“Create Your First Agent”** or **“Add New Agent”**.
2. **Step 1 – Configure Agent** → Choose a name and select from available agents (with search & filter).
3. **Step 2 – Data Sources** → Connect or disconnect organizational data sources.
4. **Step 3 – Review** → See a summary of your configuration before creating the agent.

---

## 📚 References

- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)

---

## ✨ Deliverables

- Functional multi-step modal dialog
- Clean, reusable TypeScript components
- Accessibility-first responsive design
- Documented code and clear README

---
