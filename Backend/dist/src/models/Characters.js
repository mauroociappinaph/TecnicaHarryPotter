"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const characterSchema = new mongoose_1.Schema({
    id: { type: String, default: uuid_1.v4 },
    name: { type: String, required: true, trim: true },
    role: { type: String },
    house: { type: String },
    species: { type: String },
    wizard: { type: Boolean },
    patronus: { type: String },
    hogwartsStudent: { type: Boolean },
    hogwartsStaff: { type: Boolean },
    alive: { type: Boolean },
    image: { type: String }
});
const Characters = (0, mongoose_1.model)('Characters', characterSchema);
exports.default = Characters;
