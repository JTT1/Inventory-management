import { Alert } from 'react-native';
import { db, ROOT_REF, LOANS_REF, BROKEN_REF, firebase } from '../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function fetchAllItems(fn) {
    return db.ref(ROOT_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const mappedItems = keys.map((key) => items[key])
        fn(mappedItems);
    });
}

export function getCurrentUserLoans(fnData, fnLoaded, userId) {
    return db.ref(LOANS_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const userLoans = keys.map((key) => items[key]).filter((item) => (item.userID === userId));
        fnData(userLoans);
        fnLoaded(true);
    });
}

function getCurrentDate() {
    const now = new Date();
    const month = Number(now.getMonth() + 1) < 10 ? '0' + Number(now.getMonth() + 1) : Number(now.getMonth() + 1);
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const currentDate = day + '/' + month + '/' + now.getFullYear();
    return currentDate;
}

export function updateUserLoans(data) {
    return db.ref(LOANS_REF + data.ID).update({
        lainattuMaara: data.lainattuMaara,
        palautettuKokonaan: data.palautettuKokonaan,
        palautukset: data.palautukset,
        palautusPvm: getCurrentDate(),
    });
}

export const createNewLoan = (data) => {
    const nodeId = db.ref(LOANS_REF).push().getKey();
    return db.ref(LOANS_REF).push({
        ID: nodeId,
        komponentti: data.komponentti,
        lainattuMaara: data.lainattuMaara,
        lainausPvm: getCurrentDate(),
        palautettuKokonaan: false,
        palautukset: 0,
        palautusPvm: "",
        projekti: data.projekti,
        userID: data.userID,
    });
}

export function addNewBrokenItem(data) {
    return db.ref(BROKEN_REF).push({
        description: data.description,
        itemID: data.itemID,
        user: data.user,
        ilmoitusPvm: getCurrentDate(),
        havitetty: false,
    });
}

export async function logout() {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.log("Logout error. ", err.message);
        alert.alert("Logout error. ", err.message);
    }
}

export const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
      }





export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      
    }
  } catch(e) {
    // error reading value
  }


}
