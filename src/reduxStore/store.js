import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
    reducer: {
        authUserCredential: authSlice,
        userDataCredential: userSlice,
    }
});
 
export { store };