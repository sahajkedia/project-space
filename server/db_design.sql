CREATE TABLE student (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  year VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL
);

CREATE TABLE teacher (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
);

-- used to check what project a student is registered to 
CREATE TABLE records(
  student_id INT,
  project_id INT,
  PRIMARY KEY (student_id, course_id)
);

CREATE TABLE project (
  _id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  description VARCHAR(200),
  due_date DATE,
  max_marks INT(3),
);

CREATE TABLE submissions (
  data BLOB NOT NULL,
  project_id INT NOT NULL,
  student_id INT NOT NULL,
  marks_obtained INT(3) NOT NULL,
  PRIMARY KEY (project_id, student_id)
) * * * * * * * * * * * * * * STORED PROCEDURE * * * * * * * * * * * * * * * * * * First create a table with cols ass_id AVG MAX MIN Absentees * * * * EXXAMPLE * * * * delimiter / / CREATE PROCEDURE display_book() -> BEGIN ->
SELECT
  *
FROM
  book;

->
END / / call display_book();

/ / * * * * * sendReport * * * * * * * DELIMITER / / DROP PROCEDURE IF EXISTS send_report / / CREATE PROCEDURE send_report(IN ass_id integer) BEGIN
SELECT
  AVG(marks),
  MAX(marks),
  MIN(marks),
  COUNT(marks)
FROM
  submissions
WHERE
  assignment_id = ass_id;

END / / DELIMITER;