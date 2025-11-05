import {Express} from 'express';

import webhooks from './route';

const endpoints = (app: Express) => {
    app.use('/api/webhooks', webhooks);
};

export default endpoints;