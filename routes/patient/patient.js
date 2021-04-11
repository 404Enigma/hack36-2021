const express = require("express");
const router = express.Router();
const axios = require("axios");
const { checkCookie, savecookie } = require("../../middleware/auth");
const { find_Patient, find_Disease, add_patient, find_Disease_synchronal } = require("../../modal/patient/patient");

require("dotenv").config();

router.get("/:id/details", checkCookie, async (req, res) => {
  const category = req.session.category;
  console.log("\x1b[36m%s\x1b[0m", category);
  const uniqueID = req.params.id;
  const patient = await find_Patient(uniqueID);

  const records = patient.Medical_Record;
  //console.log(Object.keys(records));

  res.render("pages/records", { patient, records, category, uniqueID });
});

router.get("/:id/:disease/treatment", checkCookie, async (req, res) => {
  const category = req.session.category;
  console.log("\x1b[36m%s\x1b[0m", category);
  const uniqueID = req.params.id;
  const disease_name = req.params.disease;
  const disease = await find_Disease(uniqueID, disease_name);
  const synchronal = await find_Disease_synchronal(uniqueID);

  console.log(synchronal);

  for (let key in synchronal) {
    console.log(key, synchronal[key]);
  }
  res.render("pages/treatment", { disease, category, disease_name, uniqueID, synchronal });
});

router.get("/:id/profile", checkCookie, async (req, res) => {
  const category = req.session.category;
  console.log("\x1b[36m%s\x1b[0m", category);
  const uniqueID = req.params.id;
  const patient = await find_Patient(uniqueID);

  if (patient.Sex == "M") {
    patient.Sex = "Male";
  } else {
    patient.Sex = "Female";
  }
  res.render("pages/profile", { category, uniqueID, patient });
});

router.post("/new", checkCookie, async (req, res) => {
  let { Age, Sex, height, weight, Current_disease } = req.body;

  if (Sex == "male") {
    Sex = 1;
  } else {
    Sex = 0;
  }

  const patient_data = { age: Age, sex: Sex, height, weight, disease: Current_disease };

  patient_data.no_of_med = 4;
  console.log(patient_data);

  const recommand_options = {
    disease: "covid",
    age: 56,
    sex: 1,
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

  const response = await axios.get(process.env.RecommendAPI, {
    params: patient_data,
  });

  const values = await response.data;

  let a = {};

  console.log(values[0]);

  for (let i = 0; i < values.length; i++) {
    a[i] = values[i];
  }
  //const med_value = Object.assign({}, values);

  console.log(a);

  const new_patient = await add_patient(patient_data);

  console.log(med_value);
  new_patient ? res.json({}) : res.status(404);

  //res.render("pages/new_patient", { med_value });
});

router.get("/new", checkCookie, async (req, res) => {
  let med_value;
  res.render("pages/new_patient", { med_value });
});

router.get("/:id/:disease/todo", checkCookie, async (req, res) => {
  const category = req.session.category;
  console.log("\x1b[36m%s\x1b[0m", category);
  const uniqueID = req.params.id;
  const disease_name = req.params.disease;
  const disease = await find_Disease(uniqueID, disease_name);

  console.log(disease);
  res.render("pages/todo", { disease, category, disease_name, uniqueID });
});

module.exports = router;
