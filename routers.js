const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const client = require("./mongodb.js");
// const { ObjectId } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ dest: "public", fileFilter: imageFilter });

// Routing

// mongodb
routers.get("/users", async (req, res) => {
  try {
    const db = client.db("latihan");
    const users = await db.collection("users").find().toArray();
    res.json({
      status: "Success",
      message: "List users",
      data: users,
    });

  } catch (error) {
    console.error(error);

    res.json({
      status: "Error",
    });
  }
});

//get single user
routers.get("/users/:id", async (req, res) => {
  try {
    const db = client.db("latihan");
    const users = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id)
    })
    res.status(200).json({
      status: "success",
      message: "Get single user",
      data: users,
    })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({
      status: "error",
    })
  }
})



routers.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  console.log(file);
  if (file) {
    const target = path.join(__dirname, "public", file.originalname);
    fs.renameSync(file.path, target); //rename file agar sama dengan original file name
    res.send("file berhasil diupload");
  } else {
    res.send("file gagal diupload");
  }
});

routers.get("/download", (req, res) => {
  const filename = "dummy.png";
  res.download(path.join(__dirname, "/download", filename), "dummy-photo.png");
});

routers.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({
    status: "success",
    message: "Login page",
    data: {
      username: username,
      password: password,
    },
  });
});
routers.get("/", (req, res) => res.send("Hello World"));

routers.get("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: [],
  })
);

routers.put("/about", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "About page",
    data: ["Method PUT"],
  })
);

routers.post("/contoh", (req, res) => res.send("request method POST"));
routers.put("/contoh", (req, res) => res.send("Request method PUT"));
routers.delete("/contoh", (req, res) => res.send("Request method DELETE"));
routers.patch("/contoh", (req, res) => res.send("Request method PATCH"));

routers.all("/universal", (req, res) =>
  res.send(`Request method ${req.method}`)
);
// Routing dinamis
// 1. Menggunakan params
routers.get("/post/:id", (req, res) =>
  res.send(`Artikel ke - ${req.params.id}`)
);
// 2. Menggunakan Query String
routers.get("/post", (req, res) => {
  const { page, sort } = req.query;
  res.send(`Query string= page :${page}, sort : ${sort}`);
});

module.exports = routers;
