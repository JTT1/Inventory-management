import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyDOTXsb7aThU7WQIlRORfchX3uLuyBpZFc",
    databaseURL: "https://inventory-management-54dc3-default-rtdb.europe-west1.firebasedatabase.app/"

};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();
export const ROOT_REF = '/inventory/';