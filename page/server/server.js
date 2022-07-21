const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

// SETUP
dotenv.config({ path: "./server/config/.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("secretcode"));


// DATABASE

console.log(process.env.MONGO_URI, process.env.MONGO_PASSWORD)

const DB = process.env.MONGO_URI.replace(
    "<password>", process.env.MONGO_PASSWORD
    );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

// ROUTES
const authRouter = require("./routes/authRoutes");
const dataRouter = require("./routes/dataRoutes");
const newsRouter = require("./routes/newsRoutes");
const stockRouter = require("./routes/stockRoutes");

app.use("/api/auth", authRouter);
app.use("/api/data", dataRouter);
app.use("/api/news", newsRouter);
app.use("/api/stock", stockRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
}

// APP
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/readpPython", (request, response) => {
  var dataToSend;

  const python = spawn('python3', ['script.py'], "welcome", "Duyen");

  python.stdout.on('data', function (data) {
    dataToSend = data.toString();
  });
  python.stdout.on('data', data => {  
    console.error(`stderr: ${data}`);
  });

  python.on('exit', (code) => {
    console.log(`child process exited with code ${code}, ${dataToSend}`);
    response.sendFile(`${__dirname}/public/result.html`);
  });

});
