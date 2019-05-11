-- Verify agent:appschema on pg
 BEGIN;


SELECT pg_catalog.has_schema_privilege('agent', 'usage');


ROLLBACK;

