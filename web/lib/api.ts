export type CardData = {
  id: number;
  question: string;
  answer: string;
  learnMore?: string;
};

export type CardsResponse = {
  results: CardData[];
  count: number;
  next: boolean;
};

const dummyCards: CardData[] = [
  {
    id: 1,
    question: "What is MVCC in PostgreSQL?",
    answer:
      "MVCC allows PostgreSQL to handle concurrent transactions by maintaining multiple versions of rows.",
    learnMore: `
## MVCC

**MVCC (Multi-Version Concurrency Control)** allows PostgreSQL to provide transaction isolation without requiring readers to block writers.

When a row is updated, PostgreSQL doesn't simply overwrite the existing row immediately. Instead, a new row version is created.

### Example

Suppose we have:

\`\`\`sql
UPDATE users
SET name = 'Indra'
WHERE id = 1;
\`\`\`

A transaction that started before the update may still see the old version of the row, while a newer transaction can see the updated version.

### Why is this useful?

MVCC allows:

- Readers to continue reading while writers update data
- Writers to continue without blocking readers
- Consistent snapshots for transactions
- Better concurrency for typical workloads

### Important

Old row versions eventually need to be cleaned up by PostgreSQL's **VACUUM** process.

This is one reason why understanding MVCC is important when tuning PostgreSQL performance.
  `,
  },
  {
    id: 2,
    question: "What is a database index?",
    answer:
      "An index is a data structure that helps a database find rows faster without scanning the entire table. It improves read performance but adds storage and write overhead.",
  },
  {
    id: 3,
    question: "What is a database transaction?",
    answer:
      "A transaction is a group of database operations executed as a single unit. It follows ACID properties so changes are committed together or rolled back when necessary.",
  },
  {
    id: 4,
    question: "What is the difference between SQL and NoSQL databases?",
    answer:
      "SQL databases usually use structured schemas and relational tables, while NoSQL databases commonly use models such as documents, key-value pairs, or wide columns. The choice depends on access patterns and consistency requirements.",
  },
  {
    id: 5,
    question: "What is database normalization?",
    answer:
      "Normalization organizes relational data to reduce duplication and prevent update anomalies. It typically splits data into related tables connected through keys.",
  },
  {
    id: 6,
    question: "What is Redis?",
    answer:
      "Redis is an in-memory data store commonly used for caching, session storage, queues, counters, and other low-latency workloads. It supports data structures such as strings, lists, sets, and hashes.",
  },
  {
    id: 7,
    question: "What is a cache?",
    answer:
      "A cache stores frequently accessed data closer to the consumer so it can be retrieved faster than from the original source. The main challenge is keeping cached data sufficiently fresh.",
  },
  {
    id: 8,
    question: "What is cache invalidation?",
    answer:
      "Cache invalidation is the process of removing or updating cached data when the underlying data changes. It is difficult because stale data can remain available if invalidation is missed or delayed.",
  },
  {
    id: 9,
    question: "What is the N+1 query problem?",
    answer:
      "The N+1 problem occurs when an application executes one query to fetch a collection and then performs another query for each item. It can cause a large number of unnecessary database queries.",
  },
  {
    id: 10,
    question: "What is a database deadlock?",
    answer:
      "A deadlock happens when two or more transactions wait for locks held by each other, so none can continue. Databases typically detect deadlocks and abort one transaction to resolve the cycle.",
  },
  {
    id: 11,
    question: "What is REST?",
    answer:
      "REST is an architectural style for designing networked APIs around resources and standard HTTP semantics. REST APIs commonly use methods such as GET, POST, PUT, PATCH, and DELETE.",
  },
  {
    id: 12,
    question: "What is idempotency in an API?",
    answer:
      "An operation is idempotent when performing it multiple times has the same intended result as performing it once. PUT and DELETE are generally designed to be idempotent, while POST usually is not.",
  },
  {
    id: 13,
    question: "What is the difference between PUT and PATCH?",
    answer:
      "PUT is generally used to replace a resource representation, while PATCH applies a partial modification. The exact semantics depend on the API implementation.",
  },
  {
    id: 14,
    question: "What is middleware?",
    answer:
      "Middleware is software that runs between an incoming request and the final request handler. It is commonly used for authentication, logging, validation, rate limiting, and request transformation.",
  },
  {
    id: 15,
    question: "What is dependency injection?",
    answer:
      "Dependency injection is a design technique where an object's dependencies are provided from outside instead of being created internally. It improves testability, modularity, and separation of concerns.",
  },
  {
    id: 16,
    question: "What is a message queue?",
    answer:
      "A message queue allows producers to send messages that consumers process asynchronously. It helps decouple services and can absorb traffic spikes.",
  },
  {
    id: 17,
    question: "What is Kafka commonly used for?",
    answer:
      "Apache Kafka is a distributed event streaming platform commonly used for high-throughput event pipelines, log aggregation, data integration, and event-driven architectures.",
  },
  {
    id: 18,
    question: "What is the difference between a queue and pub/sub?",
    answer:
      "In a traditional queue, a message is typically processed by one consumer from a group. In pub/sub, a published message can be delivered to multiple subscribers independently.",
  },
  {
    id: 19,
    question: "What is eventual consistency?",
    answer:
      "Eventual consistency means that replicas may temporarily contain different values, but if no new updates occur, they will eventually converge to the same state.",
  },
  {
    id: 20,
    question: "What is a distributed system?",
    answer:
      "A distributed system consists of multiple independent computers that work together as a single system. Its challenges include network failures, partial failures, consistency, coordination, and latency.",
  },
  {
    id: 21,
    question: "What is horizontal scaling?",
    answer:
      "Horizontal scaling means adding more instances or machines to handle increased load. It is often combined with load balancing and stateless application design.",
  },
  {
    id: 22,
    question: "What is a load balancer?",
    answer:
      "A load balancer distributes incoming traffic across multiple servers or service instances. It can improve availability, scalability, and fault tolerance.",
  },
  {
    id: 23,
    question: "What is a reverse proxy?",
    answer:
      "A reverse proxy sits in front of backend servers and forwards client requests to them. It can provide TLS termination, routing, caching, compression, and load balancing.",
  },
  {
    id: 24,
    question: "What is Docker?",
    answer:
      "Docker packages an application and its dependencies into containers so it can run consistently across environments. Containers share the host kernel but isolate processes and filesystem resources.",
  },
  {
    id: 25,
    question: "What is Kubernetes?",
    answer:
      "Kubernetes is a container orchestration platform that automates deployment, scaling, service discovery, and management of containerized applications across a cluster.",
  },
  {
    id: 26,
    question: "What is an AWS Availability Zone?",
    answer:
      "An Availability Zone is an isolated location within an AWS Region containing one or more data centers. Deploying across multiple Availability Zones can improve application availability.",
  },
  {
    id: 27,
    question: "What is AWS S3?",
    answer:
      "Amazon S3 is an object storage service designed to store and retrieve objects such as files, images, backups, and datasets. It provides high durability and integrates with many AWS services.",
  },
  {
    id: 28,
    question: "What is AWS IAM?",
    answer:
      "AWS Identity and Access Management controls authentication and authorization for AWS resources. IAM policies define what actions identities are allowed or denied to perform.",
  },
  {
    id: 29,
    question: "What is a CDN?",
    answer:
      "A Content Delivery Network distributes cached content through geographically distributed edge locations. It reduces latency by serving content closer to users.",
  },
  {
    id: 30,
    question: "What is the difference between authentication and authorization?",
    answer:
      "Authentication verifies who a user or system is. Authorization determines what that authenticated identity is allowed to access or perform.",
  },
  {
    id: 31,
    question: "What is JWT?",
    answer:
      "JWT (JSON Web Token) is a compact token format that can carry signed claims between parties. It is commonly used for stateless authentication, although it does not automatically make an authentication system secure.",
  },
  {
    id: 32,
    question: "What is a race condition?",
    answer:
      "A race condition occurs when the result of a program depends on the timing or ordering of concurrent operations. Proper synchronization or atomic operations can prevent incorrect states.",
  },
  {
    id: 33,
    question: "What is garbage collection?",
    answer:
      "Garbage collection automatically identifies and reclaims memory that is no longer reachable by a program. It reduces manual memory-management work but can introduce runtime overhead.",
  },
  {
    id: 34,
    question: "What is Big O notation?",
    answer:
      "Big O notation describes how an algorithm's resource usage grows as its input size increases. For example, binary search has O(log n) time complexity.",
  },
  {
    id: 35,
    question: "What is the CAP theorem?",
    answer:
      "The CAP theorem states that a distributed data system cannot simultaneously guarantee consistency, availability, and partition tolerance under a network partition. In practice, partition tolerance is required, so systems make trade-offs between consistency and availability.",
  },
];

const PAGE_SIZE = 10;

export async function fetchCards(page: number): Promise<CardsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const start = (page - 1) * PAGE_SIZE;

  const end = start + PAGE_SIZE;

  const results = dummyCards.slice(start, end);

  return {
    results,
    count: dummyCards.length,
    next: end < dummyCards.length,
  };
}
