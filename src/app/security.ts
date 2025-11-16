import { Express, Request, Response, NextFunction } from "express";
import rateLimiterFlexible from "rate-limiter-flexible";
import mongoSanitize from "express-mongo-sanitize";
import validator from "validator";
import helmet from "helmet";
import hpp from "hpp";

/**
 * Middleware to limit repeated requests from the same IP.
 * Allows 100 requests per 60 seconds per IP.
 */
const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { RateLimiterMemory } = rateLimiterFlexible;
        const rateLimiter = new RateLimiterMemory({ points: 100, duration: 60 });
        await rateLimiter.consume(req.ip as string | number);
        next();
    } catch (err) {
        res.status(429).json({
            message: "Too many requests. Please try again later.",
        });
    }
};

/**
 * Middleware to sanitize user input in request body.
 * Escapes potentially harmful characters to prevent XSS attacks.
 */
const sanitizeInputMiddleware = (req: Request, res: Response, next: NextFunction) => {
    for (const key in req.body) {
        if (typeof req.body[key] === "string") {
            req.body[key] = validator.escape(req.body[key]);
        }
    }
    next();
};

const security = (app: Express) => {
    app.use(helmet());                // helmet: sets HTTP headers for basic security
    app.use(hpp());                   // hpp: prevents HTTP parameter pollution
    app.use(mongoSanitize());         // mongoSanitize: removes MongoDB operators from user input
    app.use(rateLimitMiddleware);     // rateLimitMiddleware: limits request rate per IP
    app.use(sanitizeInputMiddleware); // sanitizeInputMiddleware: cleans request body to prevent XSS
};

export default security;
