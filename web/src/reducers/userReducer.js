import { LOGIN, REGISTER } from "../actions/types";

let initialState = {
    id: null,
    email: null,
    currentlyViewing: null,
};

export default (state = initialState, action) => {
    let newState;
    console.log(action.payload);
    switch (action.type) {
        case LOGIN:
            newState = { ...state };
            newState.id = action.payload._id;
            newState.email = action.payload.userInfo.email;
            return newState;
        case REGISTER:
            newState = { ...state };
            newState.id = action.payload._id;
            newState.email = action.payload.userInfo.email;
            return newState;
        default:
            return state;
    }
};
