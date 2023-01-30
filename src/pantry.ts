import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

import { set, ref, get, child } from "firebase/database";

import FuzzySearch from "fuzzy-search";

export interface PantryItem {
  name: string;
  expiry: number;
  category: string;
  quantity: number;
  unit: string;
  item_id?: number;
}

export interface ItemFilter {
  name?: string;
  expiry?: number;
  category?: string;
  quantity?: number;
  unit?: string;
  item_id?: number;
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
    .then((snapshot) => snapshot.val())
    .then((data) => {
      pantryItems = data;
    })
    .catch((err) => {
      console.log(err);
    });
  return Object.values(pantryItems)
  };

export const deleteItemById = async (id:number) => {
  await set(child(ref(db), `${auth.currentUser!.uid}` + "/pantry/" + id), null)
}


export const filterPantry = async (
  pantryArray: Array<PantryItem>,
  filters: any
) => {
  return pantryArray.filter((item: any) => {
    let isValid: boolean = true;

    for (const filter in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, filter)) {
        if (item[filter] !== filters[filter]) {
          isValid = false;
        }
      }
    }

    return isValid;
  })};

export const searchPantry = async (
  pantryArray: Array<PantryItem>,
  searchParameter: string
) => {
  const searcher = new FuzzySearch(pantryArray, ["name", "category"], {
    caseSensitive: false,
  });
  console.log(searcher.search(searchParameter));
  return searcher.search(searchParameter);
}
