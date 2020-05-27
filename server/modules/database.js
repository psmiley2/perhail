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
                resolve(res);
            }
        });
    });
};

// Fetches a user from the DB
exports.fetchUser = (userid) => {
    let query = {
        _id: new ObjectID(userid),
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

// insertPerson = () => {
//     return new Promise((resolve, reject) => {
//         dbo.collection("people").insertOne(myobj, (err, res) => {
//             if (err) reject("err => ", err);
//             console.log("returned id => ", res.ops[0]._id);
//             resolve(res.ops[0]._id);
//             // db.close();
//         });
//     });
// };

// insertPerson(myobj, dbo)
//     .then((res) => {
//         userID = res;
//     })
//     .catch((err) => console.log(err));

// findPerson = (userID, dbo) => {
//     // query =
//     //     ({ _id: userID },
//     //     { $push: { "tasklists.$[].$[tasklist].tasks": "HERRO" } },
//     //     { arrayFilters: [{ "tasklist.title": "weekly" }] });
//     return new Promise((resolve, reject) => {
//         try {
//             dbo.collection("people").updateOne(
//                 { _id: userID },
//                 { $push: { "tasklists.$[list].tasks": "new element" } },
//                 { arrayFilters: [{ "list.name": "daily" }] },
//                 { upsert: true }
//             );
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

// findPerson(userID, dbo)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
