const { v4: uuidv4 } = require("uuid");

const admin = require("../../config/db/db");
const db = admin.firestore();
const patientListRef = db.collection("Patients List");

const newId = uuidv4();

const date = Date.now();
const data = {
  name: "Palak Soni",
  uniqueID: newId,
  Age: 45,
  Sex: "F",
  height: 1.4,
  weight: 61,
  date: date,
  Current_disease: "Covid",
  Medical_Record: {
    Cancer: {
      which_year: new Date().getFullYear(),
      duration: 1,
    },
    AIDS: {
      which_year: new Date().getFullYear(),
      duration: 24,
    },
  },
};

const insertList = async (uuid) => {
  patientListRef
    .doc(uuid)
    .set(data)
    .then(function () {
      console.log("Successfully updated!");
    });
};

//insertList(newId);

const getAllPatient = async () => {
  let tempDoc;
  await patientListRef.get().then((querySnapshot) => {
    tempDoc = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    //console.log(tempDoc);
  });
  return tempDoc;
};

module.exports = { getAllPatient };
