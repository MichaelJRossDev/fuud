import * as pantry from "../src/pantry";
import { get, ref, getDatabase, child } from "firebase/database";
import { app, db, auth } from "../config/firebaseConfig";
import { signIn } from "../src/users";

describe.only("Add item", () => {
  test("Should add items to the Pantry", async () => {
    const item: pantry.PantryItem = {
      name: "banana",
      expiry: new Date(2024, 1, 1),
      category: "Fruit",
      quantity: 5,
      unit: "units",
      item_id: Date.now(),
    };
    signIn("michaeljrossdev@gmail.com", "password");

    await pantry.addItem({ ...item });
    const dbRef = ref(db);

    get(child(dbRef, `${auth.currentUser}` + "/pantry/" + item.item_id)).then(
      snapshot => {
        const dbItem = snapshot.val();
        expect(dbItem).toEqual(item);
      }
    );
  });
});
