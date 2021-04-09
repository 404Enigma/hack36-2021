const express = require("express");
const router = express.Router();

const { checkCookie, savecookie } = require("../middleware/auth");

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/logout", checkCookie, async (req, res) => {
  console.log(req.decodedClaims.uid);

  //const logout_user = await user_exist(req.decodedClaims.uid);
  res.clearCookie("__session");
  res.redirect("/");
});

router.get("/savecookie", (req, res) => {
  const Idtoken = req.query.idToken;
  console.log(Idtoken);
  savecookie(Idtoken, res);
});

module.exports = router;
