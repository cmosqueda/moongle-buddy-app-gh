import { FIREBASE_DB } from "./firebaseConfig";
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
