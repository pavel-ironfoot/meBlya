import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyState {
    companys: string[];
    prices: string[];
}
const initialState:CompanyState= {
    companys:[],
    prices:[],
}

const companySlice = createSlice({
    name:'companys',
    initialState,
    reducers:{
        companysTitles(state,action:PayloadAction<string[]>){
            state.companys=action.payload;
        },
        pricesRangeSet(state,action:PayloadAction<string[]>){
            state.prices=action.payload;
        },
    }
});

export default companySlice.reducer;
export const {companysTitles,pricesRangeSet} = companySlice.actions;