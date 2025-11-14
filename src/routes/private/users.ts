import express, {IRouter} from 'express';
import { protect, restrict } from '../../controllers/authentication';
import { find, create, update, remove, password } from '../../controllers/users';

const router: IRouter = express.Router();

router.use(protect, restrict(["admin", "user"]));
router.get('/', find);
router.post('/', create);
router.patch('/', update);
router.delete('/', remove);
router.patch('/password', password)

export default router;