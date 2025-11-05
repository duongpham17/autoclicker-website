import express, {IRouter} from 'express';
import { credit } from './controller';
import { protect, restrict } from '../../controllers/authentication';

const router: IRouter = express.Router();

router.use(protect, restrict(["admin", "user"]));
router.post('/credit', credit);

export default router;