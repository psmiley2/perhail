/* -------------------------------------------------------------------------- */
/*                                    SetUp                                   */
/* -------------------------------------------------------------------------- */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = 10;

let app = express();
const DB = require(path.join(__dirname, "modules", "database.js"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/* -------------------------------------------------------------------------- */
/*                                  Endpoints                                 */
/* -------------------------------------------------------------------------- */
app.get("/", (req, res) => {
    res.status(200).send("server is running!");
});

/* ----------------------------- User Endpoints ----------------------------- */
// Create a new user
app.post("/users", (req, res) => {
    // TODO - Validation
    let userInfo = {
        email: req.body.email,
        hash: "",
    };
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    userInfo.hash = hash;

    let user = {
        userinfo: userInfo,
        tasklists: [],
        preferences: [],
        tracks: [],
        goals: [],
        eventlists: [],
    };

    DB.insertUser(user).catch((err) => console.error(err));
    res.status(201).send(user);
});

// Fetch an existing user
app.get("/users/:userid", async (req, res) => {
    let user;
    let code = 200;
    let userid = req.params.userid;

    if (userid.length != 24) {
        res.status(400).send("invalid user id");
        return;
    }

    await DB.fetchUser(req.params.userid)
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

/* ----------------------------- Task Endpoints ----------------------------- */
// Create a new list of tasks
app.post("/tasks/newlist", (req, res) => {
    let userid = req.query.userid;
    let list = {
        title: req.body.title,
        tasks: [],
    };

    DB.insertTaskList(userid, list).catch((err) => console.error(err));
    res.status(201).send(list);
});

/* -------------------------------------------------------------------------- */
/*                                Server Start                                */
/* -------------------------------------------------------------------------- */
DB.establishConnection()
    .then(() => {
        app.listen(process.env.PORT);
        console.log("listening...");
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

module.exports = app;
