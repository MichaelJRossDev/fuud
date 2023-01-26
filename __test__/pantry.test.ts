import * as pantry from "../src/pantry";
import { get, ref, getDatabase, child } from "firebase/database";
import { app, db, auth } from "../config/firebaseConfig";
import { signIn, signOutUser } from "../src/users";

beforeAll(async () => {
  await signOutUser();
  await signIn("michaeljrossdev@gmail.com", "password");
});

beforeEach(async () => {
  await pantry.emptyPantry();
});

afterAll(async () => {
  await pantry.emptyPantry();
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
      .then(snapshot => snapshot.val())
      .then(data => Object.values(data)[0])
      .then(object => {
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
      .then(snapshot => snapshot.val())
      .then(data => {
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
    // const list = await pantry.getPantry();
    const pantryItems = await pantry.getPantry();
    const values = Object.values(pantryItems);
    expect(values).toHaveLength(5);
    expect(values).toEqual(
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


describe('deleteItemById', () => {
  test('should delete item by ID', async () => {
    const item1: pantry.PantryItem = {
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: 42
    }

    const item2: pantry.PantryItem = {
      name: "pineapple",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: 43
    }

    await pantry.addItem(item1)
    await pantry.addItem(item2)
    pantry.deleteItemById(42)

    const pantryKeys:Array<string> = Object.keys(await pantry.getPantry());
    
    expect(pantryKeys).toHaveLength(1)
    expect(pantryKeys).not.toContain("42")
  });
});

