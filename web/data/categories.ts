import {
  Boxes,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Network,
  Settings2,
  Shield,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const categories: Category[] = [
  {
    id: "database",
    name: "Database",
    icon: Database,
    skills: [
      {
        id: "sql",
        name: "SQL",
        icon: Database,
      },
      {
        id: "nosql",
        name: "NoSQL",
        icon: Database,
      },
      {
        id: "postgresql",
        name: "PostgreSQL",
        icon: Database,
      },
      {
        id: "mysql",
        name: "MySQL",
        icon: Database,
      },
      {
        id: "mongodb",
        name: "MongoDB",
        icon: Database,
      },
      {
        id: "redis",
        name: "Redis",
        icon: Database,
      },
      {
        id: "graph-database",
        name: "Graph Database",
        icon: GitBranch,
      },
      {
        id: "search-engine",
        name: "Search Engine",
        icon: Database,
      },
    ],
  },

  {
    id: "programming-language",
    name: "Programming Languages",
    icon: Code2,
    skills: [
      {
        id: "javascript",
        name: "JavaScript",
        icon: Code2,
      },
      {
        id: "typescript",
        name: "TypeScript",
        icon: Code2,
      },
      {
        id: "python",
        name: "Python",
        icon: Code2,
      },
      {
        id: "java",
        name: "Java",
        icon: Code2,
      },
      {
        id: "go",
        name: "Go",
        icon: Code2,
      },
      {
        id: "rust",
        name: "Rust",
        icon: Code2,
      },
    ],
  },

  {
    id: "system-design",
    name: "System Design",
    icon: Layers3,
    skills: [
      {
        id: "scalability",
        name: "Scalability",
        icon: Layers3,
      },
      {
        id: "distributed-systems",
        name: "Distributed Systems",
        icon: Network,
      },
      {
        id: "caching",
        name: "Caching",
        icon: Database,
      },
      {
        id: "messaging",
        name: "Messaging",
        icon: Network,
      },
      {
        id: "load-balancing",
        name: "Load Balancing",
        icon: Network,
      },
      {
        id: "microservices",
        name: "Microservices",
        icon: Boxes,
      },
    ],
  },

  {
    id: "cloud",
    name: "Cloud",
    icon: Cloud,
    skills: [
      {
        id: "aws",
        name: "AWS",
        icon: Cloud,
      },
      {
        id: "gcp",
        name: "Google Cloud",
        icon: Cloud,
      },
      {
        id: "azure",
        name: "Azure",
        icon: Cloud,
      },
      {
        id: "serverless",
        name: "Serverless",
        icon: Cloud,
      },
      {
        id: "cloud-networking",
        name: "Cloud Networking",
        icon: Network,
      },
    ],
  },

  {
    id: "devops",
    name: "DevOps",
    icon: Settings2,
    skills: [
      {
        id: "docker",
        name: "Docker",
        icon: Boxes,
      },
      {
        id: "kubernetes",
        name: "Kubernetes",
        icon: Boxes,
      },
      {
        id: "ci-cd",
        name: "CI/CD",
        icon: GitBranch,
      },
      {
        id: "linux",
        name: "Linux",
        icon: Settings2,
      },
      {
        id: "nginx",
        name: "Nginx",
        icon: Settings2,
      },
      {
        id: "terraform",
        name: "Terraform",
        icon: Settings2,
      },
    ],
  },

  {
    id: "security",
    name: "Security",
    icon: Shield,
    skills: [
      {
        id: "authentication",
        name: "Authentication",
        icon: Shield,
      },
      {
        id: "authorization",
        name: "Authorization",
        icon: Shield,
      },
      {
        id: "oauth",
        name: "OAuth",
        icon: Shield,
      },
      {
        id: "jwt",
        name: "JWT",
        icon: Shield,
      },
      {
        id: "web-security",
        name: "Web Security",
        icon: Shield,
      },
    ],
  },

  {
    id: "networking",
    name: "Networking",
    icon: Network,
    skills: [
      {
        id: "http",
        name: "HTTP",
        icon: Network,
      },
      {
        id: "tcp-ip",
        name: "TCP/IP",
        icon: Network,
      },
      {
        id: "dns",
        name: "DNS",
        icon: Network,
      },
      {
        id: "websocket",
        name: "WebSocket",
        icon: Network,
      },
      {
        id: "grpc",
        name: "gRPC",
        icon: Network,
      },
    ],
  },

  {
    id: "computer-science",
    name: "Computer Science",
    icon: Cpu,
    skills: [
      {
        id: "data-structures",
        name: "Data Structures",
        icon: Cpu,
      },
      {
        id: "algorithms",
        name: "Algorithms",
        icon: GitBranch,
      },
      {
        id: "operating-systems",
        name: "Operating Systems",
        icon: Cpu,
      },
      {
        id: "concurrency",
        name: "Concurrency",
        icon: Cpu,
      },
      {
        id: "memory-management",
        name: "Memory Management",
        icon: Cpu,
      },
    ],
  },
];
