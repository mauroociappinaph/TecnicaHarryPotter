"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (id) => {
    if (!id) {
        throw new Error("No se ha proporcionado un id");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("No se ha proporcionado un secreto para el token");
    }
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
exports.default = generarJWT;
