const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
    priority: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Goal = mongoose.model("GoalSchema", GoalSchema, "users");

module.exports = {
    GoalSchema,
    Goal,
};
