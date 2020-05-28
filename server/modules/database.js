var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let DB = undefined;
let usersCol = undefined;

/* -------------------------------------------------------------------------- */
/*                                   Set Up                                   */
/* -------------------------------------------------------------------------- */
exports.establishConnection = () => {
    if (!process.env.MONGODB_URI) {
        console.error("No MongoDB URI set. Exiting...");
        process.exit(1);
    }
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            process.env.MONGODB_URI,
            { useUnifiedTopology: true, useNewUrlParser: true },
            (err, client) => {
                if (!err) {
                    DB = client.db("Perhail");
                    usersCol = DB.collection("users");
                    resolve();
                } else {
                    reject(err);
                }
            }
        );
    });
};

/* -------------------------------------------------------------------------- */
/*                                  API Pairs                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Users --------------------------------- */
// SECTION - USERS
// Puts a user in the DB
exports.insertUser = (user) => {
    return new Promise((resolve, reject) => {
        usersCol.insertOne(user, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.insertedCount);
            }
        });
    });
};

// Fetches a user from the DB
exports.fetchUser = (userid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

/* ---------------------------------- Tasks --------------------------------- */
// SECTION - TASKS
// Adds a new task list for the user with the given id
exports.insertTaskList = (userid, taskList) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { tasklists: taskList },
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Fetches a tasklist from the DB
exports.fetchTaskList = (userid, listid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                for (list of res.tasklists) {
                    if (list._id == listid) {
                        resolve(list);
                    }
                }
                reject("No task lists match with that id for the given user");
            }
        });
    });
};

exports.insertTask = (userid, listid, task) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { "tasklists.$[list].tasks": task },
    };
    let filter = {
        arrayFilters: [{ "list._id": listid }],
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action, filter)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/* ---------------------------------- Goals --------------------------------- */
// SECTION - GOALS
// Adds a new goal for the user with the given id
exports.insertGoal = (userid, goal) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { goals: goal },
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Fetches all goals for the user based on the user id
exports.fetchAllGoals = (userid, goalid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                resolve(res.goals);
            }
        });
    });
};

// Fetches a goal for the user based on the user id and the goal id
exports.fetchGoal = (userid, goalid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                for (goal of res.goals) {
                    if (goal._id == goalid) {
                        resolve(goal);
                    }
                }
                reject("No goals match with that id for the given user");
            }
        });
    });
};

/* ------------------------------- Preferences ------------------------------ */
// SECTION - PREFERENCES
// Adds a new preference for the user with the given id
exports.insertPreference = (userid, preference) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { preferences: preference },
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Fetches all goals for the user based on the user id
exports.fetchAllPreferences = (userid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                resolve(res.preferences);
            }
        });
    });
};

// Fetches a preference for the user based on the user id and the preference id
exports.fetchPreference = (userid, preferenceid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                for (preference of res.preferences) {
                    if (preference._id == preferenceid) {
                        resolve(preference);
                    }
                }
                reject("No goals match with that id for the given user");
            }
        });
    });
};

/* --------------------------------- Events --------------------------------- */
// SECTION - EVENT
// Adds a new event for the user with the given id
exports.insertEvent = (userid, event) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { events: event },
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// Fetches all events for the user based on the user id
exports.fetchAllEvents = (userid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                resolve(res.events);
            }
        });
    });
};

// Fetches an event for the user based on the user id and the event id
exports.fetchEvent = (userid, eventid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (res == null) {
                    reject("No user matches with the passed in id");
                    return;
                }
                for (event of res.events) {
                    if (event._id == eventid) {
                        resolve(event);
                    }
                }
                reject("No goals match with that id for the given user");
            }
        });
    });
};
