-- Deploy agent:agents to pg
-- requires: appschema

BEGIN;

CREATE TABLE agent.agents (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  firstName TEXT NOT NULL,
  surname TEXT NOT NULL,
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX agent_id_idx ON agent.agents (id);

COMMIT;

