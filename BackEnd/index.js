const express = require("express");
const app = express();
const cors = require("cors");
// const path = require("path");
require("dotenv").config();
// const connectDB = require("./config/db");
const routes = require("./routes/route");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const config = require("./config/config");

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

// connect to the mongodb database
// connectDB();

// Create a connection
const connection = mysql.createConnection(config);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL database " + connection.config.database);
});

//Checking Route
app.get("/", (req, res) => {
  res.send("leave Mannagement test");
});

app.use(routes);

app.listen(PORT, console.log("Server is running on port ", PORT));
