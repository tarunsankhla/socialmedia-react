import { createSlice } from "@reduxjs/toolkit";
import { ROUTES } from "utils/routes";

const initialState =  JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN)) ?? {
    token: "",
    user: {
        name: "",
        emailId: "",
        userId: "",
        photo: "",
    },
};
console.log(initialState)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userAuthCredentialHandler: (state, action) => {
            console.log(action,initialState);
            var user = {
                name: action.payload.name,
                emailId: action.payload.emailId,
                userId: action.payload.userId,
                photo: action.payload.photo,
            };
            localStorage.setItem(ROUTES.VAR_ENCODE_TOKEN, JSON.stringify({ token: action.payload.token, user: user }))
            state.token = action.payload.token;
            state.user = user;
        },
        userAuthReset: (state) => {
            console.log(state, initialState);
            localStorage.removeItem(ROUTES.VAR_ENCODE_TOKEN);
            state.token = "";
            state.user = {
                    name: "",
                    emailId: "",
                    userId: "",
                    photo: "",
            };
        }
    }

});
export const { userAuthCredentialHandler, userAuthReset } = authSlice.actions;

export default authSlice.reducer;