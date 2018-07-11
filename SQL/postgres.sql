-- 1. Create necessary table with proper primary, foreign keys
-- 2. Insert 10 books; Each book will have one author; Some authors should have multiple books.
-- 3. Assign categories to each books; One book can have many categories
-- 4. Insert 5 users
-- 5. Record 10 loan activity; One book can only be loaned by one user at a time
-- 6. Select available books
-- 7. Select books for a specific author; Returned list should be order by their titles
-- 8. Add category filter to 7;
-- 9. Fetch the books that were loaned between date “A” and “B”
-- 10. User wants to return a loaned book. Write an update query to make this happen.
-- 11. Another user wants to return multiple loaned book. Write an update query to make this happen.
-- 12. Check what happens when you want to delete an author; What needs to be done ?
-- 13. Write a query to delete users who have not leased any books for a month
-- 14. Write a query to blacklist users who have not returned book for a month

-- CREATE TABLE AUTHORS 
CREATE TABLE IF NOT EXISTS authors(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- CREATING BOOKS TABLE 
CREATE TABLE IF NOT EXISTS books(
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    author_id INTEGER REFERENCES authors(id),
);


--CREATE TABLE USERS ---
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL
);

--CREATE TABLE LOANS -----------
CREATE TABLE IF NOT EXISTS loans(
    id SERIAL PRIMARY KEY,
    borrowers_id INTEGER REFERENCES users(id),
    book_id INTEGER REFERENCES books(id),
    issued_date DATE NOT NULL,
    due_date DATE,
    returned_date DATE
);

-- CREATE CATEGORY TABLE
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- BOOKS CATEGORIES ----------
CREATE TABLE IF NOT EXISTS books_categories(
    id SERIAL PRIMARY KEY,
    book_id INTEGER REFERENCES books(id),
    category_id INTEGER REFERENCES categories(id)
);

-- INSERT INTO AUTHORS TABLE 
INSERT INTO authors (name) VALUES 
    ('Akash'), --programming
    ('Shankar'), --fiction
    ('Ayush'), --science
    ('Manish'); --politics

-- 2. Insert 10 books; Each book will have one author; Some authors should have multiple books.

INSERT INTO books ( isbn, name, author_id) VALUES 
    ('233-333-222', 'Let Us C', 1),
    ('253-3313-2232', 'Avvance C ++', 1),
    ('2534-3213-2132', 'JS for beginners', 1),
    ('2534-3213-2132', 'JS for beginners', 1),
    ('2222-333-2111', 'Palpasa Cafe', 2),
    ('22-3323-5511', 'Yellow Girl', 2),
    ('244-43534-11', 'Ready Player 1', 2),
    ('2342-3454-2444', 'Principle of Physics', 3),
    ('242-33354-24', 'Organic Chemistry', 3),
    ('24442-324-2411', 'Lets Dive Into Biology', 3),
    ('2333-322-255', 'PrayogShala', 4),
    ('67676-5656-122', 'Nepali Politics', 4),
    ('67676-5656-122', 'India-Nepal Relationship', 4);

INSERT INTO categories (name) VALUES 
    ('Programming'),
    ('Fiction'),
    ('Science'),
    ('Politics');

-- 3. Assign categories to each books; One book can have many categories

INSERT INTO books_categories ( book_id , category_id ) VALUES 
    (1,1),
    (2,1),
    (3,1),
    (4,1),
    (5,2),
    (6,2),
    (7,2),
    (8,3),
    (9,3),
    (10,3),
    (11,4),
    (12,4),
    (13,4);
