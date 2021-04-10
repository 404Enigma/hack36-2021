const attach_patient = (req, res, next) => {
  req.category = "patient";
  next();
};

const attach_staff = (req, res, next) => {
  req.category = "staff";
  next();
};

module.exports = { attach_patient, attach_staff };
