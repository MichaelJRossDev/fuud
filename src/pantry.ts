import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

import { set, ref, get, child } from "firebase/database";

import FuzzySearch from "fuzzy-search";

const off = require("openfoodfacts-nodejs");

const client = new off();

client.getProduct("30720601").then(console.log);

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
  return Object.values(pantryItems);
};

export const deleteItemById = async (id: number) => {
  await set(child(ref(db), `${auth.currentUser!.uid}` + "/pantry/" + id), null);
};

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
  });
};

export const searchPantry = async (
  pantryArray: Array<PantryItem>,
  searchParameter: string
) => {
  const searcher = new FuzzySearch(pantryArray, ["name", "category"], {
    caseSensitive: false,
  });
  console.log(searcher.search(searchParameter));
  return searcher.search(searchParameter);
};


export const getItemInfoByBarcode = async (barcode: string) => {
  let item: object = {}
  const client = new off();
  let quantityJustNumber: string = ""
  let quantityJustUnit:string = ""
  await client.getProduct(barcode).then((itemInfo: any) => {
    if (itemInfo.status === "0") {
      console.log("item not found")
      return {
        name: "",
        category: "",
        quantity: 0,
        unit: ""
      }
    } else {
      
      if (itemInfo.product.quantity) {
        if (itemInfo.product.quantity.includes(",")) {
          const quantityStringArray:Array<string> = itemInfo.product.quantity.split(",")
          const quantityWithUnits:string = quantityStringArray[0]
          const quantityUnitArray:Array<string> = quantityWithUnits.split(" ")
          quantityJustNumber = quantityUnitArray[0]
          quantityJustUnit = quantityUnitArray[1]
        } else {
          const quantityUnitArray:Array<string> = itemInfo.product.quantity.split(" ")
          quantityJustNumber = quantityUnitArray[0]
          quantityJustUnit = quantityUnitArray[1]
        }
      }

      let category: string = ""
      console.log(itemInfo.product.category, "category name");


      if (itemInfo.product.categories_hierarchy) {
        if (itemInfo.product.categories_hierarchy[0].includes(":")) {
          let categoryStringArray: Array<string> = itemInfo.product.categories_hierarchy[0].split(":")
          category = categoryStringArray[1]
        } else {
          category = itemInfo.product.categories_hierarchy[0]
        }
      }
      
      item = {
        name: itemInfo.product.product_name ? itemInfo.product.product_name : "",
        category: category,
        quantity: quantityJustNumber ? Number(quantityJustNumber) : 0,
        unit: quantityJustUnit
      }
    
    }
  })
  return item;
}

export const addToGraveyard = async (id: number) => {
  await get(
    child(ref(db), `${auth.currentUser!.uid}` + "/pantry/" + String(id))
  )
    .then((snapshot) => snapshot.val())
    .then(async (data) => {
      await set(ref(db, `${auth.currentUser!.uid}` + "/graveyard/" + id), data);
      await deleteItemById(id)
    })
    .catch((err) => {
      console.log(err);
    });
};
