const express = require("express");
const routers = express.Router();

routers.get("/", (req, res) => res.send("Hello World"));
routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "about page",
    data: [],
  })
);

routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login Berhasil",
    data: { username: username, password: password },
  });
});

routers.post("/content", (req, res) => res.send("request dengan method POST"));
routers.put("/contoh", (req, res) => res.send("request dengan method PUT"));
routers.delete("/contoh", (req, res) =>
  res.send("request dengan method DELETE")
);
routers.patch("/contohpatch", (req, res) =>
  res.send("request dengan method PATCH")
);
routers.all("/universal", (req, res) =>
  res.send(`Request Method ${req.method}`)
); // Method universal/ Semua Method

// 1. Routing dinamis menggunakan Params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);

// 2. Routing dinamis menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query yang didapatkan adalah:  ${page}, sort: ${sort}`);
});

module.exports = routers;
