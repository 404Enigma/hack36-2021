const { v4: uuidv4 } = require("uuid");

const admin = require("../../config/db/db");
const db = admin.firestore();
const patientListRef = db.collection("Patients List");

const Synchronal_Catalogue_Ref = db.collection("Synchronal Catalogue");

const newId = uuidv4();

const date = Date.now();

const data = {
  name: "Rahul Mansharamani",
  uniqueID: newId,
  Age: 19,
  Sex: "M",
  height: 1.4,
  weight: 67,
  date: date,
  Current_disease: "Dengue",
  picture: "https://www.bootdey.com/img/Content/avatar/avatar5.png",
  Medical_Record: {
    AIDS: {
      disease: "AIDS",
      Duration: 5,
      year_of_disease: 2021,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": "acute HIV infection",
    },
    Cancer: {
      disease: "Cancer",
      Duration: 14,
      year_of_disease: 2019,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": "abdominal pain ,genitourinary",
    },
    Dengue: {
      disease: "Cancer",
      Duration: 9,
      year_of_disease: 2015,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": " high fever, headache, vomiting, muscle and joint pains, and a characteristic skin rash",
    },
    Chickenpox: {
      disease: "Chickenpox",
      Duration: 2,
      year_of_disease: 2006,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": "skin rash that forms small, itchy blisters, which eventually scab over",
    },
  },
};

const treat_data = {
  Anaesthesia: "Sedate the patient to increase his feeling of well-being during the operation process.",
  Finished: "Operation is finished. Patient is allowed to wake up slowly from the surgery.",
  Operation: "Perform the actual medical surgery.",
  Preparation: "Prepare the operating room as well as the patient.",
};

const insertList = async (uuid) => {
  patientListRef
    .doc(uuid)
    .set(data)
    .then(function () {
      console.log("Successfully inserted!");
    });
};

const liveStatus = async (uuid) => {
  Synchronal_Catalogue_Ref.doc(uuid)
    .set(treat_data)
    .then(function () {
      console.log("Successfully inserted!");
    });
};

// insertList(newId);
// liveStatus(newId);

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
