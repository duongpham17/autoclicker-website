"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentications_1 = __importDefault(require("../public/authentications"));
const endpoints = (app) => {
    app.use('/api/authentications', authentications_1.default);
};
exports.default = endpoints;
