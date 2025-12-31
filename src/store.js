import { combineReducers, createStore } from 'redux';



const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAT: '',
};



function customerReducer(state = initialStateCustomer, action) {
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

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

// ////////////////////////////////////////////
function createCustomer(fullName, nationalID) {
    return {
        type: 'customer/createCustomer',
        payload: { fullName, nationalID, createdAT: new Date().toISOString() },
    }
};

function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName,
    }
};