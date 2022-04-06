const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("port", 5000);

const formatDate = () => {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

io.on("connection", (socket) => {
  const currentTime = formatDate();
  socket.on("message", (msj) => {
    socket.broadcast.emit("message", {
      body: msj.body,
      from: msj.from,
      date: currentTime,
    });
  });
});

server.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
