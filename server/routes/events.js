const express = require("express");
const router = express.Router();
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));
// SECTION - CREATE EVENTS
// Add a new event
router.post("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);
    let event = {
        _id: new ObjectID(),
        title: req.body.title,
        // TODO - Other fields such as start time, end time, category, ect.
    };

    await DB.insertEvent(userid, event)
        .then((res) => {
            if (res >= 1) {
                code = 201;
            } else {
                code = 400;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(event);
    } else if (code == 400) {
        res.status(code).send(
            "could not find a match in the database based on passed in ID"
        );
    } else {
        res.status(500).send("unexpected error");
    }
});
// !SECTION

// SECTION - FETCH ALL EVENTS
// Fetch all events
router.get("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    let events = [];
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchAllEvents(userid)
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
});
// !SECTION

// SECTION - FETCH EVENT
// Fetch an event
router.get("/:userid/:eventid", async (req, res) => {
    let userid = req.params.userid;
    let eventid = req.params.eventid;
    let code = 400;
    let event = {};
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    if (!validID(eventid)) {
        res.status(code).send(
            "a valid preferenceid must be set as a url parameter"
        );
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchEvent(userid, eventid)
        .then((res) => {
            event = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(event);
    } else {
        res.status(code).send(
            "Could not find a match to given IDs in the DB. Or else check databse connection"
        );
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
