/* -------------------------------------------------------------------------- */
/*                                    SetUp                                   */
/* -------------------------------------------------------------------------- */
const express = require("express");
const path = require("path");
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

app.use(express.urlencoded({ extended: false }));
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

app = startServer(app);
