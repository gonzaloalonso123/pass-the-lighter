import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAatZER7xu9iLd70W9-9oakWt-dack6RlI",
  authDomain: "pass-lighter.firebaseapp.com",
  projectId: "pass-lighter",
  storageBucket: "pass-lighter.appspot.com",
  messagingSenderId: "107893130111",
  appId: "1:107893130111:web:592bc2cf586e158cb7104a",
  measurementId: "G-K91YL2964Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
