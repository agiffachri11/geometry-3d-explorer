import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB0uI7TNtjQSWDI6x5O2kI_GEVyLvT3TyU",
  authDomain: "geometry-3d-explorer.firebaseapp.com",
  projectId: "geometry-3d-explorer",
  storageBucket: "geometry-3d-explorer.firebasestorage.app",
  messagingSenderId: "777249788173",
  appId: "1:777249788173:web:3f890c996a9b23ac442044",
  measurementId: "G-NTX7FT8D0E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };