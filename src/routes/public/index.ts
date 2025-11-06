import { Express } from 'express';
import { corsPublic } from '../../@utils/cors';
import authentications from '../public/authentications';

const endpoints = (app: Express) => {
    app.use('/api/authentications', corsPublic, authentications);
};

export default endpoints;