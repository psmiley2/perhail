import axios from "axios";
import {
    CREATE_EVENT,
    CREATE_GOAL,
    CREATE_TASK,
    CREATE_TASK_LIST,
    FETCH_ALL_EVENTS,
    FETCH_GOAL_LIST,
    FETCH_TASK_LIST,
    FETCH_TASK_LISTS,
    LOGIN,
    LOGOUT,
    REGISTER,
    SET_SESSION,
    UPDATE_CURRENT_GOAL,
    UPDATE_CURRENT_TASK_LIST,
} from "./types";

// SECTION - Users
export const login = (email, password) => async (dispatch) => {
    let body = {
        email: email,
        password: password,
    };
    let response;
    await axios
        .post("http://localhost:8080/users/login", body, {
            withCredentials: true,
        })
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: LOGIN, payload: response.data });
};

export const logout = () => async (dispatch) => {
    await axios
        .post("http://localhost:8080/users/logout", {
            withCredentials: true,
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: LOGOUT });
};

export const register = (email, password) => async (dispatch) => {
    let body = {
        email: email,
        password: password,
    };
    let response;
    await axios
        .post("http://localhost:8080/users/register", body)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: REGISTER, payload: response.data });
};

export const setSession = () => async (dispatch) => {
    let response;
    await axios
        .get("http://localhost:8080/users/session", { withCredentials: true })
        .then((res) => {
            console.log("session res: ", res);
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: SET_SESSION, payload: response.data });
};

// SECTION - Task Lists
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

export const updateCurrentTaskList = (taskList) => (dispatch) => {
    dispatch({ type: UPDATE_CURRENT_TASK_LIST, payload: taskList });
};

export const createTaskList = (userid, listInfo) => async (dispatch) => {
    let response;
    await axios
        .post(`http://localhost:8080/tasks/list/${userid}`, listInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_TASK_LIST, payload: response.data });
};

// SECTION - Tasks
export const createTask = (userid, taskListID, taskInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(`http://localhost:8080/tasks/${userid}/${taskListID}`, taskInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_TASK, payload: response.data });
};

// SECTION - Goals
export const createGoal = (userid, goalInfo) => async (dispatch) => {
    let response;
    await axios
        .post(`http://localhost:8080/goals/${userid}`, goalInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_GOAL, payload: response.data });
};

export const fetchGoalList = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/goals/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_GOAL_LIST, payload: response.data });
};

export const updateCurrentGoal = (goal) => (dispatch) => {
    dispatch({ type: UPDATE_CURRENT_GOAL, payload: goal });
};

// SECTION - Events
export const createEvent = (userid, eventInfo) => async (dispatch) => {
    let response;
    await axios
        .post(`http://localhost:8080/events/${userid}`, eventInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_EVENT, payload: response.data });
};

export const fetchAllEvents = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/events/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_ALL_EVENTS, payload: response.data });
};
