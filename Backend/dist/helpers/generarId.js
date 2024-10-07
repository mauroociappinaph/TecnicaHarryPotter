"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generarId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
exports.default = generarId;
