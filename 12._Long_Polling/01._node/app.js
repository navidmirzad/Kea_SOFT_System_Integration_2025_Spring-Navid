import express from "express";

const app = express();

app.use(express.static("public"));

let clients = [];

app.get("/events/subscribe", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });

  clients = [];

  res.status(200).end();
});

app.get("/events/publish", (req, res) => {
  const message = { data: "This is a new message" };

  clients.forEach((res) => {
    res.send(message);
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
