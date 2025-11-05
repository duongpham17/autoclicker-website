// cors.ts (backend CORS middleware setup)
import cors from 'cors';

const production_url: string[] = [
  "https://autoclicker-f60h.onrender.com"
];

const development_url: string[] = [
    'http://localhost:3000'
];

const whitelist: string[] =
  process.env.NODE_ENV === 'development' ? development_url : production_url;

export const corsPrivate = cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
});

// simple public CORS for GET requests and POST for authentications
export const corsPublic = cors({
  origin: '*',
  methods: ['GET', 'POST'],
});
