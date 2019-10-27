const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

// Connect to database MongoDB
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/do-an";

mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) console.log(err);
    else {
      console.log("---Connect to DB---");
    }
  }
);

// Middleware body-parser to parse data to json
app.use(bodyParser.json());

// CORS enable
app.use(cors());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Middleware Morgan to log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

// Routing
app.use("/", require("./routes/api"));

// handle if no path found
app.use((req, res, next) => {
  res.send("No path found");
});

// handle error
app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    error: {
      message: err.message
    }
  });
});

// Listen to app
app.listen(3001, () => {
  console.log("App is listened on port 3001");
});
