import { createSlice } from "@reduxjs/toolkit";
import signin from "../../pages/SignIn";

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
        signinfailure: (state,action) => {
            state.Error = action.payload,
            state.Loading = false;
        }

    }
});

export const {signinStart, signinsuccess, signinfailure} = userSlice.actions

export default userSlice.reducer;
