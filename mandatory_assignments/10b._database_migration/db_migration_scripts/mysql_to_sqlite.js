import { createConnection } from "mysql2/promise";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

async function migrate() {
  // Connect to MySQL
  const mysqlConn = await createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "navid",
    database: "university_db",
  });

  // Connect to SQLite3
  const sqliteDb = new sqlite3.Database("university_db.sqlite");

  // Create tables in SQLite
  sqliteDb.serialize(() => {
    sqliteDb.run(`CREATE TABLE IF NOT EXISTS students (
      student_id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      birth_date TEXT,
      email TEXT UNIQUE,
      enrollment_year INTEGER
    )`);
    sqliteDb.run(`CREATE TABLE IF NOT EXISTS courses (
      course_id INTEGER PRIMARY KEY,
      course_name TEXT,
      course_code TEXT UNIQUE,
      credits INTEGER
    )`);
    sqliteDb.run(`CREATE TABLE IF NOT EXISTS enrollments (
      enrollment_id INTEGER PRIMARY KEY,
      student_id INTEGER,
      course_id INTEGER,
      enrollment_date TEXT,
      grade TEXT
    )`);
  });

  // Helper to insert into SQLite
  function insertMany(db, table, columns, rows) {
    const placeholders = columns.map(() => "?").join(",");
    const stmt = db.prepare(
      `INSERT INTO ${table} (${columns.join(",")}) VALUES (${placeholders})`
    );
    rows.forEach((row) => {
      stmt.run(columns.map((col) => row[col]));
    });
    stmt.finalize();
  }

  // Migrate students
  const [students] = await mysqlConn.execute("SELECT * FROM students");
  if (students.length)
    insertMany(sqliteDb, "students", Object.keys(students[0]), students);

  // Migrate courses
  const [courses] = await mysqlConn.execute("SELECT * FROM courses");
  if (courses.length)
    insertMany(sqliteDb, "courses", Object.keys(courses[0]), courses);

  // Migrate enrollments
  const [enrollments] = await mysqlConn.execute("SELECT * FROM enrollments");
  if (enrollments.length)
    insertMany(
      sqliteDb,
      "enrollments",
      Object.keys(enrollments[0]),
      enrollments
    );

  await mysqlConn.end();
  sqliteDb.close();
  console.log("MySQL to SQLite3 migration complete!");
}

migrate().catch(console.error);
