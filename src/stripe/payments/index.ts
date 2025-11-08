import {Express} from 'express';
import {corsPrivate} from '../../@utils/cors';
import stripe from './route';

const endpoints = (app: Express) => {
    app.use('/api/stripe', corsPrivate, stripe);
};

export default endpoints;