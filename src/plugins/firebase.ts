
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdTbx_wd_1FpO6cRmASlnfPDH7DjM9a4E",
  authDomain: "w-team-manito.firebaseapp.com",
  projectId: "w-team-manito",
  storageBucket: "w-team-manito.appspot.com",
  messagingSenderId: "968675725777",
  appId: "1:968675725777:web:54d870f81bbe7c44d410f0",
  measurementId: "G-VLFE6S2FVJ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
