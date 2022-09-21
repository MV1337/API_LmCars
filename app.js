require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;

const path = require("path");

const conn = require("./db/conn");
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "/public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER, Content-Type, Authorization"
  );
  app.use(cors());
  next();
});

//router
const router = require("./routes/Router");

app.use(router);

app.listen(port);
