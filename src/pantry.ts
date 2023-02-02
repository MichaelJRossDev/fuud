import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

import { set, ref, get, child } from "firebase/database";

import FuzzySearch from "fuzzy-search";

import axios from "axios";

import { recipes } from "../data/recipes";

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
  if (pantryItems === null) return [];
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
  return searcher.search(searchParameter);
};

export const getItemInfoByBarcode = async (barcode: string) => {
  let item: object = {};
  let quantityJustNumber: string = "";
  let quantityJustUnit: string = "";
  await axios
    .get(`https://world.openfoodfacts.org/api/v2/product/${barcode}`)
    .then((itemInfo: any) => {
      if (itemInfo.status === "0") {
        console.log("item not found");
        return {
          name: "",
          category: "",
          quantity: 0,
          unit: "",
        };
      } else {
        if (itemInfo.data.product.quantity) {
          if (itemInfo.data.product.quantity.includes(",")) {
            const quantityStringArray: Array<string> =
              itemInfo.data.product.quantity.split(",");
            const quantityWithUnits: string = quantityStringArray[0];
            const quantityUnitArray: Array<string> =
              quantityWithUnits.split(" ");
            quantityJustNumber = quantityUnitArray[0];
            quantityJustUnit = quantityUnitArray[1];
          } else {
            const quantityUnitArray: Array<string> =
              itemInfo.data.product.quantity.split(" ");
            quantityJustNumber = quantityUnitArray[0];
            quantityJustUnit = quantityUnitArray[1];
          }
        }

        let category: string = "";

        if (itemInfo.data.product.categories_hierarchy) {
          if (itemInfo.data.product.categories_hierarchy[0].includes(":")) {
            let categoryStringArray: Array<string> =
              itemInfo.data.product.categories_hierarchy[0].split(":");
            category = categoryStringArray[1];
          } else {
            category = itemInfo.data.product.categories_hierarchy[0];
          }
        }

        item = {
          name: itemInfo.data.product.product_name
            ? itemInfo.data.product.product_name
            : "",
          category: category ? category : "",
          quantity:
            quantityJustNumber && !Number.isNaN(Number(quantityJustNumber))
              ? Number(quantityJustNumber)
              : 1,
          unit: quantityJustUnit ? quantityJustUnit : "unit",
        };
      }
    })
    .catch(console.log);
  return item;
};

export const addToGraveyard = async (id: number) => {
  await get(
    child(ref(db), `${auth.currentUser!.uid}` + "/pantry/" + String(id))
  )
    .then((snapshot) => snapshot.val())
    .then(async (data) => {
      await set(
        ref(db, `${auth.currentUser!.uid}` + "/graveyard/" + String(id)),
        data
      );

      console.log("graveyard item set successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const emptyGraveyard = async () => {
  await set(ref(db, `${auth.currentUser!.uid}/graveyard/`), null);
};

export const getGraveyard = async () => {
  let graveyardItems = {};
  await get(child(ref(db), `${auth.currentUser!.uid}` + "/graveyard/"))
    .then((snapshot) => {
      return snapshot.val();
    })
    .then((data) => {
      graveyardItems = data;
    })
    .catch((err) => {
      console.log(err);
    });
  if (graveyardItems === null) return [];
  return Object.values(graveyardItems);
};

export const suggestRecipes = async () => {
  const currentPantry = await getPantry();
  const recipesWithScores: Array<object> = [];
  recipes.forEach((recipe: any) => {
    let score = 0;
    let ingredients = recipe.ingredients.ingredient.map(
      (ingredient: any) => ingredient.food_name
    );
    currentPantry.forEach((item: any) => {
      ingredients.forEach((ingredient: any) => {
        if (!ingredient.toLowerCase().includes(item.toLowerCase)) {
          score++;
        }
      });
    });
    recipes.push(recipesWithScores.push({ recipe, score }));
  });
  recipesWithScores.sort((a: any, b: any) => b.score - a.score);
  const recipesShortForm = recipesWithScores.map((recipe: any) => {
    return {
      recipe_name: recipe.recipe.recipe_name,
      recipe_image_url: Array.isArray(recipe.recipe.recipe_images.recipe_image)
        ? recipe.recipe.recipe_images.recipe_image[0]
        : recipe.recipe.recipe_images.recipe_image,
      recipe_URL: recipe.recipe.recipe_url
    };
  });
  if (recipesShortForm.length < 5) return recipesShortForm;
  return recipesShortForm.slice(0, 5);
};
