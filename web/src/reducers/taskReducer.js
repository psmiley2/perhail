import {
    CREATE_TASK, FETCH_TASKS
} from "../actions/types";

let initialState = {
    tasks: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload,]
            };
        case FETCH_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};
