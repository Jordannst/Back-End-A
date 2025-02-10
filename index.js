const express = require("express");
const app = express();
const port = 3003;
const { hello, greetings } = require("./helloWorld");
const moment = require("moment");

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

// Routing dinamis menggunakan Params
app.get("/post/:id", (req, res) => res.send(`Artikel ke - ${req.params.id}`));

const hostname = "127.0.0.1";
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
