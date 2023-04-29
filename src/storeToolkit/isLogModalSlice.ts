import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IsLogModalState {
    modalAction: boolean;
    isLog: boolean;
}

const initialState: IsLogModalState  = {   
        modalAction: false,
        isLog: false,
};

const isLogModalSlice = createSlice({
    name: 'isLogModal',
    initialState,
    reducers: {
        modalIsAction(state, action: PayloadAction<boolean>) {
            state.modalAction = action.payload;
        },
        userIsLoggin(state, action: PayloadAction<boolean>) {
            state.isLog = action.payload;
        },
    },

});

export default isLogModalSlice.reducer;
export const { modalIsAction, userIsLoggin } = isLogModalSlice.actions;