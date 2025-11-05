import express, {IRouter} from 'express';
import { protect, persist, login, signup, code } from '../../controllers/authentication';

const router: IRouter = express.Router();

router.get('/load', protect, persist);
router.post('/login', login);
router.post('/signup', signup);
router.post('/code', code);

export default router;