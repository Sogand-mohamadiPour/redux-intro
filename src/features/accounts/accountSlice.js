import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose
                    }
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loanPurpose = '';
            state.loan = 0;
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === 'USD') return { type: 'account/deposit', payload: amount };

    return async function (dispatch, getState) {
        dispatch({ type: 'account/convertingCurrency' });
        // API call 
        const res = await fetch(`https://api.frankfurter.app/latest?base=${currency}&symbols=USD`);
        if (!res.ok) {
            throw new Error('Failed to fetch exchange rate');
        }
        const data = await res.json();
        // Convert the amount using the exchange rate
        const converted = amount * data.rates.USD;
        // return action
        dispatch({ type: 'account/deposit', payload: converted });
    };
};

export default accountSlice.reducer;

