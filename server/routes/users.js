const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const { ObjectID } = require("mongodb");
const saltRounds = 12;

// Load User model
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// SECTION - FETCH USER
// Fetch an existing user
router.get("/find/:userid", async (req, res) => {
    let user;
    let userid = req.params.userid;
    let errors = [];

    if (userid == undefined || userid.length != 24) {
        res.status(400).send("a valid userid must be set as a url parameter");
        return;
    }

    await User.findById(userid)
        .then((res) => {
            if (res) {
                // User was found
                user = res;
            } else {
                errors.push("no user found for the given id");
            }
        })
        .catch((err) => {
            console.error(err);
        });
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    res.status(200).send(user);
});
// !SECTION

// SECTION - RESGISTER USER
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    if (!email || !password) {
        errors.push("Please enter all fields");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findOne({ "userInfo.email": email })
        .then((user) => {
            if (user) {
                errors.push({ msg: "Email already exists" });
            }
        })
        .catch((err) => {
            console.error(err);
        });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    let hashedPassword = "";
    let newUser;
    let salt;

    await bcrypt
        .genSalt(saltRounds)
        .then((s) => {
            salt = s;
        })
        .catch((err) => console.error(err));

    await bcrypt
        .hash(password, salt)
        .then((hash) => {
            hashedPassword = hash;
        })
        .catch((err) => console.error(err));

    newUser = new User({
        _id: new ObjectID(),
        userInfo: {
            email,
            password: hashedPassword,
        },
        taskLists: [],
        goals: [],
        events: [],
        preferences: [],
    });

    await newUser
        .save()
        .then((user) => {
            newUser = user;
        })
        .catch((err) => {
            console.error(err);
        });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    // No errors
    res.status(201).send(newUser);
});

// TEMP ROUTE
router.get("/s", (req, res) => {
    res.send("logged in");
});
// TEMP ROUTE
router.get("/f", (req, res) => {
    res.send("log in failed");
});

// SECTION - LOGIN USER
// Login a user
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/users/s", // TODO - change these redirects
        failureRedirect: "/users/f",
        failureFlash: false,
    })(req, res, next);

    // TODO - Make some tests
});
// !SECTION

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.send("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.send("hello ");
});

// SECTION - DELETE USER
// Delete a user
router.delete("/:userid", async (req, res) => {
    let userid = req.params.userid;
    let errors = [];

    if (userid == undefined || userid.length != 24) {
        errors.push("a valid userid must be set as a url parameter");
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findByIdAndDelete(userid)
        .then((user) => {
            if (!user) {
                errors.push("could not find a user with the given id");
            }
        })
        .catch((err) => console.error(err));

    if (errors.length > 0) {
        res.status(400).send(errors);
    } else {
        res.status(200).send();
    }
});

// TODO - Add Password Protected Validation
// !SECTION

// TODO - Update Email
// TODO - Reset / Recover Password

module.exports = router;
