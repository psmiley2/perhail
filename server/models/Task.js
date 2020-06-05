const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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

const Task = mongoose.model("TaskSchema", TaskSchema, "users");

const TaskListSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
    tasks: {
        type: [TaskSchema],
        default: [],
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

const TaskList = mongoose.model("TaskListSchema", TaskListSchema, "users");

module.exports = {
    TaskListSchema,
    TaskSchema,
    TaskList,
    Task,
};
