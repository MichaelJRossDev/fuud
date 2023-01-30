import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

export const signIn = async (email: string, password: string, stateSet: any) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      stateSet(true);
      console.log("Login Success")
    })
    .catch((err) => alert("Username or Password is Incorrect"));
};

export const createUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => console.log("User created"))
    .catch((err) => console.log("Error during user creation:", err));
};

export const signOutUser = async () => {
  await signOut(auth)
    .then(() => console.log("User signed out successfully"))
    .catch((err) => console.log("Error signing out:", err));
};
