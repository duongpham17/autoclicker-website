"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsPublic = exports.corsPrivate = void 0;
// cors.ts (backend CORS middleware setup)
const cors_1 = __importDefault(require("cors"));
const _environment_1 = require("../@environment");
const whitelist = process.env.NODE_ENV === 'production' ? _environment_1.production_url : _environment_1.development_url;
exports.corsPrivate = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'device-remember-token',
        'Origin',
        'Accept'
    ],
});
// simple public CORS for GET requests and POST for authentications
exports.corsPublic = (0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST'],
});
