import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

webSocketServer.on("connection", (ws) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    const time = new Date().toISOString();
    ws.send(time);
  }, 1000); // send the time every 1000 MS (1000 ms = 1 second)

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

const PORT = process.env.NODE_PORT || 8080;
server.listen(PORT, () => {
  console.log("Server (HTTP + WebSocket) is running on PORT: ", PORT);
});
