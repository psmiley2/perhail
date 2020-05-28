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

/* ----------------------------- Task Endpoints ----------------------------- */
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

// Fetch a tasklist
app.get("/tasks/list/:userid/:tasklistid", async (req, res) => {
    let user;
    let code = 200;
    let userid = req.params.userid;
    let tasklistid = req.params.tasklistid;

    if (userid == undefined || userid.length != 24) {
        res.status(400).send("invalid user id");
        return;
    }
    if (tasklistid == undefined || tasklistid.length != 24) {
        res.status(400).send("invalid task id");
        return;
    }

    userid = new ObjectID(userid);

    await DB.fetchTaskList(userid, tasklistid)
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
