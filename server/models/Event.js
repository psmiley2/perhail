const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
});

const Event = mongoose.model("EventSchema", EventSchema, "users");

module.exports = {
    EventSchema,
    Event,
};
