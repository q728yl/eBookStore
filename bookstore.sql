

USE bookstore;



DROP TABLE if exists orderItem;
DROP TABLE if exists orders;
DROP TABLE if exists cart;
DROP table if exists book_details;
DROP table if exists user_auth;
DROP TABLE if exists users;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
                                     id INT NOT NULL AUTO_INCREMENT,
                                     username VARCHAR(50) NOT NULL UNIQUE,
                                     email VARCHAR(50) NOT NULL ,
                                     address VARCHAR(255),
                                     user_type INT NOT NULL,
                                     comments VARCHAR(255) NOT NULL,
                                     status INT NOT NULL ,
                                     PRIMARY KEY (id)
);
# DELETE FROM users;
ALTER TABLE users AUTO_INCREMENT = 1;
INSERT INTO users (username,  email, address,user_type,comments,status) VALUES ('qyl728', '3541441990@qq.com', '800hao',0,'no',1);
INSERT INTO users (username,  email, address,user_type,comments,status) VALUES ('pp',  '30685025@qq.com', '800hao',1,'no',1);
INSERT INTO users (username,  email, address,user_type,comments,status) VALUES ('b',  '3085025@qq.com', '800hao',1,'no',1);
SELECT *FROM users;

DROP table if exists user_auth;
CREATE TABLE IF NOT EXISTS user_auth (

                                         user_id INT NOT NULL AUTO_INCREMENT,
                                         password VARCHAR(255) NOT NULL,
                                         PRIMARY KEY (user_id),
                                         FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO user_auth ( password) VALUES ('qyl728728');
INSERT INTO user_auth ( password) VALUES ('235711zch');
INSERT INTO user_auth ( password) VALUES ('35711zch');
SELECT *FROM user_auth;



DROP table if exists book_details;
-- 创建书籍详情表
CREATE TABLE IF NOT EXISTS book_details (
                                            id INT NOT NULL AUTO_INCREMENT,
                                            title VARCHAR(255) NOT NULL,
                                            IBSN VARCHAR(255) NOT NULL,
                                            author VARCHAR(255) NOT NULL,
                                            tag VARCHAR(255) NOT NULL,
                                            description VARCHAR(1000) NOT NULL,
                                            price DECIMAL(10, 2) NOT NULL,
                                            rating DECIMAL(3, 1) NOT NULL,
                                            in_stock BOOLEAN NOT NULL,
                                            quantity INT NOT NULL,
                                            PRIMARY KEY (id)

);
ALTER TABLE book_details AUTO_INCREMENT = 1;
INSERT INTO book_details (title, IBSN, author, tag, description, price, rating, in_stock, quantity)
VALUES
    ('Software Engineering Principles', 9875427381, 'Shen Beijun Chen Haopeng', 'Software', 'An Easy & Proven Way to understand principles of software engineering', 3.99, 4.5, true, 70),
    ('Fundamentals of Circuits', 29392483984, 'Chen Hongliang Zhang Feng', 'Circuits', 'How Today’s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses', 5.99, 4.2, true, 7),
    ('Data Structures (C++ Edition)', 7286273292, 'Deng Junhui', 'Programming', 'Rules for data structure with C++', 4.99, 4.7, true, 20),
    ('Fundamentals of Computer Systems Assembly', 3749876549, 'Randall Bryant', 'English', 'Rules for Compilation of computer system fundamentals', 4.99, 4.7, true, 56);

-- Select all data from the book_details table
SELECT * FROM book_details;

DROP TABLE if exists cart;
SET  FOREIGN_KEY_CHECKS=0;

-- 购物车信息链接在book_details上
CREATE TABLE IF NOT EXISTS cart (
                                    id INT NOT NULL AUTO_INCREMENT,
                                    user_id INT NOT NULL,
                                    book_details_id INT NOT NULL,
                                    quantity INT NOT NULL,
                                    PRIMARY KEY (id),
                                    FOREIGN KEY (user_id) REFERENCES users(id),
                                    FOREIGN KEY (book_details_id) REFERENCES book_details(id)
);

ALTER TABLE cart AUTO_INCREMENT = 1;
INSERT INTO cart (user_id, book_details_id, quantity) VALUES (1, 1, 2);
INSERT INTO cart (user_id, book_details_id, quantity) VALUES (1, 3, 2);
INSERT INTO cart (user_id, book_details_id, quantity) VALUES (2, 2, 2);
INSERT INTO cart (user_id, book_details_id, quantity) VALUES (3, 4, 1);
INSERT INTO cart (user_id, book_details_id, quantity) VALUES (3, 1, 3);
SELECT *FROM cart;



# DELETE FROM cart WHERE user_id = 1;



DROP TABLE if exists orders;
SET  FOREIGN_KEY_CHECKS=0;
-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
                                      id INT NOT NULL AUTO_INCREMENT,
                                      user_id INT NOT NULL,
                                      order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                      PRIMARY KEY (id),
                                      FOREIGN KEY (user_id) REFERENCES users(id)


);
# DELETE FROM orders WHERE id BETWEEN 1 AND 6;

-- 插入订单数据
INSERT INTO orders (user_id) VALUES
                                 (1),
                                 (1),
                                 (2),
                                 (2);
SELECT *FROM orders;


DROP TABLE if exists orderItem;
SET  FOREIGN_KEY_CHECKS=0;
CREATE TABLE IF NOT EXISTS orderItem (
                                         id INT NOT NULL AUTO_INCREMENT,
                                         order_id INT NOT NULL,
                                         book_details_id INT NOT NULL,
                                         quantity INT NOT NULL,

                                         status INT NOT NULL,
                                         PRIMARY KEY (id),
                                         FOREIGN KEY (order_id) REFERENCES orders(id),
                                         FOREIGN KEY (book_details_id) REFERENCES book_details(id)
);


INSERT INTO orderItem (order_id,book_details_id,quantity,status) VALUES
                                                                     (1, 1,3,0),
                                                                     (1, 2,2,1),
                                                                     (2, 3,1,1),
                                                                     (2, 1,2,2),
                                                                     (3, 4,2,3),
                                                                     (4, 2,3,3);
