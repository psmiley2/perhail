const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");
const User = require("../models/User");

// SECTION - CREATE EVENTS
// Add a new event
router.post("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let errors = [];

    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    let { title } = req.body;
    let event = {
        _id: new ObjectID(),
        title,
    };

    await User.findByIdAndUpdate(userid, {
        $push: {
            events: event,
        },
    })
        .then((user) => {
            if (!user) {
                errors.push("no user found for given user id");
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(201).send(event);
    }
});
// !SECTION

// SECTION - FETCH ALL EVENTS
// Fetch all events
router.get("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let errors = [];
    let events = [];

    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findById(userid)
        .then((user) => {
            if (user) {
                events = user.events;
            } else {
                errors.push("no user found for given user id");
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(200).send(events);
    }
});
// !SECTION

// SECTION - FETCH EVENT
// Fetch an event
router.get("/:userid/:eventid", async (req, res) => {
    let { userid, eventid } = req.params;
    let errors = [];
    let event = null;

    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }
    if (eventid == undefined || eventid.length != 24) {
        errors.push("a valid preferenceid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findById(userid)
        .then((user) => {
            if (user) {
                // User found
                for (e of user.events) {
                    if (e._id == eventid) {
                        // Event found
                        event = e;
                        break;
                    }
                }
                if (event == null) {
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
        res.status(200).send(event);
    }
});
// !SECTION
// TODO - DELETE EVENT
// TODO - UPDATE EVENT

const validID = (id) => {
    if (id == undefined || id.length != 24) {
        return false;
    }
    return true;
    // More validation
};

module.exports = router;
