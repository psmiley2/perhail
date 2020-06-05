/* -------------------------------------------------------------------------- */
/*                                    SetUp                                   */
/* -------------------------------------------------------------------------- */
const express = require("express");
const path = require("path");
require("dotenv").config();
let ObjectID = require("mongodb").ObjectID;
const DB = require(path.join(__dirname, "modules", "database.js"));
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
var cookieParser = require("cookie-parser");

const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");
const goalRoutes = require("./routes/goals");
const eventRoutes = require("./routes/events");
const preferenceRoutes = require("./routes/preferences");

let app = express();

// Passport Config
require("./config/passport")(passport);

// Express Body Parser
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

// Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Express session
app.use(
    session({
        secret: "secret", // TODO -  MAKE THIS A LEGIT AND HIDDEN SECRET
        resave: true,
        saveUninitialized: true,
        // cookie: { secure: true }, // TODO - ALLOW ONCE WEBSITE IS HTTPS
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
    res.status(200).send("server is running!");
});
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/goals", goalRoutes);
app.use("/events", eventRoutes);
app.use("/preferences", preferenceRoutes);

// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Listening on PORT: ${PORT}`));

// MONGODB
// startServer = async (app) => {
//     await DB.establishConnection()
//         .then(() => {
//             app.listen(process.env.PORT);
//             console.log("listening...");
//         })
//         .catch((err) => {
//             console.error(err);
//             process.exit(1);
//         });
//     return app;
// };
// app = startServer(app);
