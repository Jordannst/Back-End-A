const express = require("express");
const app = express();
const moment = require("moment");
const users = require("./users");
const port = 3000;
const hostname = "127.0.0.1";

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send("This is the home page");
});

app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.status(200).json({
    status: "success",
    message: "response success",
    description: "Exercise #03",
    date: moment().format(),
  });
});

app.get("/users", (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.status(200).json(users);
});

app.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("404 Not Found");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
