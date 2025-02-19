const express = require("express");
const app = express();
const morgan = require("morgan");
const users = require("./users");

app.use(morgan("combined"));

app.get("/users", (req, res) => {
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      status: "Error",
      message: "Terjadi kesalahan pada server",
    });
  }
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((usr) => usr.name.toLowerCase() === name);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: "Error",
    message: "resource tidak ditemukan",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
