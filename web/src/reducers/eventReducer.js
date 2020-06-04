import { CREATE_EVENT, FETCH_ALL_EVENTS } from "../actions/types";

let initialState = {
    all: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EVENT:
            return {
                ...state,
                all: [...state.all, action.payload],
            };
        case FETCH_ALL_EVENTS:
            return {
                ...state,
                all: action.payload,
            };
        default:
            return state;
    }
};
