import {
    CREATE_TASK_LIST,
    FETCH_TASK_LIST,
    FETCH_TASK_LISTS,
    UPDATE_CURRENT_TASK_LIST,
} from "../actions/types";

let initialState = {
    lists: [],
    currentList: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASK_LISTS:
            return { ...state, lists: action.payload };
        case FETCH_TASK_LIST:
            return { ...state, currentList: action.payload };
        case CREATE_TASK_LIST:
            return {
                ...state,
                taskLists: [...state.lists, action.payload],
            };
        case UPDATE_CURRENT_TASK_LIST:
            return {
                ...state,
                currentList: action.payload,
            };
        default:
            return state;
    }
};
