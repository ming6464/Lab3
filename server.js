const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const app = express();
const morgan = require("morgan");
const port = 8998;
const dir = "/UpLoad";
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", (req, res) => {
  if (!fs.existsSync(__dirname + dir)) {
    fs.mkdirSync(__dirname + dir);
  }
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    const oldPart = files.file.filepath;
    const newPart = __dirname + dir + "/" + files.file.originalFilename;
    fs.rename(oldPart, newPart, (err) => {
      if (err) throw err;
      res.write("Upload finish file " + files.file.originalFilename);
      return res.end();
    });
  });
});

app.listen(port, (req, res) => {
  console.log("Run app");
});
