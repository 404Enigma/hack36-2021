const admin = require("../../config/db/db");
const db = admin.firestore();
const patientRef = db.collection("Patient");
const patientListRef = db.collection("Patients List");

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

module.exports = { save_patient, patient_exist, find_Patient };
