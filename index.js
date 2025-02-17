const express = require("express");
const app = express();
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const port = 3000;
const moment = require("moment");
const { hello, greetings } = require("./helloWorld");

// Middleware
const log = (req, res, next) => {
  console.log(
    moment().format("MMMM Do YYYY, h:mm:ss a") +
      " " +
      req.originalUrl +
      " " +
      req.method
  );
  next();
};

app.use(morgan("tiny"));

// Routing
app.get("/", (req, res) => res.send("Hello World"));

app.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "about page",
    data: [],
  })
);

app.post("/content", (req, res) => res.send("request dengan method POST"));
app.put("/contoh", (req, res) => res.send("request dengan method PUT"));
app.delete("/contoh", (req, res) => res.send("request dengan method DELETE"));
app.patch("/contohpatch", (req, res) =>
  res.send("request dengan method PATCH")
);
app.all("/universal", (req, res) => res.send(`Request Method ${req.method}`)); // Method universal/ Semua Method

// 1. Routing dinamis menggunakan Params
app.get("/post/:id", (req, res) => res.send(`Artikel ke - ${req.params.id}`));

// 2. Routing dinamsi menggunakan Query String
app.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query yang didapatkan adalah:  ${page}, sort: ${sort}`);
});

// Error Handling with Middlewaree
app.use((req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: "Tidak ditemukan",
  });
});

app.use(errorhandler());

const hostname = "127.0.0.1";
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
