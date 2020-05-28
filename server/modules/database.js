var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
let DB = undefined;
let usersCol = undefined;

/* -------------------------------------------------------------------------- */
/*                                   Set Up                                   */
/* -------------------------------------------------------------------------- */
exports.establishConnection = () => {
    if (!process.env.MONGODB_URI) {
        console.error("No MongoDB URI set. Exiting...");
        process.exit(1);
    }
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            process.env.MONGODB_URI,
            { useUnifiedTopology: true, useNewUrlParser: true },
            (err, client) => {
                if (!err) {
                    DB = client.db("Perhail");
                    usersCol = DB.collection("users");
                    resolve();
                } else {
                    reject(err);
                }
            }
        );
    });
};

/* -------------------------------------------------------------------------- */
/*                                  API Pairs                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Users --------------------------------- */
// Puts a user in the DB
exports.insertUser = (user) => {
    return new Promise((resolve, reject) => {
        usersCol.insertOne(user, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.insertedCount);
            }
        });
    });
};

// Fetches a user from the DB
exports.fetchUser = (userid) => {
    let query = {
        _id: userid,
    };
    return new Promise((resolve, reject) => {
        usersCol.findOne(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

/* ---------------------------------- Tasks --------------------------------- */
// Adds a new task list for the user with the given id
exports.insertTaskList = (userid, taskList) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { tasklists: taskList },
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.insertTask = (userid, listid, task) => {
    let query = {
        _id: userid,
    };
    let action = {
        $push: { "tasklists.$[list].tasks": task },
    };
    let filter = {
        arrayFilters: [{ "list._id": listid }],
    };
    return new Promise((resolve, reject) => {
        usersCol
            .updateOne(query, action, filter)
            .then((res) => {
                resolve(res.result.nModified);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
