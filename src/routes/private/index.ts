import { Express } from 'express';
import { corsPrivate } from '../../@utils/cors';
import users from './users';
import scripts from './scripts';
import orders from './orders';

const endpoints = (app: Express) => {
    app.use('/api/users', corsPrivate, users);
    app.use('/api/scripts', corsPrivate, scripts);
    app.use('/api/orders', corsPrivate, orders);
};

export default endpoints;