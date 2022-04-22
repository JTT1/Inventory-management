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
    try {
        return db.ref(LOANS_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const userLoans = keys.map((key) => items[key]).filter((item) => (item.userID === userId));
            fnData(userLoans);
            fnLoaded(true);
    });
    } catch (err) {
        return error.message;
    }
}

function getCurrentDate() {
    const now = new Date();
    const month = Number(now.getMonth() + 1) < 10 ? '0' + Number(now.getMonth() + 1) : Number(now.getMonth() + 1);
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const currentDate = day + '/' + month + '/' + now.getFullYear();
    return currentDate;
}

export function updateUserLoans(data) {
    try {
    return db.ref(LOANS_REF + data.ID).update({
        lainattuMaara: data.lainattuMaara,
        palautettuKokonaan: data.palautettuKokonaan,
        palautukset: data.palautukset,
        palautusPvm: getCurrentDate(),
    });
    } catch (error) {
        return error.message;
    }
}

export const createNewLoan = async (data) => {
    try {
        return db.ref(LOANS_REF).push({
        komponentti: data.komponentti,
            lainattuMaara: Number(data.lainattuMaara),
        lainausPvm: getCurrentDate(),
        palautettuKokonaan: false,
        palautukset: 0,
        palautusPvm: "",
        projekti: data.projekti,
            userID: data.userID,
    });
    } catch (error) {
        return error.message;
    }
}

export function addNewBrokenItem(data) {
    try {
    return db.ref(BROKEN_REF).push({
        description: data.description,
        itemID: data.itemID,
        user: data.user,
        ilmoitusPvm: getCurrentDate(),
        havitetty: false,
    });
    } catch (error) {
        return error.message;
    }

}



export const storeUserData = async (value) => {
  try {
    await AsyncStorage.setItem('@userInfo', value)
  } catch (e) {
    Alert.alert("virhe!", e.toString())
  }
      }

export const removeUserData = async (target) => {
  try {
    await AsyncStorage.removeItem(target)
  } catch (e) {
    Alert.alert("virhe!", e.toString())
  }
}

export const userStatus = async () => {
    try {
        let result = await AsyncStorage.getItem('@userInfo')
        return result;
        
    } catch (error) {
        Alert.alert("Virhe!", error.toString())
    }
}


export async function logout() {
  try {
      await firebase.auth().signOut();
      console.log("pihalla");
      removeUserData('@userInfo');
      let testi = await AsyncStorage.getItem('@userInfo')
      console.log(testi + " tässä se viesti!");
  } catch (err) {
      console.log("Logout error. ", err.message);
      Alert.alert("Logout error. ", err.message);
  }
}
