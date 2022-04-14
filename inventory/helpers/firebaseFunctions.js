import { db, ROOT_REF } from '../firebase/Config';

export function fetchAllItems(fn) {
    return db.ref(ROOT_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const mappedItems = keys.map((key) => items[key])
        fn(mappedItems);
    });
}