-- 4. Insert 5 users
INSERT INTO users (user_name) VALUES
 ('Ram Shrestha'), --1
 ('John Doe'), --2
 ('Pitter Magar'), --3
 ('Messi Adhikari'), --4
 ('Cristiano Bhattari'); --5

 -- 5. Record 10 loan activity; One book can only be loaned by one user at a time
 INSERT INTO loans ( borrowers_id, book_id, issued_date, due_date, returned_date) VALUES
       (1, 1, '2018-01-08', '2018-02-08','2018-02-01' ),
       (1, 2, '2018-02-10', '2018-03-10', NULL ),
       (2, 1, '2018-03-20', '2018-04-20','2018-04-20' ),
       (2, 3, '2018-04-21', '2018-05-21','2018-05-15' ),
       (2, 4, '2018-05-08', '2018-06-08', NULL ),
       (3, 9, '2018-04-25', '2018-05-25', NULL ),
       (4, 10,'2018-05-10', '2018-06-10', '2018-06-10' ),
       (4, 6, '2018-05-15', '2018-06-15', '2018-06-15' ),
       (4, 5, '2018-06-25', '2018-07-25', NULL),
       (5, 6, '2018-07-12', '2018-08-12', '2018-08-10' ),
       (5, 1, '2018-09-10', '2018-11-10', NULL);

--FOR REFERENCE ONLY FOR QUESTION NO 5

INSERT INTO loans (borrowers_id, book_id, issued_date, due_date)
select 
    3, 2, '2018-10-08', '2018-10-15'
where not exists (
    select * from loans where returned_date is NULL AND borrowers_id = 3 AND book_id =2
);


UPDATE loans SET returned_date = '2018-10-15' where borrowers_id =2 and book_id = 2;

-- 6. Select available books
SELECT  books.id, name FROM books, loans
       WHERE books.id = loans.book_id AND loans.returned_date IS NOT NULL GROUP BY books.id;

SELECT DISTINCT books.id, books.name FROM books LEFT JOIN loans ON books.id = loans.book_id
   WHERE loans.book_id IS NULL OR loans.returned_date IS NOT NULL;

-- 7. Select books for a specific author; Returned list should be order by their titles
SELECT b.name FROM authors a, books b WHERE a.id = b.author_id AND a.name = 'Akash' ORDER BY b.name ASC;

-- 8. Add category filter to 7;

SELECT b.name
FROM authors a
JOIN books b ON a.id = b.author_id
JOIN books_categories bc ON b.id = bc.book_id
JOIN categories c ON c.id = bc.category_id
WHERE a.name = 'Akash'
  AND c.name = 'Programming'
ORDER BY b.name ASC;

-- 9. Fetch the books that were loaned between date “A” and “B”
SELECT b.name
FROM books b
JOIN loans l ON b.id = l.book_id
WHERE l.issued_date BETWEEN '2018-01-08' AND '2018-03-20'; --or we can use current_date as function without parenthesis

-- 10. User wants to return a loaned book. Write an update query to make this happen.

UPDATE loans SET returned_date = '2018-10-15' where borrowers_id =2 and book_id = 2;




UPDATE loans l
SET returned_date = current_date
FROM users u, books b
WHERE u.id = l.borrowers_id
AND b.id = l.book_id
AND u.user_name = 'Ram Shrestha'
AND b.name = 'Let Us C';

-- 11. Another user wants to return multiple loaned book. Write an update query to make this happen.

UPDATE loans
SET returned_date = now()
WHERE borrowers_id = 2
  AND book_id IN (2,
                  1,
                  3,
                  4);


-- 12. Check what happens when you want to delete an author; What needs to be done ?
DELETE FROM authors WHERE id = 2;

-- ERROR:  update or delete on table "authors" violates foreign key constraint "books_author_id_fkey" on table "books"
-- DETAIL:  Key (id)=(2) is still referenced from table "books".

--we have to add on delete cascade constraint on defining foreign key 
--we can not alter the column with foreign so that we first have to drop and again add constraint with cascade 


-- 13. Write a query to delete users who have not leased any books for a month
-- DELETE FROM users WHERE IF EXISTS (
--     SELECT DISTINCT borrowers_id FROM loans where issued_date < now()-'1 month'::interval
-- );
UPDATE users SET is_active = 0  WHERE id IN (
    SELECT borrowers_id FROM loans WHERE now() - returned_date <  interval '1 month'
);

-- 14. Write a query to blacklist users who have not returned book for a month

UPDATE users SET is_active = 0  WHERE id IN (
    SELECT borrowers_id FROM loans WHERE now() - due_date > interval '1 month' AND returned_date is NULL
);


  


