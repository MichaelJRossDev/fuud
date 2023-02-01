import * as users from "../src/users";
import { getAuth } from "firebase-admin/auth";
import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { send } from "process";


const admin = require("firebase-admin");

const serviceAccount = require("../config/fuud-34a91-68792cd675af.json");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://fuud-34a91-default-rtdb.europe-west1.firebasedatabase.app",
});

const adminAuth = getAuth(adminApp);

let currentId: string;

describe("Create User", () => {
  test("should create user in database", async () => {
    await users
      .createUser("testemail@hotmail.com", "testPassword")
      .then(() => adminAuth.getUserByEmail("testemail@hotmail.com"))
      .then((user) => {
        currentId = user.uid;
        expect(user.email).toBe("testemail@hotmail.com");
        return user;
      })
      .then((user) => adminAuth.deleteUser(user.uid));
  });
});

describe("Sign in user", () => {
  test("should sign in user", async () => {
    await users.signOutUser()
    await users.signIn("michaeljrossdev@gmail.com", "password", () => {});
      expect(auth.currentUser!.email).toBe("michaeljrossdev@gmail.com");
  });
});