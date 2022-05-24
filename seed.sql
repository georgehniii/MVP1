DELETE FROM items;
DELETE FROM categories;
INSERT INTO categories (category_id,category) VALUES (1,"Lights");
INSERT INTO categories (category_id,category) VALUES (2,"Recovery Gear");
INSERT INTO categories (category_id,category) VALUES (3,"Tires");
INSERT INTO items (category_id,item_name,price) VALUES (1,"KC Daylighters",45.00);
INSERT INTO items (category_id,item_name,price) VALUES (1,"KC Gravity",60.25);
INSERT INTO items (category_id,item_name,price) VALUES (2,"WARN winch",600.62);
INSERT INTO items (category_id,item_name,price) VALUES (3,"BF Goodwrench KO2",235.47);