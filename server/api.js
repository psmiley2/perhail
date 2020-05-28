/* -------------------------------------------------------------------------- */
/*                                    SetUp                                   */
/* -------------------------------------------------------------------------- */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;
let ObjectID = require("mongodb").ObjectID;
let app = express();
const DB = require(path.join(__dirname, "modules", "database.js"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/* -------------------------------------------------------------------------- */
/*                                  Endpoints                                 */
/* -------------------------------------------------------------------------- */
app.get("/", (req, res) => {
    res.status(200).send("server is running!");
});

/* ----------------------------- User Endpoints ----------------------------- */
// SECTION - USERS

// SECTION - CREATE USER
// Create a new user
app.post("/users", async (req, res) => {
    // TODO - Validation
    let userInfo = {
        email: req.body.email,
        hash: "",
    };
    let code = 400;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    userInfo.hash = hash;

    let user = {
        userinfo: userInfo,
        tasklists: [],
        preferences: [],
        tracks: [],
        goals: [],
        eventlists: [],
    };

    await DB.insertUser(user)
        .then((res) => {
            if (res == 1) {
                code = 201;
            } else {
                code == 500;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(user);
    } else {
        res.status(code).send(
            "Unexpected error occured. Check Database connection"
        );
    }
});
// !SECTION

// SECTION - FETCH USER
// Fetch an existing user
app.get("/users/:userid", async (req, res) => {
    let user;
    let code = 400;
    let userid = req.params.userid;

    if (userid.length != 24) {
        res.status(code).send("invalid user id");
        return;
    }

    userid = new ObjectID(userid);

    await DB.fetchUser(userid)
        .then((res) => {
            user = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 500;
        });

    res.status(code).send(user);
});
// !SECTION

// TODO - Update Email
// TODO - Reset / Recover Password
// TODO - Legitimate authentication

// !SECTION

/* ----------------------------- Task Endpoints ----------------------------- */
// SECTION - TASKS

// SECTION - CREATE TASK LIST
// Create a new list of tasks
app.post("/tasks/list/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    if (userid == undefined || userid.length != 24) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);
    let list = {
        _id: new ObjectID(),
        title: req.body.title,
        tasks: [],
    };

    await DB.insertTaskList(userid, list)
        .then((res) => {
            if (res >= 1) {
                code = 201;
            } else {
                code = 400;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(list);
    } else if (code == 400) {
        res.status(code).send(
            "could not find a match in the database based on passed in ID"
        );
    } else {
        res.status(500).send("unexpected error");
    }
});
// !SECTION

// SECTION - FETCH TASK LIST
// Fetch a tasklist
app.get("/tasks/list/:userid/:listid", async (req, res) => {
    let user;
    let code = 200;
    let userid = req.params.userid;
    let listid = req.params.listid;

    if (userid == undefined || userid.length != 24) {
        res.status(400).send("invalid user id");
        return;
    }
    if (listid == undefined || listid.length != 24) {
        res.status(400).send("invalid task id");
        return;
    }

    userid = new ObjectID(userid);

    await DB.fetchTaskList(userid, listid)
        .then((res) => {
            user = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(user);
    } else {
        res.status(code).send(
            "Could not find a match to given IDs in the DB. Or else check databse connection"
        );
    }
});
// !SECTION

// SECTION - CREATE TASK
// Create a new task
app.post("/tasks/:userid/:listid", async (req, res) => {
    let userid = req.params.userid;
    let listid = req.params.listid;
    let code = 400;
    if (userid == undefined || userid.length != 24) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    if (listid == undefined || listid.length != 24) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);
    listid = new ObjectID(listid);
    let task = {
        _id: new ObjectID(),
        title: req.body.title,
        createdOn: new Date(),
        completed: false,
    };

    await DB.insertTask(userid, listid, task)
        .then((res) => {
            if (res >= 1) {
                code = 201;
            } else {
                code = 400;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(task);
    } else if (code == 400) {
        res.status(code).send(
            "could not find a match in the database based on passed in IDs"
        );
    } else {
        res.status(500).send("unexpected error");
    }
});
// !SECTION

// TODO - Delete a tasklist
// TODO - Update a tasklist's title
// TODO - Fetch a task
// TODO - Delete a task
// TODO - Update a task

// !SECTION

/* ----------------------------- Goals Endpoint ----------------------------- */
// SECTION - GOALS

// SECTION - CREATE GOAL
// Create a new goal
app.post("/goals/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);
    let goal = {
        _id: new ObjectID(),
        title: req.body.title,
        priority: req.body.priority,
        createdOn: new Date(),
        // TODO - Add fields (Sub goals, Progress, time since start, smart goals ect.)
    };

    await DB.insertGoal(userid, goal)
        .then((res) => {
            if (res >= 1) {
                code = 201;
            } else {
                code = 400;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(goal);
    } else if (code == 400) {
        res.status(code).send(
            "could not find a match in the database based on passed in ID"
        );
    } else {
        res.status(500).send("unexpected error");
    }
});
// !SECTION

// SECTION - FETCH GOAL
// Fetch a goal
app.get("/goals/:userid/:goalid", async (req, res) => {
    let userid = req.params.userid;
    let goalid = req.params.goalid;
    let code = 400;
    let goal = {};
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    if (!validID(goalid)) {
        res.status(code).send("a valid goalid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchGoal(userid, goalid)
        .then((res) => {
            goal = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(goal);
    } else {
        res.status(code).send(
            "Could not find a match to given IDs in the DB. Or else check databse connection"
        );
    }
});
// !SECTION
// TODO - DELETE GOAL
// TODO - UPDATE GOAL
// TODO - FETCH GOAL
// !SECTION

/* ----------------------------- Tracks Endpoint ----------------------------- */
// SECTION - TRACKS
// TODO - CREATE TRACKS LIST
// TODO - ADD TRACKS
// TODO - DELETE TRACKS
// TODO - UPDATE TRACKS
// TODO - DELETE TRACKS LIST
// TODO - FETCH TRACKS LIST
// !SECTION

/* -------------------------- Preferences Endpoint -------------------------- */
// SECTION - PREFERENCES
// TODO - CREATE PREFERENCES LIST
// TODO - ADD PREFERENCE
// TODO - DELETE PREFERENCE
// TODO - UPDATE PREFERENCE
// TODO - DELETE PREFERENCES LIST
// TODO - FETCH PREFERENCES LIST
// !SECTION

/* ----------------------------- Events Endpoint ---------------------------- */
// SECTION - EVENTS
// TODO - CREATE EVENTS LIST
// TODO - ADD EVENTS
// TODO - DELETE EVENTS
// TODO - UPDATE EVENTS
// TODO - DELETE EVENTS LIST
// TODO - FETCH EVENTS LIST
// !SECTION

/* -------------------------------------------------------------------------- */
/*                                Server Start                                */
/* -------------------------------------------------------------------------- */
DB.establishConnection()
    .then(() => {
        app.listen(process.env.PORT);
        console.log("listening...");
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

module.exports = app;

/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
validID = (id) => {
    if (id == undefined || id.length != 24) {
        return false;
    }
    return true;
    // More validation
};
