import { db, ROOT_REF, LOANS_REF } from '../../inventory/Firebase/Config';

export function fetchAllItems(fn) {
    return db.ref(ROOT_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const mappedItems = keys.map((key) => items[key])
        fn(mappedItems);
    });
}

export function getCurrentUserLoans(fnData, fnKeys, userId) {
    return db.ref(LOANS_REF).on('value', querySnapShot => {
        const data = querySnapShot.val() ? querySnapShot.val() : {};
        const items = { ...data };
        const keys = Object.keys(items);
        const userLoans = keys.map((key) => items[key]).filter((item) => item.userID === userId);
        fnData(userLoans);
        fnKeys(keys);
    });
}

export function updateUserLoans(data) {
    // Loan return timestamp
    const now = new Date();
    const month = Number(now.getMonth() + 1) < 10 ? '0' + Number(now.getMonth() + 1) : Number(now.getMonth() + 1);
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const currentDate = day + '/' + month + '/' + now.getFullYear();

    return db.ref(LOANS_REF + data.ID).update({
        lainattuMaara: data.lainattuMaara,
        palautettuKokonaan: data.palautettuKokonaan,
        palautukset: data.palautukset,
        palautusPvm: currentDate,
    });
}