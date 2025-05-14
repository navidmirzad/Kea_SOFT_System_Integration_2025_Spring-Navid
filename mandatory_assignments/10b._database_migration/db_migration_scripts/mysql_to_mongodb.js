import { createConnection } from "mysql2/promise";
import { MongoClient } from "mongodb";

async function migrate() {
  const mysqlConn = await createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "navid",
    database: "university_db",
    port: 3306,
  });

  // Connect to MongoDB
  const mongoClient = new MongoClient("mongodb://localhost:27017");
  await mongoClient.connect();
  const mongoDb = mongoClient.db("university_db");

  // Migrate students
  const [students] = await mysqlConn.execute("SELECT * FROM students");
  if (students.length)
    await mongoDb.collection("students").insertMany(students);

  // Migrate courses
  const [courses] = await mysqlConn.execute("SELECT * FROM courses");
  if (courses.length) await mongoDb.collection("courses").insertMany(courses);

  // Migrate enrollments
  const [enrollments] = await mysqlConn.execute("SELECT * FROM enrollments");
  if (enrollments.length)
    await mongoDb.collection("enrollments").insertMany(enrollments);

  await mysqlConn.end();
  await mongoClient.close();
  console.log("MySQL to MongoDB migration complete!");
}

migrate().catch(console.error);
