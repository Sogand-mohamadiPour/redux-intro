import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    nsme: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
        }

    }
})

