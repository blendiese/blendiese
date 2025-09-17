CREATE INDEX IF NOT EXISTS idx_github_repositories_user_id ON public.github_repositories(user_id);
CREATE INDEX IF NOT EXISTS idx_github_users_user_id ON public.github_users(user_id);
CREATE INDEX IF NOT EXISTS idx_github_token_headers_user_id ON public.github_token_headers(user_id);
CREATE INDEX IF NOT EXISTS idx_github_tokens_user_id ON private.github_tokens(user_id);
