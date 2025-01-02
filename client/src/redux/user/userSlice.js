import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    Loading: null,
    Error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.Loading = true;
        },
        signinsuccess: (state, action) => {
            state.currentUser = action.payload,
                state.Error = null,
                state.Loading = false;
        },
        signinfailure: (state, action) => {
            state.Error = action.payload,
                state.Loading = false;
        },
        updateuserStart: (state) => {
            state.Loading = true;
        },
        updateusersuccess: (state, action) => {
            state.currentUser = action.payload,
                state.Error = null,
                state.Loading = false;
        },
        updateuserFailure: (state, action) => {
            state.Error = action.payload,
                state.Loading = false;
        },
        deleteUserStart: (state) => {
            state.Loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null,
                state.Error = null,
                state.Loading = false;
        },
        deleteUserFailure: (state, action) => {
            state.Error = action.payload,
                state.Loading = false;
        },
        signoutUserStart: (state) => {
            state.Loading = true;
        },
        signoutUserSuccess: (state, action) => {
            state.currentUser = null,
                state.Error = null,
                state.Loading = false;
        },
        signoutUserFailure: (state, action) => {
            state.Error = action.payload,
                state.Loading = false;
        }

    }
});

export const {
    signinStart, signinsuccess, signinfailure, updateuserFailure, updateusersuccess, 
    updateuserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess,
    signoutUserStart, signoutUserFailure, signoutUserSuccess } = userSlice.actions

export default userSlice.reducer;