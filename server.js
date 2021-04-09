const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");

const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const index = require("./routes/index");
const auth = require("./routes/auth");

app.use(index);
app.use(auth);

app.listen(PORT, () => {
  console.log(`Listining on ${PORT}`);
});
