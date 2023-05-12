import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface changeState {
    confirmInformation:boolean;
    confirmDelivery:boolean;
    confirmOrder:boolean;
}
const initialState:changeState= {
    confirmInformation:false,
    confirmDelivery:false,
    confirmOrder:false,
}

const changeDisabledSlice = createSlice({
    name:'disabled',
    initialState,
    reducers:{
        changeDisabledConfirm(state,action:PayloadAction<boolean>){
            state.confirmOrder=action.payload;
        },
        changeDeliveryConfirm(state,action:PayloadAction<boolean>){
            state.confirmDelivery=action.payload;
        },
        changeInformationConfirm(state,action:PayloadAction<boolean>){
            state.confirmInformation=action.payload;
        },
    }
});

export default changeDisabledSlice.reducer;
export const {changeDisabledConfirm, changeDeliveryConfirm, changeInformationConfirm} = changeDisabledSlice.actions;