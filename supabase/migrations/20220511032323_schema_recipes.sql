-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public."Recipes"
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(26) COLLATE pg_catalog."default" NOT NULL,
    description character varying(240) COLLATE pg_catalog."default",
    url text COLLATE pg_catalog."default",
    "longUrl" text COLLATE pg_catalog."default",
    "UserId" uuid,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT "Recipes_pkey" PRIMARY KEY (_id),
    CONSTRAINT "Recipes_UserId_name_key" UNIQUE ("UserId", name),
    CONSTRAINT "Recipes_UserId_fk" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Recipes"
    OWNER to postgres;

GRANT ALL ON TABLE public."Recipes" TO anon;

GRANT ALL ON TABLE public."Recipes" TO authenticated;

GRANT ALL ON TABLE public."Recipes" TO postgres;

GRANT ALL ON TABLE public."Recipes" TO service_role;