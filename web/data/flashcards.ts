export type CardData = {
  id: number;
  question: string;
  answer: string;
  learnMore?: string;
};

export const flashcards: CardData[] = [
  {
    id: 1,
    question: "What is MVCC in PostgreSQL?",
    answer:
      "MVCC allows PostgreSQL to handle concurrent transactions by maintaining multiple versions of rows.",
    learnMore: `
## MVCC

**MVCC (Multi-Version Concurrency Control)** allows PostgreSQL to provide transaction isolation without unnecessarily blocking readers and writers.

When a row is updated, PostgreSQL creates a new row version instead of immediately replacing the old one.

### Why is it useful?

- Readers can continue while writers update data
- Writers don't necessarily block readers
- Transactions can see consistent snapshots
- Better concurrency

Old row versions are eventually cleaned up by **VACUUM**.
    `,
  },

  {
    id: 2,
    question: "What is a database index?",
    answer:
      "An index is a data structure that helps a database find rows faster without scanning the entire table.",
    learnMore: `
## Database Index

An index provides an alternative lookup path to data stored in a table.

For example:

\`\`\`sql
CREATE INDEX idx_users_email
ON users(email);
\`\`\`

Without an appropriate index, the database may need to perform a sequential scan.

With an index, it may use an index scan or another index-based execution strategy.

### Trade-offs

Indexes improve read performance but introduce:

- Additional storage
- Slower INSERT operations
- Slower UPDATE operations
- Slower DELETE operations

Indexes should therefore be created based on actual query patterns.
    `,
  },

  {
    id: 3,
    question: "What is a transaction?",
    answer: "A transaction is a sequence of database operations treated as a single unit of work.",
    learnMore: `
## Transaction

A transaction groups multiple database operations into a single logical unit.

Transactions generally follow the **ACID** properties:

- Atomicity
- Consistency
- Isolation
- Durability

Example:

\`\`\`sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
\`\`\`

If something fails before \`COMMIT\`, the transaction can be rolled back.
    `,
  },

  {
    id: 4,
    question: "What is caching?",
    answer:
      "Caching stores frequently accessed data in a faster storage layer to reduce latency and backend load.",
    learnMore: `
## Caching

A cache stores data temporarily so future requests can retrieve it faster.

A common architecture is:

\`\`\`
Client
  ↓
API
  ↓
Cache
  ↓
Database
\`\`\`

If the requested data exists in the cache, the application can return it without querying the database.

### Common cache strategies

- Cache-aside
- Read-through
- Write-through
- Write-behind

A cache usually introduces a trade-off between performance and data freshness.
    `,
  },

  {
    id: 5,
    question: "What is a message queue?",
    answer:
      "A message queue allows services to communicate asynchronously by sending messages through an intermediate broker.",
    learnMore: `
## Message Queue

A message queue decouples producers from consumers.

\`\`\`
Producer
   ↓
 Queue
   ↓
Consumer
\`\`\`

The producer does not need to wait for the consumer to finish processing the message.

### Benefits

- Asynchronous processing
- Service decoupling
- Load smoothing
- Retry mechanisms
- Better resilience

Examples include Kafka, RabbitMQ, and AWS SQS.
    `,
  },

  {
    id: 6,
    question: "What is horizontal scaling?",
    answer:
      "Horizontal scaling means adding more machines or instances to handle increasing workloads.",
    learnMore: `
## Horizontal Scaling

Instead of making one server more powerful, horizontal scaling adds more servers.

\`\`\`
              Load Balancer
              /     |     \\
             /      |      \\
          Server  Server  Server
\`\`\`

This allows workloads to be distributed across multiple instances.

### Horizontal vs Vertical

**Vertical scaling**

Increase the resources of one machine.

**Horizontal scaling**

Add more machines.

Horizontal scaling is commonly used in distributed systems because it allows capacity to grow across multiple instances.
    `,
  },

  {
    id: 7,
    question: "What is a load balancer?",
    answer: "A load balancer distributes incoming traffic across multiple servers or instances.",
    learnMore: `
## Load Balancer

A load balancer sits between clients and application servers.

\`\`\`
Clients
   ↓
Load Balancer
   ↓
┌───────┬───────┬───────┐
│ App 1 │ App 2 │ App 3 │
└───────┴───────┴───────┘
\`\`\`

It can distribute traffic using strategies such as:

- Round robin
- Least connections
- Weighted routing
- IP hashing

Load balancers also commonly provide health checks and failover.
    `,
  },

  {
    id: 8,
    question: "What is a REST API?",
    answer:
      "A REST API is an HTTP-based interface that exposes resources through standardized operations.",
    learnMore: `
## REST API

REST commonly models application data as resources.

For example:

\`\`\`
GET    /users
GET    /users/123
POST   /users
PUT    /users/123
DELETE /users/123
\`\`\`

REST APIs typically use HTTP methods and status codes to communicate the result of an operation.

### Common principles

- Stateless communication
- Resource-oriented URLs
- Standard HTTP methods
- Representation of resources
    `,
  },

  {
    id: 9,
    question: "What is a database connection pool?",
    answer:
      "A connection pool maintains reusable database connections so applications don't need to create a new connection for every request.",
    learnMore: `
## Connection Pool

Creating a database connection can be relatively expensive.

Instead of:

\`\`\`
Request
  ↓
Create connection
  ↓
Query
  ↓
Close connection
\`\`\`

A connection pool keeps connections available:

\`\`\`
        Connection Pool
      ┌────┬────┬────┐
      │ C1 │ C2 │ C3 │
      └────┴────┴────┘
          ↓
       Requests
\`\`\`

Applications borrow a connection, execute queries, and return the connection to the pool.

Pool size is important because too many connections can overload the database.
    `,
  },

  {
    id: 10,
    question: "What is eventual consistency?",
    answer:
      "Eventual consistency means distributed replicas may temporarily differ but will eventually converge to the same state.",
    learnMore: `
## Eventual Consistency

In a distributed system, data may be replicated across multiple nodes.

Immediately after an update:

\`\`\`
Primary → Updated
Replica → Old data
\`\`\`

After replication catches up:

\`\`\`
Primary → Updated
Replica → Updated
\`\`\`

This model trades immediate consistency for properties such as:

- Availability
- Lower latency
- Scalability
- Partition tolerance

It is common in distributed databases and eventually consistent systems.
    `,
  },
];
