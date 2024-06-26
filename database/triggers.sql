-- Lower case ingredient name
CREATE OR REPLACE FUNCTION public.name_lower()
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
  EXECUTE PROCEDURE name_lower();

DROP TRIGGER IF EXISTS categories_name_lower_trigger ON public."Categories";
CREATE TRIGGER categories_name_lower_trigger
  BEFORE UPDATE OR INSERT ON public."Categories"
  FOR EACH ROW
  EXECUTE PROCEDURE name_lower();


-- Create new User
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

-- Delete User
CREATE OR REPLACE FUNCTION
  delete_profile_for_user()
  RETURNS TRIGGER AS
  $$
  BEGIN
    DELETE FROM public."Users" WHERE "_id"=auth.id();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS delete_profile_for_user ON auth.users;
CREATE TRIGGER delete_profile_for_user
  BEFORE DELETE ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE delete_profile_for_user();