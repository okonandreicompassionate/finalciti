INSERT INTO users (full_name, email, password, balance)
VALUES ('Demo User', 'demo@hubio.com', 'demo123', 250000.00)
ON CONFLICT (email) DO NOTHING;