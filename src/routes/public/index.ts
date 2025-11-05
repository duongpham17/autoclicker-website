import {Express} from 'express';

import authentications from '../public/authentications';

const endpoints = (app: Express) => {
    app.use('/api/authentications', authentications);
};

export default endpoints;