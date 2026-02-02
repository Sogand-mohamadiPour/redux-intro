import { createSlice } from '@reduxjs/toolkit';

const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAT: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialStateCustomer,
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
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    },
});

export const { createCustomer, updateName } = customerSlice.actions;

export function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAT: action.payload.createdAT,
            };
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload,
            };
        default:
            return state;
    }
};

export default customerSlice.reducer;