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

  ws.on("message", (message) => {
    console.log("Received from client:", message.toString());

    const reply = `[${new Date().toISOString()}] Server received: ${message}`;
    ws.send(reply);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.NODE_PORT || 8080;
server.listen(PORT, () => {
  console.log("Server (HTTP + WebSocket) is running on PORT: ", PORT);
});
