const express = require("express");
const app = express();
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const moment = require("moment");
const routers = require("./routers");
const Path = require("path");
const cors = require("cors");

// Middleware
app.use(morgan("tiny"));
app.use(express.static(Path.join(__dirname, "public"))); // Static File tidak perlu melalui routing

// body-parser urlencoded
app.use(express.urlencoded({ extended: true }));
// body-parser json
app.use(express.json());

// Cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "PUT", "POST", "DELETE"], // access control allow method
  })
);

// Routing
app.use(routers);

// Error Handling
app.use((req, res, next) => {
    res.status(404).json({
      status: "Error",
      message: "Tidak ditemukan",
    });
  });


const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);