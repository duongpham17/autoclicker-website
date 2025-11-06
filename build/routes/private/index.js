"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("../../@utils/cors");
const users_1 = __importDefault(require("./users"));
const scripts_1 = __importDefault(require("./scripts"));
const orders_1 = __importDefault(require("./orders"));
const endpoints = (app) => {
    app.use('/api/users', cors_1.corsPrivate, users_1.default);
    app.use('/api/scripts', cors_1.corsPrivate, scripts_1.default);
    app.use('/api/orders', cors_1.corsPrivate, orders_1.default);
};
exports.default = endpoints;
