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
            email: "",
            etunimi: "",
            sukunimi: "",
            rooli: "",
        ID: ""
    },
    setUser: (userInfo) => { }
});
