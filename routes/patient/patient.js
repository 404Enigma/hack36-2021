const express = require("express");
const router = express.Router();

const { checkCookie, savecookie } = require("../../middleware/auth");
const { find_Patient } = require("../../modal/patient/patient");

router.get("/:id/details", checkCookie, async (req, res) => {
  const uniqueID = req.params.id;
  const patient = await find_Patient(uniqueID);
  console.log(patient);

  res.render("pages/records", { patient });
});

module.exports = router;
