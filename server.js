const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
var session = require("express-session");

const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  session({
    secret: "secret!!",
    resave: true,
    saveUninitialized: true,
  })
);

const index = require("./routes/index");
const auth = require("./routes/auth");
const patient = require("./routes/patient/patient");

app.use(index);
app.use(auth);
app.use("/patient", patient);

app.listen(PORT, () => {
  console.log(`Listining on ${PORT}`);
});
