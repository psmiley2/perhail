const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
});

const Preference = mongoose.model(
    "PreferenceSchema",
    PreferenceSchema,
    "users"
);

module.exports = {
    PreferenceSchema,
    Preference,
};
