import { CREATE_HABIT, FETCH_HABITS } from "../actions/types";

let initialState = {
    habits: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CREATE_HABIT:
            return {
                ...state,
                habits: [...state.habits, action.payload],
            };
        case FETCH_HABITS:
            return {
                ...state,
                habits: action.payload,
            };
        default:
            return state;
    }
}
