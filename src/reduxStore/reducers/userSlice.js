import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { firestore } from "firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { Routes } from "react-router";
import { GetIndividualUserData } from "utils/authService";
import { ROUTES } from "utils/routes";

const initialState = {
    user: {
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
        userId: "",
    }
}

// handles signup
export const signUpUser = createAsyncThunk(
    "auth/signUpUser",
    async (userID, { rejectWithValue }) => {
        try {
            console.log("userID ", userID);
            const userRef = doc(firestore, `users/${userID}`);

            const response = await getDoc(userRef);
            // console.log(response.data(), response.id, setUserData, userID);
            console.log(response.data()[userID]);
            return response.data()[userID];

        } catch (err) {
            return rejectWithValue(err?.response);
        }
    }
);


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserDataHandler: (state, action) => {
            console.log(state, action, action.payload);
            // state = { ...action.payload }
            const userRef = doc(firestore, `users/${action.payload}`);
            (async () => {
                const response = await getDoc(userRef);
                // console.log(response.data(), response.id, setUserData, userID);
                console.log(response.data()[action.payload]);
                state.bio = response.data()[action.payload].bio;
            })();
        },
        resetUserHandler: (state, action) => {
            console.log(state, action);
            state.user = {
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
            };
        }

    },

    extraReducers(builder) {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                console.log(action);
                // state = action.payload;
                state.user = action.payload
                //   "buzzgram-user",
                //   JSON.stringify(action.payload.createdUser)
                // );
                // localStorage.setItem(ROUTES.VAR_ENCODE_TOKEN, action.payload.encodedToken);
                // Toast.success("User creater successfully");
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})



export const { getUserDataHandler, resetUserHandler } = userSlice.actions;
export default userSlice.reducer;