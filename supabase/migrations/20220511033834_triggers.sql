-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
  BEGIN
    INSERT INTO public."Users" ("_id", "name", "displayName")
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'user_name');
    RETURN NEW;
  END;
  
$BODY$;

ALTER FUNCTION public.create_profile_for_new_user()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.create_profile_for_new_user() TO authenticated;

GRANT EXECUTE ON FUNCTION public.create_profile_for_new_user() TO postgres;

GRANT EXECUTE ON FUNCTION public.create_profile_for_new_user() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.create_profile_for_new_user() TO anon;

GRANT EXECUTE ON FUNCTION public.create_profile_for_new_user() TO service_role;

CREATE OR REPLACE FUNCTION public.name_lower()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
BEGIN
  new.name := LOWER(new.name);
  RETURN new;
END;
$BODY$;

ALTER FUNCTION public.name_lower()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.name_lower() TO authenticated;

GRANT EXECUTE ON FUNCTION public.name_lower() TO postgres;

GRANT EXECUTE ON FUNCTION public.name_lower() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.name_lower() TO anon;

GRANT EXECUTE ON FUNCTION public.name_lower() TO service_role;

CREATE OR REPLACE FUNCTION public.delete_profile_for_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
  BEGIN
    DELETE FROM public."Users" WHERE "_id"=auth.id();
    RETURN NEW;
  END;
  
$BODY$;

ALTER FUNCTION public.delete_profile_for_user()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.delete_profile_for_user() TO authenticated;

GRANT EXECUTE ON FUNCTION public.delete_profile_for_user() TO postgres;

GRANT EXECUTE ON FUNCTION public.delete_profile_for_user() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.delete_profile_for_user() TO anon;

GRANT EXECUTE ON FUNCTION public.delete_profile_for_user() TO service_role;

CREATE TRIGGER categories_name_lower_trigger
    BEFORE INSERT OR UPDATE 
    ON public."Categories"
    FOR EACH ROW
    EXECUTE FUNCTION public.name_lower();

CREATE TRIGGER ingredients_name_lower_trigger
    BEFORE INSERT OR UPDATE 
    ON public."Ingredients"
    FOR EACH ROW
    EXECUTE FUNCTION public.name_lower();
