const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Journey = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
    },
    completed: {
        type: Boolean,
    },
});

module.exports = mongoose.model("Journey", Journey);
