const express = require("express");
const router = express.Router();
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));

// SECTION - CREATE GOAL
// Create a new goal
router.post("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);
    let goal = {
        _id: new ObjectID(),
        title: req.body.title, // TODO - if no title is given make it ""
        priority: req.body.priority, // TODO - Set a default priority if none is given
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

// SECTION - FETCH ALL GOALS
// Fetch all goals
router.get("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    let goals = [];
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchAllGoals(userid)
        .then((res) => {
            goals = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(goals);
    } else {
        res.status(code).send(
            "Could not find a match to given userid in the DB. Or else check databse connection"
        );
    }
});
// !SECTION

// SECTION - FETCH ALL GOALS
// Fetch all goals
router.get("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    let goals = [];
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchAllGoals(userid)
        .then((res) => {
            goals = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(goals);
    } else {
        res.status(code).send(
            "Could not find a match to given userid in the DB. Or else check databse connection"
        );
    }
});
// !SECTION

// SECTION - FETCH GOAL
// Fetch a goal
router.get("/:userid/:goalid", async (req, res) => {
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

module.exports = router;
