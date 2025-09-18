CREATE OR REPLACE FUNCTION "public"."fetch_github_token"("user_id" uuid) RETURNS table (token varchar)
    LANGUAGE "plpgsql" SECURITY DEFINER set search_path = ''
    AS $$
BEGIN
    return query select private.github_tokens.token from private.github_tokens where private.github_tokens.user_id = fetch_github_token.user_id limit 1;
END;$$;