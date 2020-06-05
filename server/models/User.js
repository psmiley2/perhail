const mongoose = require("mongoose");
const { TaskListSchema } = require("./Task");
const { GoalSchema } = require("./Goal");
const { PreferenceSchema } = require("./Preference");
const { EventSchema } = require("./Event");
const UserSchema = new mongoose.Schema({
    userInfo: {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        created: {
            type: Date,
            default: Date.now,
        },
    },
    taskLists: {
        type: [TaskListSchema],
        default: [],
    },
    goals: {
        type: [GoalSchema],
        default: [],
    },
    events: {
        type: [EventSchema],
        default: [],
    },
    preferences: {
        type: [PreferenceSchema],
        default: [],
    },
});

const User = mongoose.model("UserSchema", UserSchema, "users");

module.exports = User;
