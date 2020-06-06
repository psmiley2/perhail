const express = require("express");
const router = express.Router();
const path = require("path");

const { TaskList } = require("../models/Task");
const User = require("../models/User");

// SECTION - CREATE TASK LIST
// Create a new list of tasks
router.post("/list/:userid", async (req, res) => {
    let userid = req.params.userid;
    if (userid == undefined || userid.length != 24) {
        res.status(400).send("a valid userid must be set as a url parameter");
        return;
    }

    let errors = [];
    let newList = new TaskList({
        title: req.body.title,
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
    res.status(201);
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
    let user;
    let { userid, listid } = req.params;
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

    let targetList = null;

    // Query DB
    await User.findById(userid)
        .then((res) => {
            if (res) {
                // User is found
                for (list of res.taskLists) {
                    if (list._id == listid) {
                        // List is found
                        targetList = list;
                    }
                }
                if (targetList == null) {
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
    res.status(200).send(targetList);
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
        title: req.body.title,
        completed: false,
    };

    let action = {
        $push: { "taskLists.$[list].tasks": task },
    };
    let filter = {
        arrayFilters: [{ "list._id": listid }],
    };

    let newTask = null;
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
    res.status(201).send(newTask);
});
// !SECTION

// TODO - Delete a tasklist
// TODO - Update a tasklist's title
// TODO - Fetch a task
// TODO - Fetch all task lists
// TODO - Delete a task
// TODO - Update a task

module.exports = router;
