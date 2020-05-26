var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var userID = "";

    var myobj = {
        name: "Dijkstra",
        tasklists: [
            {
                name: "weekly",
                tasks: ["take out the trash", "drink milk"],
            },
            {
                name: "daily",
                tasks: ["feed the zebras", "go insane", "party on the patio"],
            },
        ],
    };
    insertPerson = () => {
        return new Promise((resolve, reject) => {
            dbo.collection("people").insertOne(myobj, (err, res) => {
                if (err) reject("err => ", err);
                console.log("returned id => ", res.ops[0]._id);
                resolve(res.ops[0]._id);
                // db.close();
            });
        });
    };

    await insertPerson(myobj, dbo)
        .then((res) => {
            userID = res;
        })
        .catch((err) => console.log(err));

    findPerson = (userID, dbo) => {
        // query =
        //     ({ _id: userID },
        //     { $push: { "tasklists.$[].$[tasklist].tasks": "HERRO" } },
        //     { arrayFilters: [{ "tasklist.title": "weekly" }] });
        return new Promise((resolve, reject) => {
            try {
                dbo.collection("people").updateOne(
                    { _id: userID },
                    { $push: { "tasklists.$[list].tasks": "new element" } },
                    { arrayFilters: [{ "list.name": "daily" }] },
                    { upsert: true }
                );
            } catch (error) {
                reject(error);
            }
        });
    };

    await findPerson(userID, dbo)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
});

// comments: [
//     {
//       author: 'Foo',
//       text: 'This is awesome!',
//       replies: [
//         { author: 'Bar', text: 'Yeah I agree!' }
//       ]
//     },
//     {
//       author: 'Bar',
//       text: 'Where are the upgrade docs?',
//       replies: [
//         { author: 'Foo', text: 'github.com/Automattic/mongoose/blob/master/migrating_to_5.md' },
//         { author: 'Bar', text: 'Link does\'t work?' }
//       ]
//     }
//   ]
//   { $set: { 'comments.$[].replies.$[reply].author': 'Baz' } },
//   { arrayFilters: [{ 'reply.author': 'Bar' }] });
