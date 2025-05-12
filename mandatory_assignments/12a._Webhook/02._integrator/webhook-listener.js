import express from "express";

const app = express();
app.use(express.json());

app.get("/webhook", async (req, res) => {
  const response = await fetch("http://localhost:8080/ping");
  const data = await response.json();
  res.status(200).send(data);
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log("Webhook listener is running on port: ", PORT);
});
