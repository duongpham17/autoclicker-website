import {Express} from 'express';
import {corsPrivate} from '../@utils/cors';
import {errorMessage} from '../@utils/helper';
import Routes from '../routes';
import Stripe from '../stripe/payments';

const routes = (app: Express) => {

    app.use(corsPrivate);

    Routes(app);

    Stripe(app);

    app.use(errorMessage);
};

export default routes;