import { createContext } from 'react';

const user = {
    id: {
        email: "",
        etunimi: "",
        sukunimi: "",
        rooli: "",
    }
}
export const UserContext = createContext({
    user: {
        id: {
            email: "",
            etunimi: "",
            sukunimi: "",
            rooli: "",
        }
    },
    setUser: (userInfo) => { }
});
