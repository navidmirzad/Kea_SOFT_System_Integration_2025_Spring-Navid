-- --------------------------------------------------
-- DATABASE INIT FILE: university_db
-- Description: Initializes a dummy university database
-- --------------------------------------------------

-- Create the database
DROP DATABASE IF EXISTS university_db;
CREATE DATABASE university_db;
USE university_db;

-- --------------------------------------------------
-- TABLE: students
-- Description: Stores student personal information
-- --------------------------------------------------
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE,
    email VARCHAR(100) UNIQUE,
    enrollment_year YEAR
);

-- --------------------------------------------------
-- TABLE: courses
-- Description: Stores available courses
-- --------------------------------------------------
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    credits INT CHECK (credits > 0)
);

-- --------------------------------------------------
-- TABLE: enrollments
-- Description: Links students to their course enrollments
-- --------------------------------------------------
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- --------------------------------------------------
-- SAMPLE DATA
-- --------------------------------------------------
-- Insert dummy students
INSERT INTO students (first_name, last_name, birth_date, email, enrollment_year) VALUES
('Alice', 'Johnson', '2002-05-14', 'alice.j@example.com', 2020),
('Bob', 'Smith', '2001-08-22', 'bob.smith@example.com', 2019);

-- Insert dummy courses
INSERT INTO courses (course_name, course_code, credits) VALUES
('Introduction to Programming', 'CS101', 4),
('Database Systems', 'CS202', 3);

-- Insert dummy enrollments
INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(2, 2, 'B');
