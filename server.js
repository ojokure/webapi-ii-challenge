const express = require("express");

const server = express();

const cors = require("cors");

server.use(cors());

server.use(express.json());

const router = require("./data/postRouter");

server.use("/api/posts", router);

server.get("/", (req, res) => {
  res.send(`it works`);
});

module.exports = server;
