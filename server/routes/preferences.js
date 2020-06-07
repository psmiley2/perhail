const express = require("express");
const router = express.Router();
const { ObjectID } = require("mongodb");

const User = require("../models/User");

// SECTION - CREATE PREFERENCE
// Add a new preference
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

    let newPreference = {
        _id: new ObjectID(),
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
    let preferences = [];
    let errors = [];

    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findById(userid).then((user) => {
        if (user) {
            preferences = user.preferences;
        } else {
            errors.push(
                "could not find a user in the database with the given user id"
            );
        }
    });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    res.status(200).send(preferences);
});
// !SECTION

// SECTION - FETCH PREFERENCE
// Fetch a preference
router.get("/:userid/:preferenceid", async (req, res) => {
    let { userid, preferenceid } = req.params;
    let errors = [];
    let preference = null;

    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (preferenceid == undefined || preferenceid.length != 24) {
        errors.push("a valid preferenceid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findById(userid).then((user) => {
        if (user) {
            // User found
            for (p of user.preferences) {
                if (p._id == preferenceid) {
                    // Preference found
                    preference = p;
                    break;
                }
            }
            if (preference == null) {
                errors.push(
                    "could not find a preference in the database for the given preference id for this user"
                );
            }
        } else {
            errors.push(
                "could not find a user in the database with the given user id"
            );
        }
    });

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(200).send(preference);
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
