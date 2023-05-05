import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterBasketState {
    basketCounter: number;
}
const initialState:counterBasketState= {
    basketCounter:0,
}

const counterBasketSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        setCounterBasketElems(state,action:PayloadAction<number>){
            state.basketCounter=action.payload;
        },
    }
});

export default counterBasketSlice.reducer;
export const {setCounterBasketElems} = counterBasketSlice.actions;