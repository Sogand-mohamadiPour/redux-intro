import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullName: '',
    nationalID: '',
    createdAT: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return {
                    payload: {
                        fullName,
                        nationalID,
                        createdAT: new Date().toISOString(),
                    },
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createdAT = action.payload.createdAT;
            },
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;