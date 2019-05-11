-- Revert agent:appschema from pg
BEGIN;

DROP SCHEMA agent;

COMMIT;

