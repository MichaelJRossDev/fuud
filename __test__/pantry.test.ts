import * as pantry from "../src/pantry";
import { get, ref, getDatabase, child } from "firebase/database";
import { app, db, auth } from "../config/firebaseConfig";
import { signIn } from "../src/users";

describe("Add item", () => {
  test("Should add items to the Pantry", async () => {
    const item: pantry.PantryItem = {
      name: "banana",
      expiry: Number(new Date(2024, 1, 1)),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: Date.now(),
    };
    await signIn("michaeljrossdev@gmail.com", "password");

    

    await pantry.addItem({ ...item });
    const dbRef = ref(db);

   await get(child(dbRef, `${auth.currentUser!.uid}` + "/pantry/" + item.item_id))
      .then((snapshot) => {
        const dbItem = snapshot.val()
        
        expect(dbItem).toEqual(item)
      })
  });
});
