const express = require("express");
const router = express.Router();
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));

// SECTION - CREATE PREFERENCES
// Add a new preference
router.post("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);
    let preference = {
        _id: new ObjectID(),
        title: req.body.title, // TODO - if no title is given make it ""
    };

    await DB.insertPreference(userid, preference)
        .then((res) => {
            if (res >= 1) {
                code = 201;
            } else {
                code = 400;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(preference);
    } else if (code == 400) {
        res.status(code).send(
            "could not find a match in the database based on passed in ID"
        );
    } else {
        res.status(500).send("unexpected error");
    }
});
// !SECTION

// SECTION - FETCH ALL PREFERENCES
// Fetch all preferences
router.get("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let code = 400;
    let preferences = [];
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchAllPreferences(userid)
        .then((res) => {
            preferences = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(preferences);
    } else {
        res.status(code).send(
            "Could not find a match to given IDs in the DB. Or else check databse connection"
        );
    }
});
// !SECTION

// SECTION - FETCH PREFERENCE
// Fetch a preference
router.get("/:userid/:preferenceid", async (req, res) => {
    let userid = req.params.userid;
    let preferenceid = req.params.preferenceid;
    let code = 400;
    let preference = {};
    if (!validID(userid)) {
        res.status(code).send("a valid userid must be set as a url parameter");
        return;
    }
    if (!validID(preferenceid)) {
        res.status(code).send(
            "a valid preferenceid must be set as a url parameter"
        );
        return;
    }
    userid = new ObjectID(userid);

    await DB.fetchPreference(userid, preferenceid)
        .then((res) => {
            preference = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 400;
        });

    if (code == 200) {
        res.status(code).send(preference);
    } else {
        res.status(code).send(
            "Could not find a match to given IDs in the DB. Or else check databse connection"
        );
    }
});
// !SECTION
// TODO - DELETE PREFERENCE
// TODO - UPDATE PREFERENCE

module.exports = router;
