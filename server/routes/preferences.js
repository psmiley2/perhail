const express = require("express");
const router = express.Router();
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));
const User = require("../models/User");

// SECTION - CREATE PREFERENCES
// Add a new preference
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

    let newPreference = {
        title: req.body.title,
    };

    await User.findByIdAndUpdate(userid, {
        $push: { preferences: newPreference },
    })
        .then((res) => {
            if (!res) {
                errors.push(
                    "could not find a user in the database with the given user id"
                );
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // No errros
    res.status(201).send(newPreference);
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
const validID = (id) => {
    if (id == undefined || id.length != 24) {
        return false;
    }
    return true;
    // More validation
};

module.exports = router;
