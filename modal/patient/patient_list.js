const { v4: uuidv4 } = require("uuid");

const admin = require("../../config/db/db");
const db = admin.firestore();
const patientListRef = db.collection("Patients List");

const newId = uuidv4();

const date = Date.now();

data = {
  name: "Rashmi Meena",
  uniqueID: newId,
  Age: 24,
  Sex: "F",
  height: 1.1,
  weight: 50,
  date: date,
  Current_disease: "Covid",
  picture: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
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

const insertList = async (uuid) => {
  patientListRef
    .doc(uuid)
    .set(data)
    .then(function () {
      console.log("Successfully updated!");
    });
};

// insertList(newId);

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
