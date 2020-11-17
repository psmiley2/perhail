import axios from "axios";
import {
    CREATE_EVENT,
    CREATE_GOAL,
    CREATE_HABIT,
    CREATE_TASK,
    CREATE_TASK_LIST,
    FETCH_ALL_EVENTS,
    FETCH_GOAL_LIST,










    FETCH_HABITS, FETCH_TASKS,









    FETCH_TASK_LIST,

    LOGIN,
    LOGOUT,
    REGISTER,
    SET_SESSION,
    UPDATE_CURRENT_GOAL,
    UPDATE_CURRENT_TASK_LIST,
    UPDATE_TASK
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
    let response = {};
    await axios
        .get("http://localhost:8080/users/session", { withCredentials: true })
        .then((res) => {
            if (res.status == 400) {
                response = "";
            } else {
                response = res;
            }
        })
        .catch((err) => {
            if (err == "Request failed with status code 400") {
                response.data = null;
            } else {
                console.error(err);
            }
        });

    dispatch({ type: SET_SESSION, payload: response.data });
};

// SECTION - NEW
export const createHabit = (userid, habitInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(`http://localhost:8080/habits/${userid}`, habitInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_HABIT, payload: response.data });
};

export const fetchHabits = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/habits/${userid}`)
        .then((res) => {
            console.log("RESPONSE: ", res)
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_HABITS, payload: response.data });
};


export const fetchTasks = (userid) => async (dispatch) => {
    let response;
    await axios
        .get(`http://localhost:8080/tasks/${userid}`)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: FETCH_TASKS, payload: response.data });
};

// SECTION - Tasks
export const createTask = (userid, taskInfo) => async (
    dispatch
) => {
    let response;
    await axios
        .post(`http://localhost:8080/tasks/${userid}`, taskInfo)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: CREATE_TASK, payload: response.data });
};


// SECTION - OLD
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


export const updateTask = (userID, taskListID, taskID, taskInfo) => async (
    dispatch
) => {
    let response;
    console.log("info", taskInfo);
    await axios
        .post(
            `http://localhost:8080/tasks/${userID}/${taskListID}/${taskID}`,
            taskInfo
        )
        .then((res) => {
            console.log("res", res);
            response = res;
        })
        .catch((err) => {
            console.error(err);
        });

    dispatch({ type: UPDATE_TASK, payload: response.data });
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
