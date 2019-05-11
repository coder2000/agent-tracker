-- Verify agent:agents on pg
 BEGIN;


SELECT id,
       email,
       firstName,
       surname,
       createdAt
FROM agent.agents
WHERE FALSE;


ROLLBACK;

