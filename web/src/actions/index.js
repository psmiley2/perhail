import axios from "axios";
import history from "../history";
import {
    CREATE_TASK_LIST,
    FETCH_TASK_LIST,
    FETCH_TASK_LISTS,
    UPDATE_CURRENT_TASK_LIST,
} from "./types";

export const fetchTaskLists = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/tasks/list/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_TASK_LISTS, payload: response.data });
};

export const fetchTaskList = (userid, listid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/tasks/list/${userid}/${listid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_TASK_LIST, payload: response.data });
};

export const updateCurrentTaskList = (taskListID) => (dispatch) => {
    dispatch({ type: UPDATE_CURRENT_TASK_LIST, payload: taskListID });
};

export const createTaskList = (userid, userInfo) => async (dispatch) => {
    let response;
    await axios
        .post(`http://localhost:8080/tasks/list/${userid}`, userInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_TASK_LIST, payload: response.data });
    history.push("/");
};
