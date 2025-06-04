import express from "express";
import cors from "cors";
const app = express();

// this sets cors globally for all routes which is not good.
//app.use(cors());

// how to manually set cors globally for everything still not so good.
/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

// Detailed CORS configuration example
/*
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourdomain.com"], // allow only these origins
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
);
*/

// how to configure cors even more in detail
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.get(
  "/timestamp",
  /*cors(),*/ (req, res) => {
    res.send({ data: new Date() });
  }
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log("App is running on PORT: ", PORT);
});
