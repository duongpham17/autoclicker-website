import {Express} from 'express';

import stripe from './route';

const endpoints = (app: Express) => {
    app.use('/api/stripe', stripe);
};

export default endpoints;