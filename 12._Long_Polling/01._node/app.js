import express from "express";

const app = express();

app.use(express.static("public"));

let clients = [];

app.get("/events/subscribe", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add the response object to the clients list
  clients.push(res);

  // When the connection is closed (client disconnects), remove it from the clients list
  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
});

app.get("/events/publish", (req, res) => {
  const message = { data: "This is a new message" };

  // Send the message to all subscribed clients
  clients.forEach((client) => {
    client.json(message); // Send JSON message to client
  });

  res.status(200).send("Messages sent to clients.");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
