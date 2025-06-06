import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import factions from "@/assets/factions.js"

const factionCollection = collection(db,"factions");


export const feedFactions = async () => {
    console.log("👉 factions 原始数据：", factions);

  // DELETE ALL EXISTING DOCS
  const querySnapshot = await getDocs(factionCollection);
  querySnapshot.forEach(async (faction) => {
    await deleteDoc(doc(db, "factions", faction.id));
  });

  // ADD NEW DOCS
  factions.forEach(async (faction) => {
    const docRef = await doc(factionCollection);
    await setDoc(docRef, { 
      ...faction, 
      id: docRef.id, 
      img: faction.img.toUpperCase() 
    });
  });
};
