import {
    CREATE_GOAL,
    FETCH_GOAL_LIST,
    UPDATE_CURRENT_GOAL,
} from "../actions/types";

let initialState = {
    list: [],
    currentGoal: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GOAL:
            return {
                ...state,
                currentGoal: action.payload,
            };
        case FETCH_GOAL_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case UPDATE_CURRENT_GOAL:
            return {
                ...state,
                currentGoal: action.payload,
            };
        default:
            return state;
    }
};
