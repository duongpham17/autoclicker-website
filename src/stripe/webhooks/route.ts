import express from 'express';
import { paymentIntent } from './controller';

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), paymentIntent);

export default router;