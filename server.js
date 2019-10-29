const express = require("express");

const server = express();

server.use(express.json());

const router = require("./data/postRouter");

server.use("/api/posts", router);

server.get("/", (req, res) => {
  res.send(
    `
         its working`
  );
});

module.exports = server;
