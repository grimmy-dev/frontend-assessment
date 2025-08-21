import {
  TrendingUp,
  Target,
  UserCheck,
  DollarSign,
  BarChart3,
  Truck,
  Settings,
  FileText,
  MessageSquare,
  Zap,
  LucideIcon,
  X,
} from "lucide-react";
import {
  EngagemateIcon,
  FeedbackFusionIcon,
  GoogleanalyticsIcon,
  InsideigniteIcon,
  MailchimpIcon,
  PersonaPulseIcon,
  SaleforceIcon,
  WorkdayHCMIcon,
  ZendeskIcon,
} from "@/lib/icons";

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
}

export interface DataConnector {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  isConnected?: boolean;
}

// Constants
export const CATEGORIES = [
  "All Categories",
  "Customer Service",
  "Sales",
  "Marketing",
  "HR",
  "Finance",
  "Performance",
  "Logistics",
  "Administration",
];

export const AGENT_TYPES: Agent[] = [
  {
    id: "1",
    name: "Customer Support Assistant",
    description: "Automates customer queries and ticketing.",
    category: "Customer Service",
    icon: MessageSquare,
  },
  {
    id: "2",
    name: "IT Helpdesk Agent",
    description: "Solves common tech issues and routes support requests.",
    category: "Customer Service",
    icon: Settings,
  },
  {
    id: "3",
    name: "Sales Intelligence Agent",
    description: "Offers sales insights and lead prioritization.",
    category: "Sales",
    icon: TrendingUp,
  },
  {
    id: "4",
    name: "Lead Management Agent",
    description: "Automates capturing and nurturing of leads.",
    category: "Sales",
    icon: Target,
  },
  {
    id: "5",
    name: "Marketing Automation Agent",
    description: "Manages campaigns and customer segmentation.",
    category: "Marketing",
    icon: Zap,
  },
  {
    id: "6",
    name: "Content Personalization Agent",
    description: "Delivers tailored content to users across channels.",
    category: "Marketing",
    icon: FileText,
  },
  {
    id: "7",
    name: "HR Onboarding Agent",
    description: "Automates employee onboarding workflows.",
    category: "HR",
    icon: UserCheck,
  },
  {
    id: "8",
    name: "Performance Review Agent",
    description: "Facilitates collecting and summarizing appraisal feedback.",
    category: "HR",
    icon: BarChart3,
  },
  {
    id: "9",
    name: "Finance Analytics Agent",
    description: "Provides spend, revenue, and anomaly insights.",
    category: "Finance",
    icon: DollarSign,
  },
  {
    id: "10",
    name: "Logistics & Delivery Agent",
    description: "Monitors orders, schedules, and addresses delivery issues.",
    category: "Logistics",
    icon: Truck,
  },
];

export const DATA_CONNECTORS: DataConnector[] = [
  {
    id: "1",
    name: "PersonaPulse",
    description: "Customer behavior analytics.",
    category: "Customer Service",
    icon: PersonaPulseIcon,
  },
  {
    id: "2",
    name: "Zendesk",
    description: "Customer service ticket data.",
    category: "Customer Service",
    icon: ZendeskIcon,
  },
  {
    id: "3",
    name: "Salesforce CRM",
    description: "Sales pipeline and contacts.",
    category: "Sales",
    icon: SaleforceIcon,
  },
  {
    id: "4",
    name: "ChurnX",
    description: "Churn prediction and market trends.",
    category: "Sales",
    icon: X,
  },
  {
    id: "5",
    name: "Mailchimp",
    description: "Marketing automation/email campaign data.",
    category: "Marketing",
    icon: MailchimpIcon,
  },
  {
    id: "6",
    name: "Google Analytics",
    description: "Marketing and web analytics.",
    category: "Marketing",
    icon: GoogleanalyticsIcon,
  },
  {
    id: "7",
    name: "Workday HCM",
    description: "HR, payroll, and employee data.",
    category: "HR",
    icon: WorkdayHCMIcon,
  },
  {
    id: "8",
    name: "InsightIgnite",
    description: "Employee engagement analytics.",
    category: "Performance",
    icon: InsideigniteIcon,
  },
  {
    id: "9",
    name: "FeedbackFusion",
    description: "Feedback collection and analysis.",
    category: "Performance",
    icon: FeedbackFusionIcon,
  },
  {
    id: "10",
    name: "EngageMate",
    description: "Logistics and delivery analytics.",
    category: "Logistics",
    icon: EngagemateIcon,
  },
];
