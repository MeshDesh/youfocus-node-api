import { Router } from 'express';
import { getStatus } from '../controllers';

const indexRouter = Router();

indexRouter.route('/test').get(getStatus);

export default indexRouter;
