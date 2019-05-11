-- Deploy agent:get_timestamp to pg
-- requires: appschema

BEGIN;

CREATE OR REPLACE FUNCTION get_timestamp ()
  RETURNS TRIGGER
  AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

COMMIT;

