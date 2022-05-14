import React, { createContext, useContext, useReducer } from "react";
import { ROUTES } from "utils/routes";

const UserDataContext = createContext({});

const UserDataReducer = (state, action) => {

}
let initialStateUserData = {}

const UserDateProvider = ({ children }) => { 
    const { userData, setUserDate } = useReducer(UserDataReducer, initialStateUserData);
    return <UserDataContext.Provider value={{userData, setUserDate}}>
        { children}
    </UserDataContext.Provider>
}

const useUserData = () => useContext(UserDataContext);

export {UserDateProvider,useUserData}