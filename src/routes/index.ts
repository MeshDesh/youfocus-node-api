import { Router } from 'express';
import {getPlaylistItems, getStatus, postFeedback } from '../controllers';

const indexRouter = Router();

indexRouter.route('/test').get(getStatus);
indexRouter.route('/playlist').post(getPlaylistItems);
indexRouter.route('/feedback').post(postFeedback);

export default indexRouter;
