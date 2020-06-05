const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 12;
const path = require("path");
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "../", "modules", "database.js"));
const { initSession, isEmail } = require("../utils/utils");

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
router.get("/:userid", async (req, res) => {
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
router.post("/register", async (req, res) => {});

// SECTION - LOGIN USER
// Login a user
router.post("/login", async (req, res) => {
    let user;
    let code = 200;
    let email = req.body.email;
    email = email.replace(/ /g, ""); // Strip white spaces
    let password = req.body.password;

    await DB.fetchUserByEmail(email)
        .then((res) => {
            user = res;
            code = res ? 200 : 400;
        })
        .catch((err) => {
            console.error(err);
            code = 500;
        });
    if (code == 400) {
        res.status(code).send("could not find a user with that email address");
        return;
    }

    await bcrypt
        .compare(password, user.userinfo.hash)
        .then((success) => {
            if (!success) {
                code = 403;
            }
        })
        .catch((err) => {
            console.error(err);
        });

    if (code == 403) {
        res.status(code).send("invalid login credentials");
        return;
    }

    res.status(code).send(user);
    // TODO - Make this more legitamate
    // TODO - Make some tests
});
// !SECTION

// TODO - Update Email
// TODO - Reset / Recover Password

module.exports = router;
