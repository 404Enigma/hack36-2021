const express = require("express");
const router = express.Router();

const { checkCookie, savecookie } = require("../middleware/auth");
const { getAllPatient } = require("../modal/patient/patient_list");

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/treatment", (req, res) => {
  res.render("pages/treatment");
});

router.get("/patient_list", async (req, res) => {
  const patient_list = await getAllPatient();
  console.log(typeof patient_list);
  res.render("pages/patient_list", { patient_list });
});

router.get("/main", checkCookie, (req, res) => {
  const category = req.query.category;

  console.log(category);
  if (category == "doctor") {
    res.render("pages/patient_list");
  } else {
    res.render("pages/records");
  }
});

module.exports = router;
