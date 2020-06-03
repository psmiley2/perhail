import { LOGIN } from "../actions/types";

let initialState = {
    id: null,
    email: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            let newState = { ...state };
            newState.id = action.payload._id;
            newState.email = action.payload.userinfo.email;
            return newState;
        default:
            return state;
    }
};
