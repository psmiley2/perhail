const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const Habit = mongoose.model("HabitSchema", HabitSchema, "users");

module.exports = {
    Habit,
    HabitSchema,
};
