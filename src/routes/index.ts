import { Router } from 'express';
import {getPlaylistItems, getStatus } from '../controllers';

const indexRouter = Router();

indexRouter.route('/test').get(getStatus);
indexRouter.route('/playlistItems').post(getPlaylistItems)
export default indexRouter;
