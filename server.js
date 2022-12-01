const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const users = {};

// Create a new connection
io.on("connection", (socket) => {
  socket.on("new-user", (userName) => {
    users[socket.id] = userName;
    socket.broadcast.emit("user-connected", userName);
  });

  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
