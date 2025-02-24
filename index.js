const express = require("express");
const app = express();
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const moment = require("moment");
const routers = require("./routers");
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
// app.use(errorhandler());

// body-parser
app.use(express.urlencoded({ extended: true }));

// Routing
app.use(routers);

// Error Handling with Middlewaree
app.use((req, res, next) => {
  res.status(404).json({
    status: "Error",
    message: "Tidak ditemukan",
  });
});

// Error Handler use errorhandler
app.use(errorhandler());

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
