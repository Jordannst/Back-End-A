const express = require("express");
const routers = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
let users = require("./users");

// Routing
routers.get("/users", (req, res) => {
  if (users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404).json({
      status: "Error",
      message: "Terjadi kesalahan pada server",
    });
  }
});

routers.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((usr) => usr.name.toLowerCase() === name);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

routers.post("/users", (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "Masukan data yang akan diubah" });
  }

  users.push({ id, name });
  res.status(200).json({ message: "Data user berhasil ditambahkan" });
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const upload = multer({ dest: "public", fileFilter: imageFilter });

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
  res.download(path.join(__dirname, "/assets", filename), "dummy-photo.png");
});

routers.put("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((usr) => usr.name.toLowerCase() === name);

  if (user) {
    user.id = req.body.id;
    user.name = req.body.name;

    res.status(200).json({ message: "Data user berhasil diubah" });
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

routers.delete("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((usr) => usr.name.toLowerCase() === name);

  if (user) {
    users = users.filter((usr) => usr.name.toLowerCase() !== name);
    res.status(200).json({ message: "Data user berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

module.exports = routers;
