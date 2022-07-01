exports.CREATE_TABLE_STUDENT = `CREATE TABLE student (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    year VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL
  )`;

exports.CREATE_TABLE_TEACHER = `CREATE TABLE teacher (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
  )`;

// used to check what project a student is registered to
exports.CREATE_TABLE_RECORDS = `CREATE TABLE records(
    student_id INT,
    project_id INT,
    PRIMARY KEY (student_id, project_id)
  )`;

exports.CREATE_TABLE_PROJECT = `CREATE TABLE project (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50),
    description VARCHAR(200),
    due_date DATE,
    max_marks INT(3)
  )`;

exports.CREATE_TABLE_SUBMISSIONS = `CREATE TABLE submissions (
    data BLOB NOT NULL,
    project_id INT NOT NULL,
    student_id INT NOT NULL,
    marks_obtained INT(3) NOT NULL,
    PRIMARY KEY (project_id, student_id)
  )`;
