const express = require("express");
const createError = require("http-errors");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
require("dotenv").config();
require("./helper/init_mongodb");
const authRoute = require("./route/auth");
const userRoute = require("./route/user");
const postRoute = require("./route/post");
const catRoute = require("./route/category");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(__dirname, "/images")));
//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.use("/api/auth", authRoute);

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file is uploaded");
});

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categorys", catRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound("this route does not exist"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
