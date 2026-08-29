from django.db import migrations


def seed_data(apps, schema_editor):
    Category = apps.get_model("flashcards", "Category")
    Skill = apps.get_model("flashcards", "Skill")

    data = {
        "Computer Science": {
            "icon": "Binary",
            "skills": {
                "Data Structures": "Braces",
                "Algorithms": "Workflow",
                "Big O": "ChartNoAxesCombined",
                "Object-Oriented Programming": "Boxes",
                "Functional Programming": "FunctionSquare",
                "Concurrency": "GitFork",
                "Multithreading": "GitBranch",
                "Memory Management": "MemoryStick",
                "Operating Systems": "Cpu",
                "Processes & Threads": "Layers",
                "Computer Networks": "Network",
                "Networking Protocols": "Waypoints",
                "Computer Architecture": "Microchip",
                "Compilers": "FileCode",
                "Garbage Collection": "Trash2",
            },
        },
        "Programming Languages": {
            "icon": "Code2",
            "skills": {
                "Java": "Coffee",
                "Python": "Code2",
                "JavaScript": "Braces",
                "TypeScript": "Braces",
                "Go": "Box",
                "Rust": "Cog",
                "C++": "CodeXml",
                "C#": "CodeXml",
                "Kotlin": "Code2",
                "Swift": "Wind",
            },
        },
        "Backend": {
            "icon": "Server",
            "skills": {
                "REST API": "Globe",
                "GraphQL": "Share2",
                "gRPC": "Radio",
                "WebSocket": "ArrowLeftRight",
                "HTTP": "Globe2",
                "API Design": "Blocks",
                "Authentication": "KeyRound",
                "Authorization": "ShieldCheck",
                "OAuth 2.0": "KeyRound",
                "OpenID Connect": "BadgeCheck",
                "JWT": "FileKey",
                "Session Management": "UserRoundCog",
                "Rate Limiting": "Gauge",
                "Webhooks": "Webhook",
                "Background Jobs": "Clock3",
                "Task Queues": "ListTodo",
                "File Upload": "Upload",
                "Serialization": "FileJson",
                "Dependency Injection": "Plug",
            },
        },
        "Frontend": {
            "icon": "PanelsTopLeft",
            "skills": {
                "HTML": "CodeXml",
                "CSS": "Palette",
                "JavaScript": "Braces",
                "TypeScript": "Braces",
                "React": "Atom",
                "Next.js": "Layers2",
                "Web APIs": "Globe",
                "DOM": "Network",
                "Browser Rendering": "Monitor",
                "Event Loop": "RefreshCw",
                "State Management": "Database",
                "Client-Side Rendering": "MonitorSmartphone",
                "Server-Side Rendering": "Server",
                "Static Site Generation": "FileOutput",
                "Hydration": "Droplets",
                "Web Performance": "Gauge",
                "Web Accessibility": "Accessibility",
            },
        },
        "Database": {
            "icon": "Database",
            "skills": {
                "SQL": "Database",
                "Relational Database": "Table2",
                "PostgreSQL": "Database",
                "MySQL": "Database",
                "MongoDB": "DatabaseZap",
                "Redis": "Zap",
                "Elasticsearch": "Search",
                "Neo4j": "Network",
                "Database Indexing": "ListFilter",
                "Transactions": "ArrowLeftRight",
                "ACID": "ShieldCheck",
                "MVCC": "Layers3",
                "Isolation Levels": "LockKeyhole",
                "Replication": "Copy",
                "Sharding": "Split",
                "Partitioning": "Columns3",
                "Query Optimization": "Gauge",
                "Connection Pooling": "Pool",
                "Database Locking": "Lock",
                "Deadlocks": "CircleStop",
                "Normalization": "TableProperties",
                "Denormalization": "TableProperties",
            },
        },
        "System Design": {
            "icon": "Network",
            "skills": {
                "Distributed Systems": "Network",
                "Scalability": "Maximize2",
                "Horizontal Scaling": "ArrowLeftRight",
                "Vertical Scaling": "ArrowUpDown",
                "Load Balancing": "Scale",
                "Caching": "DatabaseZap",
                "CDN": "Globe2",
                "Message Queue": "ListOrdered",
                "Event Streaming": "Radio",
                "Pub/Sub": "RadioTower",
                "Event-Driven Architecture": "Workflow",
                "CAP Theorem": "Triangle",
                "Consistency": "GitCompare",
                "Consensus": "Handshake",
                "Leader Election": "Crown",
                "Distributed Lock": "LockKeyhole",
                "Service Discovery": "Search",
                "Circuit Breaker": "Power",
                "Retry": "RotateCcw",
                "Backpressure": "Gauge",
                "Idempotency": "Repeat2",
                "Replication": "Copy",
                "Sharding": "Split",
                "Partitioning": "Columns3",
                "Fault Tolerance": "ShieldCheck",
                "High Availability": "ServerCog",
                "Disaster Recovery": "LifeBuoy",
            },
        },
        "Cloud": {
            "icon": "Cloud",
            "skills": {
                "AWS": "Cloud",
                "Google Cloud": "Cloud",
                "Azure": "Cloud",
                "Compute": "Cpu",
                "Object Storage": "HardDrive",
                "Cloud Networking": "Network",
                "Cloud Databases": "Database",
                "Serverless": "Zap",
                "IAM": "ShieldCheck",
                "Cloud Architecture": "CloudCog",
            },
        },
        "Infrastructure": {
            "icon": "ServerCog",
            "skills": {
                "Linux": "Terminal",
                "Docker": "Container",
                "Kubernetes": "Boxes",
                "Nginx": "Server",
                "CI/CD": "GitBranch",
                "Terraform": "Blocks",
                "Infrastructure as Code": "Code2",
                "DNS": "Globe",
                "TCP/IP": "Network",
                "TLS": "LockKeyhole",
                "Reverse Proxy": "ArrowLeftRight",
                "Containerization": "Container",
                "Virtualization": "Layers",
                "Monitoring": "Activity",
                "Logging": "ScrollText",
                "Tracing": "Route",
                "Observability": "Eye",
            },
        },
        "Security": {
            "icon": "ShieldCheck",
            "skills": {
                "Cryptography": "KeyRound",
                "Hashing": "Hash",
                "Encryption": "LockKeyhole",
                "TLS": "ShieldCheck",
                "OAuth 2.0": "KeyRound",
                "OpenID Connect": "BadgeCheck",
                "JWT": "FileKey",
                "Session Security": "UserRoundCheck",
                "Password Hashing": "KeyRound",
                "OWASP": "ShieldAlert",
                "SQL Injection": "DatabaseZap",
                "XSS": "CodeXml",
                "CSRF": "ShieldAlert",
                "SSRF": "GlobeLock",
                "CORS": "Globe",
                "CSP": "Shield",
                "RBAC": "UsersRound",
                "ABAC": "UserCog",
                "Secrets Management": "KeyRound",
                "Zero Trust": "ShieldCheck",
            },
        },
        "Data Engineering": {
            "icon": "Workflow",
            "skills": {
                "ETL": "ArrowRightLeft",
                "ELT": "ArrowRightLeft",
                "Data Pipelines": "Workflow",
                "Data Warehouse": "Warehouse",
                "Data Lake": "Waves",
                "Data Lakehouse": "Building2",
                "Apache Kafka": "Radio",
                "Apache Spark": "Sparkles",
                "Stream Processing": "Activity",
                "Batch Processing": "Layers",
                "Data Modeling": "Network",
                "Columnar Storage": "Columns3",
                "CDC": "RefreshCw",
                "Data Quality": "BadgeCheck",
                "Data Governance": "ShieldCheck",
            },
        },
        "AI & Machine Learning": {
            "icon": "BrainCircuit",
            "skills": {
                "Machine Learning": "Brain",
                "Deep Learning": "BrainCircuit",
                "Neural Networks": "Network",
                "Transformers": "Sparkles",
                "LLM": "MessageSquareText",
                "Generative AI": "WandSparkles",
                "Prompt Engineering": "MessageSquareCode",
                "Embeddings": "Boxes",
                "Vector Search": "Search",
                "RAG": "BookOpenCheck",
                "Vector Database": "Database",
                "Fine-Tuning": "SlidersHorizontal",
                "LoRA": "GitBranch",
                "Inference": "Cpu",
                "Quantization": "Grid2X2",
                "Model Evaluation": "ChartNoAxesCombined",
                "AI Agents": "Bot",
                "Tool Calling": "Wrench",
                "Function Calling": "FunctionSquare",
                "MLOps": "Workflow",
            },
        },
        "Testing": {
            "icon": "TestTube2",
            "skills": {
                "Unit Testing": "TestTube2",
                "Integration Testing": "Combine",
                "End-to-End Testing": "Route",
                "Test-Driven Development": "RefreshCw",
                "Mocking": "Copy",
                "Test Automation": "Bot",
                "Performance Testing": "Gauge",
                "Load Testing": "Gauge",
                "Contract Testing": "FileCheck",
            },
        },
        "Software Architecture": {
            "icon": "Boxes",
            "skills": {
                "SOLID": "Layers3",
                "Design Patterns": "Shapes",
                "Clean Architecture": "Building2",
                "Hexagonal Architecture": "Hexagon",
                "Layered Architecture": "Layers",
                "Domain-Driven Design": "Boxes",
                "Dependency Injection": "Plug",
                "Modular Monolith": "Package",
                "Event-Driven Architecture": "Workflow",
            },
        },
        "Developer Tools": {
            "icon": "Wrench",
            "skills": {
                "Git": "GitBranch",
                "GitHub": "Github",
                "GitHub Actions": "Workflow",
                "Bash": "Terminal",
                "Command Line": "SquareTerminal",
            },
        },
    }

    for category_name, category_data in data.items():
        category, _ = Category.objects.get_or_create(
            name=category_name,
            defaults={
                "slug": category_name.lower().replace(" ", "-"),
                "icon": category_data["icon"],
            },
        )

        for skill_name, skill_icon in category_data["skills"].items():
            Skill.objects.get_or_create(
                category=category,
                name=skill_name,
                defaults={
                    "slug": (
                        skill_name.lower()
                        .replace(" ", "-")
                        .replace("&", "and")
                        .replace("/", "-")
                    ),
                    "icon": skill_icon,
                },
            )


def remove_data(apps, schema_editor):
    Category = apps.get_model("flashcards", "Category")

    category_names = [
        "Computer Science",
        "Programming Languages",
        "Backend",
        "Frontend",
        "Database",
        "System Design",
        "Cloud",
        "Infrastructure",
        "Security",
        "Data Engineering",
        "AI & Machine Learning",
        "Testing",
        "Software Architecture",
        "Developer Tools",
    ]

    Category.objects.filter(name__in=category_names).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("flashcards", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            seed_data,
            remove_data,
        ),
    ]
