import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

import { set, ref, get, child, update } from "firebase/database";

export interface PantryItem {
  name: string;
  expiry: number;
  category: string;
  quantity: number;
  unit: string;
  item_id?: number;
}

export interface ItemChanges {
  name?: string;
  expiry?: number;
  category?: string;
  quantity?: number;
  unit?: string;
}

export const addItem = async (item: PantryItem) => {
  const item_id = item.item_id ? item.item_id : Number(Date.now());
  await set(ref(db, `${auth.currentUser!.uid}` + "/pantry/" + item_id), {
    name: item.name,
    expiry: item.expiry,
    category: item.category,
    quantity: item.quantity,
    unit: item.unit,
    item_id: item_id,
  });
};

export const emptyPantry = async () => {
  await set(ref(db, `${auth.currentUser!.uid}/pantry`), null);
};

export const getPantry = async () => {
  let pantryItems = {};
  await get(child(ref(db), `${auth.currentUser!.uid}` + "/pantry/"))
    .then(snapshot => snapshot.val())
    .then(data => {
      pantryItems = data;
    })
    .catch(err => {
      console.log(err);
    });

  return pantryItems;
};

export const patchItemById = async (id:number, changes:ItemChanges) => {
  update(child(ref(db), `${auth.currentUser!.uid}` + "/pantry/" + id), changes)
}