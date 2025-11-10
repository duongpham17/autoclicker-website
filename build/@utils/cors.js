"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsPreflight = exports.corsPublic = exports.corsPrivate = void 0;
const cors_1 = __importDefault(require("cors"));
const _environment_1 = require("../@environment");
const whitelist = process.env.NODE_ENV === 'development' ? _environment_1.development_url : _environment_1.production_url;
/**
 * Check if the origin is allowed based on the whitelist
 */
const originChecker = (origin, callback) => {
    if (!origin || origin === 'null' || whitelist.includes(origin)) {
        callback(null, true); // allow Electron, curl, server-side
    }
    else {
        callback(new Error('Not allowed by CORS'));
    }
};
/**
 * Private CORS middleware (authenticated routes)
 */
exports.corsPrivate = (0, cors_1.default)({
    origin: originChecker,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'device-remember-token',
        'Origin',
        'Accept',
    ],
    credentials: true, // allow cookies/credentials
});
/**
 * Public CORS middleware (login routes)
 */
exports.corsPublic = (0, cors_1.default)({
    origin: originChecker, // explicitly allow whitelist & Electron
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
    credentials: false,
});
/**
 * Preflight handler for all routes
 */
const corsPreflight = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Origin,Accept,device-remember-token');
        return res.sendStatus(204); // No Content
    }
    next();
};
exports.corsPreflight = corsPreflight;
