import { Alert } from 'react-native';
import { db, ROOT_REF, LOANS_REF, BROKEN_REF, LOCKERS_REF, firebase } from '../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function fetchAllItems(setData) {
    return db.ref(ROOT_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const mappedItems = keys.map((key) => items[key])
        setData(mappedItems);
    });
}

export function getCurrentUserLoans(setData, setLoaded, userId) {
    try {
        return db.ref(LOANS_REF).on('value', querySnapShot => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            let loanData = keys.map((key) => {
                return { ...items[key], ID: key };
            })
            const userLoans = loanData.filter((item) => (item.userID === userId));
            setData(userLoans);
            setLoaded(true);
        });
    } catch (error) {
        return error.message;
    }
}

function currentDate() {
    // const serverTime = firebase.database.ServerValue.TIMESTAMP;
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
            palautusPvm: currentDate(),
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
            lainausPvm: currentDate(),
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
            lainausID: data.itemID,
            kuvaus: data.description,
            käyttäjä: data.user,
            ilmoitusPvm: currentDate(),
            havitetty: false,
        });
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

// on QR code scan
export const getTrayItems = async (trayName) => {
    return await db.ref(LOCKERS_REF) // query all lockers -> find the correct tray
        .once('value')
        .then((querySnapShot) => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            let trayData = keys.map((key) => {
                return { ...items[key], ID: key };
            });
            const matchTray = trayData.filter((tray) => tray.tarjotinNimi === trayName);
            return matchTray
        })
        .then((tray) => { // after tray is found -> find items matching the content of the tray
            const [trayItems] = tray.map(tray => tray.trayItems);
            const itemKeys = Object.keys(trayItems);
            let test = itemKeys.map(async (key) => {
                return await db.ref(ROOT_REF + trayItems[key])
                    .get('value')
                    .then((querySnapShot) => {
                        const data = querySnapShot.val() ? querySnapShot.val() : {};
                        const item = { ...data, ID: trayItems[key] };
                        return item
                    })
            })
            return Promise.all(test);
        }, (error) => {
            console.log('The read failed: ' + error.name);
            return []
        });
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
