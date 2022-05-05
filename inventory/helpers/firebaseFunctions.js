import { Alert } from 'react-native';
import { db, ROOT_REF, LOANS_REF, BROKEN_REF, LOCKERS_REF, USERS_REF, PROJECTS_REF, firebase } from '../firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchAllItems() {
    return db.ref(ROOT_REF)
        .get('value')
        .then(querySnapShot => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            const mappedItems = keys.map((key) => {
                return { ...items[key], ID: key }
            });
            return mappedItems;
        })
}

export const updateItemAmount = async (item, { add }) => {
    await db.ref(ROOT_REF + item.ID)
        .get()
        .then((querySnapShot) => querySnapShot.val().Maara)
        .then((amount) => {
            if (add) {
                db.ref(ROOT_REF + item.ID).update({
                    Maara: amount + item.maara
                })
            } else {
                db.ref(ROOT_REF + item.ID).update({
                    Maara: amount - item.maara
                })
            }
        })
}

export async function fetchProjects() {
    return db.ref(PROJECTS_REF + 'ryhmat/')
        .once('value')
        .then(querySnapShot => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            const mappedItems = keys.map((key) => items[key]);
            return mappedItems;
    });
}

export async function updateProjects(projectsArray) {
    return await db.ref(PROJECTS_REF).update({
        ryhmat: projectsArray
    });
}

export function fetchTrays2(setTrays) {
    return db.ref(LOCKERS_REF)
        .on('value', querySnapShot => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            const mappedItems = keys.map((key) => {
                return { ...items[key], ID: key }
            })
            setTrays(mappedItems)
        });
}
export async function fetchTrays() {
    return db.ref(LOCKERS_REF)
        .once('value')
        .then(querySnapShot => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            const mappedItems = keys.map((key) => {
                return { ...items[key], ID: key }
            });
            return mappedItems;
        });
}

export async function fetchUser(email) {
    return db.ref(USERS_REF)
        .once('value')
        .then((querySnapShot) => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            let users = keys.map((key) => {
                return { ...items[key], ID: key };
            })
            const user = users.find((user) => (user.email === email));
            return user;
        })
        .catch((error) => {
            return error;
        })
}

export async function fetchAllUsers() {
    return db.ref(USERS_REF)
        .once('value')
        .then((querySnapShot) => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            let users = keys.map((key) => {
                return { ...items[key], ID: key };
            })
            return users;
        })
        .catch((error) => {
            return error;
        })
}

export async function fetchAllLoans() {
    return db.ref(LOANS_REF)
        .once('value')
        .then((querySnapShot) => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            let loans = keys.map((key) => {
                return { ...items[key], ID: key };
            })
            return loans;
        })
        .catch((error) => {
            return error;
        })
}

export const updateUserInfo = async (data) => {
    return await db.ref(USERS_REF + data.ID).update({
        etunimi: data.etunimi,
        sukunimi: data.sukunimi,
        rooli: data.rooli,
        email: data.email,
    })
}

export function getCurrentUserLoans(setData, setLoaded, userId) {
        return db.ref(LOANS_REF)
            .on('value', querySnapShot => {
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
}

function currentDate() {
    const now = new Date();
    const month = Number(now.getMonth() + 1) < 10 ? '0' + Number(now.getMonth() + 1) : Number(now.getMonth() + 1);
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const currentDate = day + '/' + month + '/' + now.getFullYear();
    return currentDate;
}


export const createNewLoan = async (data) => {
    try {
        return await db.ref(LOANS_REF).push({
            komponenttiID: data.komponenttiID,
            komponentti: data.komponentti,
            lainattuMaara: data.lainattuMaara,
            lainausPvm: currentDate(),
            palautettuKokonaan: false,
            palautukset: 0,
            palautusPvm: "",
            projekti: data.projekti,
            userID: data.userID,
            userEmail: data.userEmail,
        });
    } catch (error) {
        return error.message;
    }
}

export async function updateUserLoans(data) {
    return await db.ref(LOANS_REF + data.ID).update({
        lainattuMaara: data.lainattuMaara,
        palautettuKokonaan: data.palautettuKokonaan,
        palautukset: data.palautukset,
        palautusPvm: currentDate(),
    }, () => true);
}

export function addNewBrokenItem(data) {
    return db.ref(BROKEN_REF).push({
            lainausID: data.itemID,
            kuvaus: data.description,
        user: data.user,
            ilmoitusPvm: currentDate(),
            havitetty: false,
    });
}

// on QR code scan
export const getTrayItems = async (trayName) => {

    try {
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
            let items = itemKeys.map(async (key) => {
                return await db.ref(ROOT_REF + trayItems[key])
                    .once('value')
                    .then((querySnapShot) => {
                        const data = querySnapShot.val() ? querySnapShot.val() : {};
                        const item = { ...data, ID: trayItems[key] };
                        return item;
                    })
            })
            return Promise.all(items);
        })
    } catch (error) {
        return [];
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
        return true;
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
        await removeUserData('@userInfo');
        return await AsyncStorage.getItem('@userInfo');
    } catch (err) {
        return Alert.alert("Logout error. ", err.message);
    }
}
