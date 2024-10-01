"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start() {
        this.app.listen(4000, () => {
            console.log('Server running on port 4000');
        });
    }
}
exports.default = Application;
