"use strict";
// Import the functions you need from the SDKs you need
exports.__esModule = true;
var app_1 = require("firebase/app");
var analytics_1 = require("firebase/analytics");
var database_1 = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCKOUPUBB8pgVuHi1_p1oW-2emVi0AAsMg",
    authDomain: "fuud-34a91.firebaseapp.com",
    databaseURL: "https://fuud-34a91-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fuud-34a91",
    storageBucket: "fuud-34a91.appspot.com",
    messagingSenderId: "918281661134",
    appId: "1:918281661134:web:cf7d855a0b6b87b41a3e9f",
    measurementId: "G-E5GVKX5L38"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, database_1.getDatabase)(app);
if (app.name && typeof window !== "undefined") {
    var analytics = (0, analytics_1.getAnalytics)(app);
}
(0, database_1.set)((0, database_1.ref)(db, "users/" + 5), {
    username: "liam123",
    email: "liam@gmail.com"
});
