// cors.ts
import cors from 'cors';
import { development_url, production_url } from '../@environment';
const whitelist: string[] = process.env.NODE_ENV === 'development' ? development_url : production_url;

/**
 * Check if the origin is allowed based on the whitelist
 */
const originChecker = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
  if (!origin || whitelist.includes(origin)) {
    // Allow requests with no origin (like mobile apps, curl, or server-side)
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

/**
 * Private CORS middleware (for authenticated routes)
 * Allows only whitelisted origins, supports credentials, and handles preflight
 */
export const corsPrivate = cors({
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
 * Public CORS middleware (for GET and login POST routes)
 * Allows all origins, handles preflight requests
 */
export const corsPublic = cors({
  origin: (origin, callback) => callback(null, true),
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
  credentials: false,
});

// Preflight handler for all routes
export const corsPreflight = (req: any, res: any, next: any) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization,X-Requested-With,Origin,Accept,device-remember-token'
    );
    return res.sendStatus(204); // No Content
  }
  next();
};
