import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import eventReducer from "./eventReducer";
import goalReducer from "./goalReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
export default combineReducers({
    form: formReducer,
    user: userReducer,
    task: taskReducer,
    goal: goalReducer,
    event: eventReducer,
});
