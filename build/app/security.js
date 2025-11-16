"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = __importDefault(require("rate-limiter-flexible"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const validator_1 = __importDefault(require("validator"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
/**
 * Middleware to limit repeated requests from the same IP.
 * Allows 100 requests per 60 seconds per IP.
 */
const rateLimitMiddleware = async (req, res, next) => {
    try {
        const { RateLimiterMemory } = rate_limiter_flexible_1.default;
        const rateLimiter = new RateLimiterMemory({ points: 100, duration: 60 });
        await rateLimiter.consume(req.ip);
        next();
    }
    catch (err) {
        res.status(429).json({
            message: "Too many requests. Please try again later.",
        });
    }
};
/**
 * Middleware to sanitize user input in request body.
 * Escapes potentially harmful characters to prevent XSS attacks.
 */
const sanitizeInputMiddleware = (req, res, next) => {
    for (const key in req.body) {
        if (typeof req.body[key] === "string") {
            req.body[key] = validator_1.default.escape(req.body[key]);
        }
    }
    next();
};
const security = (app) => {
    app.use((0, helmet_1.default)()); // helmet: sets HTTP headers for basic security
    app.use((0, hpp_1.default)()); // hpp: prevents HTTP parameter pollution
    app.use((0, express_mongo_sanitize_1.default)()); // mongoSanitize: removes MongoDB operators from user input
    app.use(rateLimitMiddleware); // rateLimitMiddleware: limits request rate per IP
    app.use(sanitizeInputMiddleware); // sanitizeInputMiddleware: cleans request body to prevent XSS
};
exports.default = security;
