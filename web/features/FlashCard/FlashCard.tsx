"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import CardStack from "@/components/CardStack/CardStack";

export type CardData = {
  id: number;
  question: string;
  answer: string;
  learnMore?: string;
};

const PRELOAD_THRESHOLD = 3;
const PAGE_SIZE = 10;

/*
 * Dummy data.
 *
 * Untuk sekarang semua skill menggunakan
 * deck yang sama.
 */
const dummyCards: CardData[] = [
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

Indexes improve read performance but introduce additional storage and write overhead.
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

Common strategies include:

- Cache-aside
- Read-through
- Write-through
- Write-behind
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

Common examples include Kafka, RabbitMQ, and AWS SQS.
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

This allows workloads to be distributed across multiple instances.
    `,
  },

  {
    id: 7,
    question: "What is a load balancer?",
    answer: "A load balancer distributes incoming traffic across multiple servers or instances.",
    learnMore: `
## Load Balancer

A load balancer sits between clients and application servers.

It can distribute traffic using strategies such as:

- Round robin
- Least connections
- Weighted routing
- IP hashing
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

\`\`\`
GET    /users
GET    /users/123
POST   /users
PUT    /users/123
DELETE /users/123
\`\`\`
    `,
  },

  {
    id: 9,
    question: "What is a database connection pool?",
    answer:
      "A connection pool maintains reusable database connections so applications don't need to create a new connection for every request.",
    learnMore: `
## Connection Pool

Instead of creating a new database connection for every request, applications reuse connections from a pool.

This reduces connection overhead and helps control the number of active database connections.
    `,
  },

  {
    id: 10,
    question: "What is eventual consistency?",
    answer:
      "Eventual consistency means distributed replicas may temporarily differ but will eventually converge to the same state.",
    learnMore: `
## Eventual Consistency

In a distributed system, replicated data may temporarily differ between nodes.

Eventually, replication catches up and the replicas converge to the same state.

This model is commonly used when availability and scalability are prioritized over immediate consistency.
    `,
  },
];

type FlashCardProps = {
  skillId: string;
};

export default function FlashCard({ skillId }: FlashCardProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  // NEW
  const [hasMore, setHasMore] = useState(true);

  /*
   * Dummy fetch.
   *
   * Nanti tinggal diganti dengan:
   *
   * GET /api/cards?skill={skillId}&page={page}&limit=10
   */
  const fetchCards = async (pageNumber: number) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const start = (pageNumber - 1) * PAGE_SIZE;

    const end = start + PAGE_SIZE;

    return dummyCards.slice(start, end);
  };

  /*
   * Initial fetch
   */
  useEffect(() => {
    let cancelled = false;

    const loadInitialCards = async () => {
      const newCards = await fetchCards(1);

      if (cancelled) return;

      setCards(newCards);
      setPage(1);
      setCurrentIndex(0);

      setHasMore(newCards.length === PAGE_SIZE);
    };

    loadInitialCards();

    return () => {
      cancelled = true;
    };
  }, [skillId]);

  /*
   * Fetch next page when approaching
   * the end of the current cards.
   */
  useEffect(() => {
    if (cards.length === 0) return;

    if (!hasMore) return;

    const remaining = cards.length - currentIndex - 1;

    if (remaining > PRELOAD_THRESHOLD) {
      return;
    }

    const nextPage = page + 1;

    let cancelled = false;

    const loadNextPage = async () => {
      const newCards = await fetchCards(nextPage);

      if (cancelled) return;

      /*
       * No more cards available.
       */
      if (newCards.length === 0) {
        setHasMore(false);
        return;
      }

      setCards((current) => [...current, ...newCards]);

      setPage(nextPage);

      /*
       * If returned less than PAGE_SIZE,
       * this is the last page.
       */
      if (newCards.length < PAGE_SIZE) {
        setHasMore(false);
      }
    };

    loadNextPage();

    return () => {
      cancelled = true;
    };
  }, [currentIndex, cards.length, page, hasMore]);

  /*
   * Next card
   */
  const handleNext = () => {
    setCurrentIndex((current) => current + 1);
  };

  /*
   * Previous card
   */
  const handlePrev = () => {
    setCurrentIndex((current) => Math.max(current - 1, 0));
  };

  /*
   * Finished
   */
  const isFinished = cards.length > 0 && currentIndex >= cards.length;

  if (isFinished) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="
            flex
            items-center
            gap-2
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-700
          "
            >
              <ArrowLeft size={16} />

              <span className="capitalize">{skillId}</span>
            </a>

            <span className="text-sm text-zinc-400">
              {isFinished
                ? `${cards.length} / ${cards.length}`
                : `${currentIndex + 1} / ${cards.length}`}
            </span>
          </div>

          {/* Card / Completed */}
          <div className="flex flex-1 items-center justify-center">
            {isFinished ? (
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-4xl">🎉</div>

                <h1 className="text-xl font-semibold text-zinc-900">All cards completed</h1>

                <p className="mt-2 text-sm text-zinc-500">You've finished this deck.</p>
              </div>
            ) : (
              <CardStack cards={cards} currentIndex={currentIndex} onNext={handleNext} />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 pb-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0 || isFinished}
              className="
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-900
            disabled:pointer-events-none
            disabled:opacity-20
          "
            >
              ← Previous
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isFinished}
              className="
            text-sm
            text-zinc-400
            transition
            hover:text-zinc-900
            disabled:pointer-events-none
            disabled:opacity-20
          "
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Loading
   */
  if (cards.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm text-zinc-400">Loading cards...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6 py-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <a
            href="/"
            className="
              flex
              items-center
              gap-2
              text-sm
              text-zinc-400
              transition
              hover:text-zinc-700
            "
          >
            <ArrowLeft size={16} />

            <span className="capitalize">{skillId}</span>
          </a>

          <span className="text-sm text-zinc-400">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>

        {/* Card */}

        <div className="flex flex-1 items-center justify-center">
          <CardStack cards={cards} currentIndex={currentIndex} onNext={handleNext} />
        </div>

        {/* Navigation */}

        <div className="flex items-center justify-center gap-6 pb-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="
              text-sm
              text-zinc-400
              transition
              hover:text-zinc-900
              disabled:pointer-events-none
              disabled:opacity-20
            "
          >
            ← Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="
              text-sm
              text-zinc-400
              transition
              hover:text-zinc-900
            "
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}
