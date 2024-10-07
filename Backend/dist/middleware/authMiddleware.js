"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../src/models/User")); // Asegúrate de que IUser esté correctamente definido en tu modelo
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
        const error = new Error("Token no Válido o inexistente");
        res.status(403).json({ msg: error.message });
        return;
    }
    try {
        const [_, tokenString] = token.split(" ");
        if (!tokenString) {
            throw new Error("Token no Válido");
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }
        const decoded = jsonwebtoken_1.default.verify(tokenString, jwtSecret);
        const user = yield User_1.default.findById(decoded.id).select("-password -token -confirmado");
        if (!user) {
            throw new Error("El usuario no existe");
        }
        req.user = user; // Ajusta el tipo de `user`
        return next();
    }
    catch (error) {
        console.error(error);
        const e = new Error("Token no Válido");
        res.status(403).json({ msg: e.message });
    }
});
exports.default = checkAuth;
