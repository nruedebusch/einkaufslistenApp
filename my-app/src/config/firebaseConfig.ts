// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const appSettings = {
  databaseURL:
    "https://realtime-database-48f9f-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
export const database = getDatabase(app);
export const shoppingListInDB = ref(database, "shoppingList");
