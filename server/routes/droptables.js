module.exports = (app, db, upload, fs) => {
  app.get('/droptables', (req, res) => {

    //const query = 'DROP TABLE IF EXISTS student; DROP TABLE IF EXISTS teacherl;DROP TABLE IF EXISTS classroom;';

    //*
    const query = '\
      DROP TABLE IF EXISTS student; \
      DROP TABLE IF EXISTS teacher; \
      DROP TABLE IF EXISTS course; \
      DROP TABLE IF EXISTS assignment; \
      DROP TABLE IF EXISTS records; \
      DROP TABLE IF EXISTS submissions; \
      DROP TABLE IF EXISTS attachments; \
      CREATE TABLE student (\
        _id INT PRIMARY KEY AUTO_INCREMENT,\
        fname VARCHAR(50) NOT NULL,\
        lname VARCHAR(50) NOT NULL,\
        email VARCHAR(50) NOT NULL UNIQUE,\
        password VARCHAR(50) NOT NULL,\
        year VARCHAR(50) NOT NULL,\
        department VARCHAR(50) NOT NULL\
      );\
      CREATE TABLE teacher (\
        _id INT PRIMARY KEY AUTO_INCREMENT,\
        fname VARCHAR(50) NOT NULL,\
        lname VARCHAR(50) NOT NULL,\
        email VARCHAR(50) NOT NULL UNIQUE,\
        password VARCHAR(50) NOT NULL\
      );\
      CREATE TABLE course (\
        _id INT PRIMARY KEY AUTO_INCREMENT,\
        teacher_id INT NOT NULL,\
        name VARCHAR(50) NOT NULL,\
        description VARCHAR(200),\
        year VARCHAR(4),\
        department VARCHAR(10)\
        course_code VARCHAR(10) NOT NULL UNIQUE\
      );\
      CREATE TABLE records(\
        student_id INT,\
        course_code VARCHAR(10),\
        PRIMARY KEY (student_id, course_id)\
      );\
      CREATE TABLE assignment (\
        _id INT PRIMARY KEY AUTO_INCREMENT,\
        course_id INT NOT NULL,\
        description VARCHAR(200),\
        due_date DATE,\
        max_marks INT(3),\
        is_assignment BOOLEAN NOT NULL\
      );\
      CREATE TABLE submissions (\
        data BLOB NOT NULL,\
        assignment_id INT NOT NULL,\
        student_id INT NOT NULL,\
        marks_obtained INT(3),\
        PRIMARY KEY (assignment_id, student_id)\
      );\
      CREATE TABLE attachments (\
        _id INT PRIMARY KEY AUTO_INCREMENT,\
        data BLOB NOT NULL,\
        assignment_id INT NOT NULL,\
        name VARCHAR(100) NOT NULL,\
        description VARCHAR(200)\
      );';
    db.query(query, (err, dat) => {
      if(err)
        return res.status(400).send({"success":false, "error":err.name, "message": err.message});
      return res.send({"success":true});
    })
  })
}
