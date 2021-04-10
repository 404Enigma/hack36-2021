const express = require("express");
const router = express.Router();
const axios = require("axios");
const { checkCookie, savecookie } = require("../../middleware/auth");
const { find_Patient } = require("../../modal/patient/patient");

require("dotenv").config();

router.get("/:id/details", checkCookie, async (req, res) => {
  const category = req.session.category;
  console.log("\x1b[36m%s\x1b[0m", category);
  const uniqueID = req.params.id;
  const patient = await find_Patient(uniqueID);

  const records = patient.Medical_Record;
  console.log(Object.keys(records));

  res.render("pages/records", { patient, records, category });
});

router.get("/new", checkCookie, async (req, res) => {
  const recommand_options = {
    disease: "covid",
    age: 56,
    sex: "M",
    height: 1.45,
    weight: 56,
    no_of_med: 2,
  };

  const detect_options = {
    disease: "covid",
    age: 56,
    sex: "M",
    height: 1.45,
    weight: 56,
    med1: "a",
    med2: "b",
    med3: "c",
    med4: "d",
    med5: "c",
    no_of_med: 2,
  };

  axios
    .get("https://recommend-anomaly.herokuapp.com/", { recommand_options })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });

  res.render("pages/new_patient");
});

module.exports = router;
