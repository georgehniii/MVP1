DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;
CREATE TABLE categories (category_id INT PRIMARY KEY, category TEXT);
CREATE TABLE items (item_id SERIAL PRIMARY KEY, category_id INT refErences categories(category_id), item_name TEXT, price FLOAT);