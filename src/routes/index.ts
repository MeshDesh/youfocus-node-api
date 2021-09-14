import { Router } from 'express';
import {getPlaylistItems, getStatus, postFeedback, updateUserOnboarding } from '../controllers';
import { googleAuth } from '../controllers/auth';

const indexRouter = Router();

indexRouter.route('/test').get(getStatus);
indexRouter.route('/playlist').get(getPlaylistItems);
indexRouter.route('/feedback').post(postFeedback);
indexRouter.route('/auth').post(googleAuth)
indexRouter.route('/onboarding').post(updateUserOnboarding)
export default indexRouter;
