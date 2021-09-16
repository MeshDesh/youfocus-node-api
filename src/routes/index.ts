import { Router } from 'express';
import {getPlaylistItems, postFeedback, updateUserOnboarding } from '../controllers';
import { googleAuth } from '../controllers/auth';

const indexRouter = Router();

indexRouter.route('/playlist').get(getPlaylistItems);
indexRouter.route('/feedback').post(postFeedback);
indexRouter.route('/auth').post(googleAuth)
indexRouter.route('/onboarding').post(updateUserOnboarding)
export default indexRouter;
