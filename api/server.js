const express = require("express");

const Animals = require("./animals/animals-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({api: "up"})
});

server.get("/animals", (req, res) => {
  Animals.getAll()
    .then(animals => {
      res.status(200).json(animals)
    })
    .catch(error => {
      res.status(500).json(error)
    });
});

server.post("/animals", (req, res) => {
  Animals.insert(req.body)
    .then(animals => {
      res.status(200).json(animals)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = server;