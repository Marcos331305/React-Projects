// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaGO8BmV3YJFMAP2fhjJloebNFyrNFR-w",
  authDomain: "talker---ai-assistant.firebaseapp.com",
  projectId: "talker---ai-assistant",
  storageBucket: "talker---ai-assistant.appspot.com",
  messagingSenderId: "416239439827",
  appId: "1:416239439827:web:a69f1b00ff82f8e83ee926",
  measurementId: "G-P6R6KRN8Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;