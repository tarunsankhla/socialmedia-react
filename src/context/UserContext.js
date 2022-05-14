import React, { createContext, useContext, useReducer } from "react";
import { GetIndividualUserData } from "utils/authService";
import { ROUTES } from "utils/routes";

const UserDataContext = createContext({});


let initialStateUserData = {
    bio: "",
    bookmarks: [],
    createdAt: "",
    emailId: "",
    followers: [],
    following: [],
    headerImg: "",
    name: "",
    photo: "",
    updatedAt: "",
    userId: ""
}

const UserDateProvider = ({ children }) => {
    const { userData, setUserDate } = useReducer(UserDataReducer, initialStateUserData);
    const UserDataReducer = (state, action) => {
        GetIndividualUserData();
    }
    return <UserDataContext.Provider value={{ userData, setUserDate }}>
        {children}
    </UserDataContext.Provider>
}

const useUserData = () => useContext(UserDataContext);

export { UserDateProvider, useUserData }