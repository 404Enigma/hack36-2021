const { v4: uuidv4 } = require("uuid");

const admin = require("../../config/db/db");
const db = admin.firestore();
const patientListRef = db.collection("Patients List");

const newId = uuidv4();

const date = Date.now();

// const data = {
//   name: "Palak Soni",
//   uniqueID: newId,
//   Age: 45,
//   Sex: "F",
//   height: 1.4,
//   weight: 61,
//   date: date,
//   Current_disease: "Covid",
//   Medical_Record: {
//     Cancer: {
//       which_year: new Date().getFullYear(),
//       duration: 1,
//     },
//     AIDS: {
//       which_year: new Date().getFullYear(),
//       duration: 24,
//     },
//   },
// };

data = {
  name: "Sudhanshu Pandey",
  uniqueID: newId,
  Age: 11,
  Sex: "M",
  height: 1.2,
  weight: 71,
  date: date,
  Current_disease: "Covid",
  picture: "https://bootdey.com/img/Content/avatar/avatar8.png",
  Medical_Record: {
    AIDS: {
      disease: "AIDS",
      Duration: 5,
      which_year: 2021,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": "acute HIV infection",
    },
    Cancer: {
      disease: "Cancer",
      Duration: 14,
      which_year: 2019,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": "abdominal pain ,genitourinary",
    },
    Dengue: {
      disease: "Cancer",
      Duration: 9,
      which_year: 2015,
      Discription: "health conditions such as cardiovascular disease, kidney disease, diabetes",
      "Chief complain": " high fever, headache, vomiting, muscle and joint pains, and a characteristic skin rash",
    },
    Chickenpox: {
      disease: "Chickenpox",
      Duration: 2,
      which_year: 2006,
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

insertList(newId);

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
