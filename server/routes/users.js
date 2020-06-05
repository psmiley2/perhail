const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));
const saltRounds = 12;

// Load User model
const User = require("../models/User");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// SECTION - CREATE USER
// Create a new user
router.post("/", async (req, res) => {
    // TODO - Validation
    let userInfo = {
        email: req.body.email,
        hash: "",
    };
    let code = 400;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    userInfo.hash = hash;

    let user = {
        userinfo: userInfo,
        tasklists: [],
        preferences: [],
        tracks: [],
        goals: [],
        events: [],
    };

    await DB.insertUser(user)
        .then((res) => {
            if (res == 1) {
                code = 201;
            } else {
                code == 500;
            }
        })
        .catch((err) => console.error(err));
    if (code == 201) {
        res.status(code).send(user);
    } else {
        res.status(code).send(
            "Unexpected error occured. Check Database connection"
        );
    }
});
// !SECTION

// SECTION - FETCH USER
// Fetch an existing user
router.get("/find/:userid", async (req, res) => {
    let user;
    let code = 400;
    let userid = req.params.userid;

    if (userid.length != 24) {
        res.status(code).send("invalid user id");
        return;
    }

    userid = new ObjectID(userid);

    await DB.fetchUser(userid)
        .then((res) => {
            user = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 500;
        });

    res.status(code).send(user);
});
// !SECTION

// SECTION - RESGISTER USER
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    let errors = [];

    if (!email || !password) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    await User.findOne({ "userInfo.email": email }).then((user) => {
        if (user) {
            errors.push({ msg: "Email already exists" });
        } else {
            const newUser = new User({
                userInfo: {
                    email,
                    password,
                },
            });

            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(newUser.userInfo.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.userInfo.password = hash;
                    user = newUser.save().catch((err) => console.error(err));
                });
            });
        }
    });

    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    } else {
        res.status(201).send("Successfully created");
    }
});

router.get("/s", (req, res) => {
    res.send("logged in");
});
router.get("/f", (req, res) => {
    res.send("log in failed");
});

// SECTION - LOGIN USER
// Login a user
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/users/s",
        failureRedirect: "/users/f",
        failureFlash: false,
    })(req, res, next);

    // // TODO - Make some tests
});
// !SECTION

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.send("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.send("hello ");
});

// TODO - Update Email
// TODO - Reset / Recover Password

module.exports = router;
