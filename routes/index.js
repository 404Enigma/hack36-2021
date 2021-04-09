const express = require("express");
const router = express.Router();

const { checkCookie, savecookie } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/main", checkCookie, (req, res) => {
  const category = req.query.category;

  console.log(category);
  if (category == "doctor") {
    res.render("pages/patient_list");
  } else {
    res.render("pages/main");
  }
});

module.exports = router;
