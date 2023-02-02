import * as pantry from "../src/pantry";
import { get, ref, getDatabase, child } from "firebase/database";
import { app, db, auth } from "../config/firebaseConfig";
import { signIn, signOutUser } from "../src/users";
import { onlyChanged } from "../jest.config";

beforeAll(async () => {
  await signOutUser();
  await signIn("michaeljrossdev@gmail.com", "password", () => {});
});

beforeEach(async () => {
  await pantry.emptyPantry();
});

afterAll(async () => {
  await pantry.emptyPantry();
  await pantry.emptyGraveyard();
  await signOutUser();
});

describe("Add item", () => {
  test("Should add items to the Pantry", async () => {
    const item: pantry.PantryItem = {
      name: "banana",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: 200,
    };
    await pantry.addItem({ ...item });
    const dbRef = ref(db);

    await get(
      child(dbRef, `${auth.currentUser!.uid}` + "/pantry/" + item.item_id)
    ).then((snapshot) => {
      const dbItem = snapshot.val();

      expect(dbItem).toEqual(item);
    });
  });

  test("Should add item without item_id", async () => {
    const item: pantry.PantryItem = {
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
    };
    const dbRef = ref(db);

    await pantry.addItem({ ...item });

    await get(child(dbRef, `${auth.currentUser!.uid}` + "/pantry/"))
      .then((snapshot) => snapshot.val())
      .then((data) => Object.values(data)[0])
      .then((object) => {
        expect(object).toMatchObject({
          name: "pineapple",
          expiry: Number(new Date(2024, 1, 1)),
          category: "Fruit",
          quantity: 5,
          unit: "units",
          item_id: expect.any(Number),
        });
      });
  });
});

describe("emptyPantry", () => {
  test("pantry is emptied", async () => {
    for (let i = 0; i < 5; i++) {
      pantry.addItem({
        name: i.toString(),
        expiry: Number(new Date(2024, 1, i)),
        category: (i * 2).toString(),
        quantity: i * 3,
        unit: "Lightyears",
        item_id: Number(Date.now()),
      });
    }
    pantry.emptyPantry();
    const dbRef = ref(db);
    await get(child(dbRef, `${auth.currentUser!.uid}` + "/pantry/"))
      .then((snapshot) => snapshot.val())
      .then((data) => {
        expect(data).toEqual(null);
      });
  });
});

describe("getPantry", () => {
  test("gets all items from pantry", async () => {
    for (let i = 0; i < 5; i++) {
      await pantry.addItem({
        name: i.toString(),
        expiry: Number(new Date(2024, 1, i)),
        category: (i * 2).toString(),
        quantity: i * 3,
        unit: "Lightyears",
        item_id: Number(Date.now()),
      });
    }
    const pantryItems = await pantry.getPantry();
    expect(pantryItems).toHaveLength(5);
    expect(pantryItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          expiry: expect.any(Number),
          category: expect.any(String),
          quantity: expect.any(Number),
          unit: expect.any(String),
          item_id: expect.any(Number),
        }),
      ])
    );
  });
});

describe("deleteItemById", () => {
  test("should delete item by ID", async () => {
    const item1: pantry.PantryItem = {
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: 42,
    };

    const item2: pantry.PantryItem = {
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: 43,
    };

    await pantry.addItem(item1);
    await pantry.addItem(item2);
    pantry.deleteItemById(42);

    const pantryKeys: Array<string> = Object.keys(await pantry.getPantry());

    expect(pantryKeys).toHaveLength(1);
    expect(pantryKeys).not.toContain("42");
  });
});

