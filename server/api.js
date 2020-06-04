/* -------------------------------------------------------------------------- */
/*                                    SetUp                                   */
/* -------------------------------------------------------------------------- */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
let ObjectID = require("mongodb").ObjectID;
let app = express();
const DB = require(path.join(__dirname, "modules", "database.js"));
const cors = require("cors");
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const goalRoutes = require("./routes/goals");
const eventRoutes = require("./routes/events");
const preferenceRoutes = require("./routes/preferences");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/goals", goalRoutes);
app.use("/events", eventRoutes);
app.use("/preferences", preferenceRoutes);

app.get("/", (req, res) => {
    res.status(200).send("server is running!");
});

/* -------------------------- Preferences Endpoint -------------------------- */
// SECTION - PREFERENCES

// !SECTION

/* ----------------------------- Tracks Endpoint ----------------------------- */
// SECTION - TRACKS
// TODO - CREATE TRACKS LIST
// TODO - ADD TRACKS
// TODO - DELETE TRACKS
// TODO - UPDATE TRACKS
// TODO - DELETE TRACKS LIST
// TODO - FETCH TRACKS LIST
// !SECTION

/* -------------------------------------------------------------------------- */
/*                                Server Start                                */
/* -------------------------------------------------------------------------- */
startServer = async (app) => {
    await DB.establishConnection()
        .then(() => {
            app.listen(process.env.PORT);
            console.log("listening...");
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
    return app;
};
/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
validID = (id) => {
    if (id == undefined || id.length != 24) {
        return false;
    }
    return true;
    // More validation
};

app = startServer(app);
