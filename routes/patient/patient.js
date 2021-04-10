const express = require("express");
const router = express.Router();

const { checkCookie, savecookie } = require("../../middleware/auth");
const { find_Patient } = require("../../modal/patient/patient");

router.get("/:id/details", checkCookie, async (req, res) => {
  const category = req.session.category;
  console.log("\x1b[36m%s\x1b[0m", category);
  const uniqueID = req.params.id;
  const patient = await find_Patient(uniqueID);

  res.render("pages/records", { patient, category });
});

module.exports = router;
