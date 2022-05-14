import React, { createContext, useContext, useReducer } from "react";
import { GetIndividualUserData } from "utils/authService";

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
const UserDataReducer = (state, action) => {
    console.log(state, action);
    switch (action.type) {
        case "getuserdata":
            return { ...action.payload }
        case "reset":
            return {...initialStateUserData}
        default:
            return { ...state}
    }
        // GetIndividualUserData();
    }
const UserDataProvider = ({ children }) => {
    const [ userData, setUserData ] = useReducer(UserDataReducer, initialStateUserData);
    
    return <UserDataContext.Provider value={{ userData, setUserData }}>
        {children}
    </UserDataContext.Provider>
}

const useUserData = () => useContext(UserDataContext);

export { UserDataProvider, useUserData }