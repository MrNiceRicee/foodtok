CREATE OR REPLACE FUNCTION public.ingredients_name_lower()
  RETURNS TRIGGER AS
$$
BEGIN
  new.name := LOWER(new.name);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DROP TRIGGER IF EXISTS ingredients_name_lower_trigger ON public."Ingredients";
CREATE TRIGGER ingredients_name_lower_trigger
  BEFORE UPDATE OR INSERT ON public."Ingredients"
  FOR EACH ROW
  EXECUTE PROCEDURE ingredients_name_lower();


CREATE OR REPLACE FUNCTION
  create_profile_for_new_user()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public."Users" ("_id", "name", "displayName")
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'user_name');
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS create_profile_on_signup ON auth.users;
CREATE TRIGGER create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE create_profile_for_new_user();