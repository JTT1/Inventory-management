import { db, ROOT_REF, LOANS_REF } from '../firebase/Config';

export function fetchAllItems(fn) {
    return db.ref(ROOT_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const mappedItems = keys.map((key) => items[key])
        fn(mappedItems);
    });
}


// WIP - hakee kaikki lainat atm
// Pitäisi hakea hakea kirjautuneen käyttäjän aktiiviset lainat ja komponenteista tiedot
export function getCurrentUserLoans(fn) {
    return db.ref(LOANS_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const mappedItems = keys.map((key) => items[key])
        fn(mappedItems);
    });
}