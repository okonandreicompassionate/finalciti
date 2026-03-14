CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  balance NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  brand TEXT NOT NULL,
  bg TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar TEXT,
  name TEXT NOT NULL,
  time_label TEXT,
  amount NUMERIC(15,2) NOT NULL,
  income BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS balance_history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month_label TEXT NOT NULL,
  income_total NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  expense_total NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (full_name, email, password)
VALUES ('Alexander', 'demo@hubio.com', 'demo123')
ON CONFLICT (email) DO NOTHING;

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 6600.00, 'Master Card', 'linear-gradient(135deg, #003d99 0%, #0052cc 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 1400.00, 'Visa Card', 'linear-gradient(135deg, #ff5a6f 0%, #ff4760 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 2090.00, 'Visa Card', 'linear-gradient(135deg, #42d1db 0%, #35bfd2 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 6600.00, 'Master Card', 'linear-gradient(135deg, #1f234d 0%, #0f1230 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'H', 'Monthly home rent', 'August 4, 1:00 PM', -664.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'E', 'Emma Megan', 'August 4, 1:00 PM', 664.00, true
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'A', 'Amazon Purchasing', 'August 4, 1:00 PM', -200.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'J', 'Jillian Wyatt', 'August 4, 1:00 PM', -750.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'C', 'Carla Houston', 'August 4, 1:00 PM', -664.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'S', 'Monthly subscription', 'August 4, 1:00 PM', -99.99, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Jan', 12000, 8000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Feb', 18000, 12000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Mar', 22000, 14000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Apr', 24000, 10000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'May', 26000, 12000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Jun', 21000, 9000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Jul', 30000, 15000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Aug', 24500, 13660 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Sep', 32000, 18000 FROM users WHERE email = 'demo@hubio.com';
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  balance NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  brand TEXT NOT NULL,
  bg TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  avatar TEXT,
  name TEXT NOT NULL,
  time_label TEXT,
  amount NUMERIC(15,2) NOT NULL,
  income BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS balance_history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month_label TEXT NOT NULL,
  income_total NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  expense_total NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (full_name, email, password)
VALUES ('Alexander', 'demo@hubio.com', 'demo123')
ON CONFLICT (email) DO NOTHING;

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 6600.00, 'Master Card', 'linear-gradient(135deg, #003d99 0%, #0052cc 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 1400.00, 'Visa Card', 'linear-gradient(135deg, #ff5a6f 0%, #ff4760 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 2090.00, 'Visa Card', 'linear-gradient(135deg, #42d1db 0%, #35bfd2 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO cards (user_id, card_number, status, balance, brand, bg)
SELECT id, '4008 •••• •••• 9464', 'Active', 6600.00, 'Master Card', 'linear-gradient(135deg, #1f234d 0%, #0f1230 100%)'
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'H', 'Monthly home rent', 'August 4, 1:00 PM', -664.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'E', 'Emma Megan', 'August 4, 1:00 PM', 664.00, true
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'A', 'Amazon Purchasing', 'August 4, 1:00 PM', -200.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'J', 'Jillian Wyatt', 'August 4, 1:00 PM', -750.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'C', 'Carla Houston', 'August 4, 1:00 PM', -664.00, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO transactions (user_id, avatar, name, time_label, amount, income)
SELECT id, 'S', 'Monthly subscription', 'August 4, 1:00 PM', -99.99, false
FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Jan', 12000, 8000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Feb', 18000, 12000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Mar', 22000, 14000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Apr', 24000, 10000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'May', 26000, 12000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Jun', 21000, 9000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Jul', 30000, 15000 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Aug', 24500, 13660 FROM users WHERE email = 'demo@hubio.com';

INSERT INTO balance_history (user_id, month_label, income_total, expense_total)
SELECT id, 'Sep', 32000, 18000 FROM users WHERE email = 'demo@hubio.com';