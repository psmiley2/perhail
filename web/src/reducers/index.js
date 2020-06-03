import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
export default combineReducers({
    user: userReducer,
    form: formReducer,
    task: taskReducer,
});
