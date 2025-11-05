"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsPublic = exports.corsPrivate = void 0;
// cors.ts (backend CORS middleware setup)
const cors_1 = __importDefault(require("cors"));
const production_url = [
    "https://autoclicker-f60h.onrender.com",
    'http://localhost:3000'
];
const development_url = [
    'http://localhost:3000'
];
const whitelist = process.env.NODE_ENV === 'development' ? development_url : production_url;
exports.corsPrivate = (0, cors_1.default)({
    origin: whitelist,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
});
// simple public CORS for GET requests and POST for authentications
exports.corsPublic = (0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST'],
});
