import { collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const productCollection = collection(db,"products");