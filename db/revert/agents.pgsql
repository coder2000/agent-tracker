-- Revert agent:agents from pg
BEGIN;

DROP TABLE agent.agents;

COMMIT;

