import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

import { set, ref } from "firebase/database";

export interface PantryItem {
  name: string;
  expiry: number;
  category: string;
  quantity: number;
  unit: string;
  item_id: number;
}

export const addItem = async (item: PantryItem) => {
  await set(ref(db, `${auth.currentUser!.uid}` + "/pantry/" + item.item_id), {
    name : item.name,
    expiry: item.expiry,
    category : item.category,
    quantity : item.quantity,
    unit : item.unit,
    item_id:item.item_id
  });
};
