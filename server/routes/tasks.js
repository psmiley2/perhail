const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");

const path = require("path");

const { TaskList } = require("../models/Task");
const User = require("../models/User");

// SECTION - CREATE TASK LIST
// Create a new list of tasks
router.post("/list/:userid", async (req, res) => {
    let userid = req.params.userid;
    let errors = [];
    if (userid == undefined || userid.length != 24) {
        res.status(400).send("a valid userid must be set as a url parameter");
        return;
    }

    let newList = new TaskList({
        _id: new ObjectID(),
        title: req.body.title,
        completed: false,
        created: new Date(),
    });

    // Update DB
    await User.findByIdAndUpdate(userid, {
        $push: { taskLists: newList },
    })
        .then((res) => {
            if (!res) {
                errors.push("Could not find a user with the given userid");
            }
        })
        .catch((err) => {
            console.log("error: ", err);
        });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // No errors
    res.status(201).send(newList);
});
// !SECTION

// SECTION - FETCH ALL TASK LISTS
// Fetch all task lists
router.get("/list/:userid", async (req, res) => {
    let userid = req.params.userid;
    let errors = [];
    let lists = [];
    if (userid == undefined || userid.length != 24) {
        res.status(400).send("a valid userid must be set as a url parameter");
        return;
    }

    // Query DB
    await User.findById(userid)
        .then((res) => {
            if (res) {
                lists = res.taskLists;
            } else {
                errors.push("Could not find a user with the given userid");
            }
        })
        .catch((err) => {
            console.log("error: ", err);
        });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // No errors
    res.status(200).send(lists);
    // TODO - Needs Testing
});
// !SECTION

// SECTION - FETCH TASK LIST
// Fetch a tasklist
router.get("/list/:userid/:listid", async (req, res) => {
    let { userid, listid } = req.params;
    let list = null;
    let errors = [];

    if (userid == undefined || userid.length != 24) {
        errors.push("invalid userid");
    }
    if (listid == undefined || listid.length != 24) {
        errors.push("invalid task id");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // Query DB
    await User.findById(userid)
        .then((res) => {
            if (res) {
                // User is found
                for (l of res.taskLists) {
                    if (l._id == listid) {
                        // List is found
                        list = l;
                        break;
                    }
                }
                if (list == null) {
                    errors.push(
                        "no list was found for the given list id for this user"
                    );
                }
            } else {
                errors.push("no user was found with the given userid");
            }
        })
        .catch((err) => {
            console.error(err);
        });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // Else
    res.status(200).send(list);
});
// !SECTION

// SECTION - CREATE TASK
// Create a new task
router.post("/:userid/:listid", async (req, res) => {
    let { userid, listid } = req.params;
    let errors = [];
    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (listid == undefined || listid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    let task = {
        _id: new ObjectID(),
        title: req.body.title,
        completed: false,
        created: new Date(),
    };

    let action = {
        $push: { "taskLists.$[list].tasks": task },
    };
    let filter = {
        arrayFilters: [{ "list._id": listid }],
    };

    await User.findByIdAndUpdate(userid, action, filter)
        .then((res) => {
            if (!res) {
                errors.push("no user was found with the given userid");
            }
        })
        .catch((err) => {
            console.error(err);
        });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // No errors
    res.status(201).send(task);
});
// !SECTION

// TODO - Delete a tasklist
// TODO - Update a tasklist's title
// TODO - Fetch a task
// TODO - Fetch all task lists
// TODO - Delete a task
// TODO - Update a task

module.exports = router;
