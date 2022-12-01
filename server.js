const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Create a new connection
io.on("connection", (socket) => {
  console.log("A user is connected.");

  socket.on("disconnect", () => {
    console.log("A user is disconnected.");
  });

  socket.on("chat-message", (msg) => {
    console.log("client message: " + msg);
  });

  socket.emit("server", "Message from server");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
