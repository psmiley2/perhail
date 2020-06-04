const express = require("express");
const router = express.Router();
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));

// SECTION - CREATE TASK LIST
// Create a new list of tasks
router.post("/list/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    if (userid == undefined || userid.length != 24) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }

    userid = new ObjectID(userid);
    let list = {
        _id: new ObjectID(),
        title: req.body.title, // TODO - if no title is given make it ""
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

// SECTION - FETCH ALL TASK LISTS
// Fetch all task lists
router.get("/list/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    let events = [];
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchAllTaskLists(userid)
        .then((res) => {
            events = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(events);
    } else {
        res.status(code).send(
            "Could not find a match to given userid in the DB. Or else check databse connection"
        );
    }
}); // TODO - Needs Testing

// !SECTION

// SECTION - FETCH TASK LIST
// Fetch a tasklist
router.get("/list/:userid/:listid", async (req, res) => {
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
router.post("/:userid/:listid", async (req, res) => {
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
        title: req.body.title, // TODO - if no title is given make it ""
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
// TODO - Fetch all task lists
// TODO - Delete a task
// TODO - Update a task

module.exports = router;
