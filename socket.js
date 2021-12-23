const socketio = require("fastify-socket.io");
const { join } = require("path");
const path = require("path");
const { readFile } = require("fs").promises;
exports.socket = (app, options) => {
  app.register(socketio);
  app.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
  });

  app.get("/html", async (req, reply) => {
    const data = await readFile(join(__dirname, "index.html"));
    reply.header("content-type", "text/html; charset=utf-8");
    reply.send(data);
  });

  app.ready((err) => {
    if (err) throw err;
    var count = 0;
    app.io.on("connection", (socket) => {
      count++;
      console.log(socket.id, "is online");
      socket.on("message", (msg) => {
        console.log(msg);
        socket.broadcast.emit("message", msg);
      });
      socket.on("disconnect", () => {
        console.log(socket.id, "is offline");
        count--;
        console.log("total users online:-", count);
      });
      console.log("total users online:-", count);
    });
  });
};
