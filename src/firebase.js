import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDFd9B7x56ii90omDsrs5yRfF1V3epkw7A",
    authDomain: "shop-it06.firebaseapp.com",
    projectId: "shop-it06",
    storageBucket: "shop-it06.firebasestorage.app",
    messagingSenderId: "324707196531",
    appId: "1:324707196531:web:023e30459e44a3c7df1406",
    measurementId: "G-RC25TEX8S0"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);