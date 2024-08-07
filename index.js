const express = require("express");
const monsgoose = require("mongoose");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((error) => {
    console.log(`getting errors ${error}`);
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Working....");
});

require("./Src/Routes")(app);

app.listen(3000, () => {
  console.log("api is working");
});
