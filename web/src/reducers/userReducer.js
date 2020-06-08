import { LOGIN, LOGOUT, REGISTER, SET_SESSION } from "../actions/types";

let initialState = {
    id: null,
    email: null,
    currentlyViewing: null,
};

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOGIN:
            newState = { ...state };
            newState.id = action.payload._id;
            newState.email = action.payload.userInfo.email;
            return newState;
        case LOGOUT:
            return { id: null, email: null, currentlyViewing: null };
        case REGISTER:
            newState = { ...state };
            newState.id = action.payload._id;
            newState.email = action.payload.userInfo.email;
            return newState;
        case SET_SESSION:
            newState = { ...state };
            newState.id = action.payload;
            return newState;
        default:
            return state;
    }
};
