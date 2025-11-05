import {Express} from 'express';

import users from './users';
import scripts from './scripts';
import orders from './orders';

const endpoints = (app: Express) => {
    app.use('/api/users',           users);
    app.use('/api/scripts',         scripts);
    app.use('/api/orders',          orders);
};

export default endpoints;