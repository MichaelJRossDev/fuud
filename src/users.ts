import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app, db, auth } from '../config/firebaseConfig';

export const signIn = (email:string, password:string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => console.log("Login failure"));
}

export const createUser = (email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("User created"))
        .catch((err) => console.log("Error during user creation"))
}