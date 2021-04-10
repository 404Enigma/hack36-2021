const admin = require("../config/db/db");
const { save_patient } = require("../modal/patient/patient");

function savecookie(idtoken, res, category) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin
    .auth()
    .createSessionCookie(idtoken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie("__session", sessionCookie, options);

        admin
          .auth()
          .verifyIdToken(idtoken)
          .then(function (decodedClaims) {
            //save users to database
            console.log(decodedClaims);
            //save patient and doctor
            if (category == "patient") {
              save_patient(decodedClaims.uid, decodedClaims.email, decodedClaims.name, category);
              res.redirect("/main?category=" + category);
            } else {
              res.redirect("/patient_list");
            }
          });
      },
      (error) => {
        console.log(error);
        res.status(401).send("UnAuthorised Request");
      }
    );
}

function checkCookie(req, res, next) {
  const sessionCookie = req.cookies.__session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      req.decodedClaims = decodedClaims;
      next();
    })
    .catch((error) => {
      // Session cookie is unavailable or invalid. Force user to login.
      res.redirect("/login");
    });
}

module.exports = { checkCookie, savecookie };
