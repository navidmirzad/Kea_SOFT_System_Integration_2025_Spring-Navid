import express from "express";

const app = express();

app.get("/", (req, res) => {
  app.send({ data: "hello world" });
});
