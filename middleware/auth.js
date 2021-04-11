const admin = require("../config/db/db");
const { save_patient } = require("../modal/patient/patient");

const { attach_patient, attach_staff } = require("./category");

function savecookie(idtoken, req, res, next, category) {
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
              //attach_patient(req, res, next);
              req.session.category = "patient";
              console.log("\x1b[33m%s\x1b[0m", req.session.category);
              save_patient(decodedClaims.uid, decodedClaims.email, decodedClaims.name, category);

              res.redirect("/main");
            } else {
              // attach_staff(req, res, next);
              req.session.category = "staff";
              console.log("\x1b[33m%s\x1b[0m", req.session.category);
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
