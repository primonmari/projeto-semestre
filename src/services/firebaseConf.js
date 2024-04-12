// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpkkJi9duKCBuVMMcdJ-chFFvpVQhriqs",
  authDomain: "banco-dados-aulas.firebaseapp.com",
  projectId: "banco-dados-aulas",
  storageBucket: "banco-dados-aulas.appspot.com",
  messagingSenderId: "171710448604",
  appId: "1:171710448604:web:54be07edcaf0a1b934c519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default  db;