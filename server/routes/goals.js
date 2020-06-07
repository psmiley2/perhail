const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");

const User = require("../models/User");

// SECTION - CREATE GOAL
// Create a new goal
router.post("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let errors = [];

    if (!validID(userid)) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    let { title, priority } = req.body;
    let goal = {
        _id: new ObjectID(),
        title,
        priority,
        created: new Date(),
    };

    await User.findByIdAndUpdate(userid, {
        $push: {
            goals: goal,
        },
    })
        .then((user) => {
            if (!user) {
                errors.push("no user was found for the given user id");
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(201).send(goal);
    }
});
// !SECTION

// SECTION - FETCH ALL GOALS
// Fetch all goals
router.get("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let goals = [];
    let errors = [];

    if (!validID(userid)) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findById(userid)
        .then((user) => {
            if (user) {
                goals = user.goals;
            } else {
                errors.push("no user found for given user id");
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(200).send(goals);
    }
});
// !SECTION

// SECTION - FETCH GOAL
// Fetch a goal
router.get("/:userid/:goalid", async (req, res) => {
    let { userid, goalid } = req.params;
    let goal = null;
    let errors = [];
    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }
    if (goalid == undefined || goalid.length != 24) {
        errors.push("a valid goalid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findById(userid)
        .then((user) => {
            if (user) {
                // User found
                for (g of user.goals) {
                    if (g._id == goalid) {
                        // Goal found
                        goal = g;
                        break;
                    }
                }
                if (goal == null) {
                    errors.push(
                        "no goal with the given goalid was found for this user"
                    );
                }
            } else {
                errors.push("no user found for given user id");
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(200).send(goal);
    }
});
// !SECTION
// TODO - DELETE GOAL
// TODO - UPDATE GOAL
const validID = (id) => {
    if (id == undefined || id.length != 24) {
        return false;
    }
    return true;
    // More validation
};

module.exports = router;
