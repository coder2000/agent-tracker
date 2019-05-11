-- Deploy agent:agents to pg
-- requires: appschema

BEGIN;

CREATE TABLE agent.agents (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  firstName TEXT NOT NULL,
  surname TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL
);

COMMIT;

