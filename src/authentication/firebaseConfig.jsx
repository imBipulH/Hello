// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrf_Zlo4-dGHRHsUgu_013Igb916sNH5w",
  authDomain: "hello-42510.firebaseapp.com",
  projectId: "hello-42510",
  storageBucket: "hello-42510.appspot.com",
  messagingSenderId: "1051046211989",
  appId: "1:1051046211989:web:9f9eb5af1cc65017a7869c",
  measurementId: "G-KVSY7DJ8HX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;
