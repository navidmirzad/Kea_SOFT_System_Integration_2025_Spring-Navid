import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send({ data: "Hello world from test universe!" });
});

app.get("/yoda", (req, res) => {
  res.send({ data: "Greetings, young one. Much to learn, you still have." });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} ...`);
});
