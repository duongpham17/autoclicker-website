import {Express} from 'express';
import {corsPrivate, corsPublic} from '../@utils/cors';
import {errorMessage} from '../@utils/helper';
import PrivateRoutes from '../routes/private';
import PublicRoutes from '../routes/public';
import Stripe from '../stripe/payments';

const routes = (app: Express) => {

    app.use(corsPublic);

    PublicRoutes(app);

    app.use(corsPrivate);

    PrivateRoutes(app);

    Stripe(app);

    app.use(errorMessage);
};

export default routes;