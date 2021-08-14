import { Router } from 'express';
import {getPlaylistItems, getStatus, postFeedback } from '../controllers';

const indexRouter = Router();

indexRouter.route('/test').get(getStatus);
indexRouter.route('/playlistItems').post(getPlaylistItems);
indexRouter.route('/user-feedback').post(postFeedback);

export default indexRouter;