describe("filterPantry", () => {
  test("Applies filters to pantry", async () => {
    await pantry.addItem({
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "fruit",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "bacon",
      expiry: Number(new Date(2024, 1, 1)),
      category: "meat",
      quantity: 4,
      unit: "kg",
    });
    await pantry.addItem({
      name: "Broccoli",
      expiry: Number(new Date(2024, 1, 1)),
      category: "vegetable",
      quantity: 400,
      unit: "g",
    });
    await pantry.addItem({
      name: "kiwi",
      expiry: Number(new Date(2024, 1, 1)),
      category: "fruit",
      quantity: 8,
      unit: "units",
    });
    await pantry.addItem({
      name: "pesto",
      expiry: Number(new Date(2024, 1, 1)),
      category: "condiment",
      quantity: 800,
      unit: "g",
    });
    const currentPantry: any = await pantry.getPantry();
    const filteredPantry = await pantry.filterPantry(currentPantry, {
      category: "fruit",
    });

    expect(filteredPantry).toHaveLength(2);
    expect(filteredPantry).toEqual([
      {
        name: "pineapple",
        expiry: Number(new Date(2024, 1, 1)),
        category: "fruit",
        quantity: 4,
        unit: "unit",
        item_id: expect.any(Number),
      },
      {
        name: "kiwi",
        expiry: Number(new Date(2024, 1, 1)),
        category: "fruit",
        quantity: 8,
        unit: "units",
        item_id: expect.any(Number),
      },
    ]);
  });

  test("filters pantry by unit", async () => {
    await pantry.addItem({
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "fruit",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "bacon",
      expiry: Number(new Date(2024, 1, 1)),
      category: "meat",
      quantity: 4,
      unit: "kg",
    });
    await pantry.addItem({
      name: "Broccoli",
      expiry: Number(new Date(2024, 1, 1)),
      category: "vegetable",
      quantity: 400,
      unit: "g",
    });
    await pantry.addItem({
      name: "kiwi",
      expiry: Number(new Date(2024, 1, 1)),
      category: "fruit",
      quantity: 8,
      unit: "units",
    });
    await pantry.addItem({
      name: "pesto",
      expiry: Number(new Date(2024, 1, 1)),
      category: "condiment",
      quantity: 800,
      unit: "g",
    });

    const currentPantry: any = await pantry.getPantry();
    const filteredPantry = await pantry.filterPantry(currentPantry, {
      unit: "g",
    });

    expect(filteredPantry).toHaveLength(2);
    expect(filteredPantry).toEqual([
      {
        name: "Broccoli",
        expiry: Number(new Date(2024, 1, 1)),
        category: "vegetable",
        quantity: 400,
        unit: "g",
        item_id: expect.any(Number),
      },
      {
        name: "pesto",
        expiry: Number(new Date(2024, 1, 1)),
        category: "condiment",
        quantity: 800,
        unit: "g",
        item_id: expect.any(Number),
      },
    ]);
  });
});

describe("searchPantry", () => {
  test("searches pantry", async () => {
    await pantry.addItem({
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "bacon",
      expiry: Number(new Date(2024, 1, 1)),
      category: "meat",
      quantity: 4,
      unit: "kg",
    });
    await pantry.addItem({
      name: "Broccoli",
      expiry: Number(new Date(2024, 1, 1)),
      category: "vegetable",
      quantity: 400,
      unit: "g",
    });
    await pantry.addItem({
      name: "kiwi",
      expiry: Number(new Date(2024, 1, 1)),
      category: "fruit",
      quantity: 8,
      unit: "units",
    });
    await pantry.addItem({
      name: "pesto",
      expiry: Number(new Date(2024, 1, 1)),
      category: "condiment",
      quantity: 800,
      unit: "g",
    });

    const currentPantry: any = await pantry.getPantry();

    expect(await pantry.searchPantry(currentPantry, "es")).toEqual([
      {
        name: "pesto",
        expiry: Number(new Date(2024, 1, 1)),
        category: "condiment",
        quantity: 800,
        unit: "g",
        item_id: expect.any(Number),
      },
    ]);
    expect(await pantry.searchPantry(currentPantry, "fr")).toEqual([
      {
        name: "pineapple",
        expiry: Number(new Date(2024, 1, 1)),
        category: "Fruit",
        quantity: 4,
        unit: "unit",
        item_id: expect.any(Number),
      },
      {
        name: "kiwi",
        expiry: Number(new Date(2024, 1, 1)),
        category: "fruit",
        quantity: 8,
        unit: "units",
        item_id: expect.any(Number),
      },
    ]);
  });
});


