"use strict";
const mongoose = require("mongoose");
const role = mongoose.Schema({
    type: {
        type: String,
        default: "employee",
        lowercase: true,
        trim: true,
        required: ["This role not acceptable"]

    },
    permissions: {
        view: { type: Boolean, default: false },
        add: { type: Boolean, default: false },
        edit: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
        all: { type: Boolean, default: false }
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("role", role);
module.exports = role;