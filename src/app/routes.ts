import {Express} from 'express';
import {errorMessage} from '../@utils/helper';
import PrivateRoutes from '../routes/private';
import PublicRoutes from '../routes/public';
import Stripe from '../stripe/payments';

const routes = (app: Express) => {

    PublicRoutes(app);

    PrivateRoutes(app);
    
    Stripe(app);

    app.use(errorMessage);
};

export default routes;