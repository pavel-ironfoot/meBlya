import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: string;
    email: string;
}

interface UserSliceState {
    user: UserState;
}

const initialState: UserSliceState = {
    user: {
        token: '',
        email: '',
    },
};

const userSlice = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        userEmail(state, action: PayloadAction<string>) {
            state.user = { ...state.user, email: action.payload };
        },
        userToken(state, action: PayloadAction<string>) {
            state.user = { ...state.user, token: action.payload };
        },
        logOut(state) {
            state.user = { token: '', email: '' };
        },
    },

});

export default userSlice.reducer;
export const { userEmail, userToken, logOut } = userSlice.actions;