CREATE OR REPLACE FUNCTION "public"."upsert_github_token"("token" character varying) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER set search_path = ''
    AS $$declare new_id int8;
BEGIN
  insert into public.github_token_headers (user_id, created_at)
  values (auth.uid(), now())
  on conflict (user_id) do update
  set created_at = excluded.created_at
  returning id into new_id;

  delete from private.github_tokens where id = new_id;

  insert into private.github_tokens (id, user_id, token)
  values (new_id, auth.uid(), token);
END;$$;