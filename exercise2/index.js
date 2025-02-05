const http = require("http");
const moment = require("moment");
const users = require("./users");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("This is the home page");
  } else if (url === "/about") {
    const aboutRes = {
      status: "success",
      message: "response success",
      description: "Exercise #02",
      date: moment().format(),
    };

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(aboutRes));
  } else if (url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(users));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Not Found");
  }
});

const port = 3000;
const hostname = "127.0.0.1";

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
