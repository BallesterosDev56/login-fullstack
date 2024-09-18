CREATE DATABASE basic_crud;
USE basic_crud;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_name varchar(100),
    user_password varchar(100)
)