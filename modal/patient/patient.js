const admin = require("../../config/db/db");
const db = admin.firestore();
const patientRef = db.collection("Patient");
const patientListRef = db.collection("Patients List");

const { v4: uuidv4 } = require("uuid");

const save_patient = async (uid, email, name, category) => {
  await patientRef
    .doc(uid)

    .set({ exist: true, email: email, name: name, user_id: uid })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  return uid;
};

const patient_exist = async (uid) => {
  let isexist;
  await patientRef
    .doc(uid)
    .update({ exist: false })
    .then(() => {
      console.log("Logout Successfully");
      isexist = true;
    })
    .catch((error) => {
      console.error("Error logout: ", error);
      isexist = false;
    });
  return isexist;
};

const find_Patient = async (uniqueID) => {
  console.log(uniqueID);
  const snapshot = await patientListRef.doc(uniqueID).get();
  const patient_data = snapshot.data();
  console.log(patient_data);
  return patient_data;
};

const find_Disease = async (uniqueID, disease_name) => {
  console.log(uniqueID, disease_name);
  let disease_data;

  const snapshot = await patientListRef
    .doc(uniqueID)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    })
    .then((querySnapshot) => {
      disease_data = querySnapshot["Medical_Record"][disease_name];
    });

  return disease_data;
};

const add_patient = async (patient_data) => {
  const newId = uuidv4();
  patient_data.new = true;

  if (patient_data.Sex == "male") {
    patient_data.picture = "https://bootdey.com/img/Content/avatar/avatar5.png";
  } else {
    patient_data.picture = "https://bootdey.com/img/Content/avatar/avatar8.png";
  }

  await patientListRef
    .doc(newId)
    .set(patient_data)
    .then(() => {
      console.log("Patient added to database");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  return newId;
};

module.exports = { save_patient, patient_exist, find_Patient, find_Disease, add_patient };
