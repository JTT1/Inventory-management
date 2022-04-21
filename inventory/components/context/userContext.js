import React, { createContext } from 'react';

const initialValue = {
    id: {
        email: "",
        etunimi: "",
        sukunimi: "",
        rooli: "",
    }
}
export const UserContext = createContext(initialValue);