describe("getItemInfo", () => {
  test("gets correct information in correct format", async () => {
    expect(await pantry.getItemInfoByBarcode("50457236")).toEqual({
      name: "Tomato Ketchup",
      category: "condiments",
      quantity: 800,
      unit: "ml"
    });
  }, 60000)
})

describe("addToGraveyard", () => {
  test("adds item to graveyard and deletes from pantry", async () => {
    await pantry.addItem({
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 4,
      unit: "unit",
      item_id: 4,
    });

    await pantry.addToGraveyard(4);

    await get(child(ref(db), `${auth.currentUser!.uid}` + "/graveyard/" + "4"))
      .then((snapshot) => snapshot.val())
      .then((data) => {
        expect(data).toEqual({
          name: "pineapple",
          expiry: Number(new Date(2024, 1, 1)),
          category: "Fruit",
          quantity: 4,
          unit: "unit",
          item_id: 4,
        });
      });

  });
});

describe("emptyGraveyard", () => {
  test("empties graveyard", async () => {
    await pantry.addItem({
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 4,
      unit: "unit",
      item_id: 4,
    });

    await pantry.addToGraveyard(4);

    await pantry.emptyGraveyard();

    const graveyardItems = await pantry.getGraveyard();
    expect(graveyardItems).toEqual([]);
  });
});

describe("getGraveyard", () => {
  test("gets all items from graveyard", async () => {
    const itemIDArray = [];

    await pantry.emptyGraveyard();
    for (let i = 0; i < 5; i++) {
      await pantry.addItem({
        name: i.toString(),
        expiry: Number(new Date(2024, 1, i)),
        category: (i * 2).toString(),
        quantity: i * 3,
        unit: "Lightyears",
        item_id: Number(Date.now()),
      });
    }

    const pantryItems: Array<any> = await pantry.getPantry();
    for (let i = 0; i < pantryItems.length; i++) {
      await pantry.addToGraveyard(pantryItems[i].item_id);
    }

    const graveyardItems = await pantry.getGraveyard();
    expect(graveyardItems).toHaveLength(5);
    expect(graveyardItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          expiry: expect.any(Number),
          category: expect.any(String),
          quantity: expect.any(Number),
          unit: expect.any(String),
          item_id: expect.any(Number),
        }),
      ])
    );
  });
});

describe('suggestRecipes', () => {
  test("suggestedRecipes come back in correct format", async () => {
    await pantry.addItem({
      name: "Dry Chicken Broth",
      expiry: Number(new Date(2024, 1, 1)),
      category: "",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "Potato",
      expiry: Number(new Date(2024, 1, 1)),
      category: "meat",
      quantity: 4,
      unit: "kg",
    });
    await pantry.addItem({
      name: "Kale",
      expiry: Number(new Date(2024, 1, 1)),
      category: "vegetable",
      quantity: 400,
      unit: "g",
    });
    await pantry.addItem({
      name: "Sausage",
      expiry: Number(new Date(2024, 1, 1)),
      category: "fruit",
      quantity: 8,
      unit: "units",
    });
    await pantry.addItem({
      name: "Onion",
      expiry: Number(new Date(2024, 1, 1)),
      category: "condiment",
      quantity: 800,
      unit: "g",
    });
    await pantry.addItem({
      name: "Flour",
      expiry: Number(new Date(2024, 1, 1)),
      category: "",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "Sour Cream",
      expiry: Number(new Date(2024, 1, 1)),
      category: "",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "Egg",
      expiry: Number(new Date(2024, 1, 1)),
      category: "",
      quantity: 4,
      unit: "unit",
    });
    await pantry.addItem({
      name: "Walnuts",
      expiry: Number(new Date(2024, 1, 1)),
      category: "",
      quantity: 4,
      unit: "unit",
    });
    console.log("reached here");
    const suggestedRecipes = await pantry.suggestRecipes()
    expect(suggestedRecipes).toHaveLength(5)
    suggestedRecipes.forEach(recipe => {
      expect(recipe).toEqual(
        expect.objectContaining({
          recipe_name: expect.any(String),
          recipe_image_url: expect.any(String),
          recipe_URL: expect.any(String)
        })
      )
    })
  }, 70000)
});
