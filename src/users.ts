import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db, auth } from "../config/firebaseConfig";

export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => console.log("Login success"))
    .catch((err) => console.log("Login failure"));
};

export const createUser = async(email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(() => console.log("User created"))
    .catch((err) => console.log("Error during user creation"));
};

export const logInUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => console.log("User signed in successfully"))
    .catch((err) => console.log(err));
};

export const signOutUser = async () => {
  await signOut(auth)
    .then(() => console.log("User signed out successfully"))
    .catch((err) => console.log(err));
};
