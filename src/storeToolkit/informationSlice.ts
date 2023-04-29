import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyState {
    information: {};
    delivery: {};
    payment: number;
}
const initialState:CompanyState= {
    information:{},
    delivery:{},
    payment:0,
}

const informationSlice = createSlice({
    name:'information',
    initialState,
    reducers:{
        addContactInformation(state,action:PayloadAction<{}>){
            state.information=action.payload;
        },
        addDataDelivery(state,action:PayloadAction<{}>){
            state.delivery=action.payload;
        },
        addAddress(state,action:PayloadAction<number>){
            state.payment = action.payload;
        }
    }
});

export default informationSlice.reducer;
export const {addContactInformation,addDataDelivery,addAddress} = informationSlice.actions;