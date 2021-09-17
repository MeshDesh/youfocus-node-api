import { Router } from 'express';
import {addPlaylistToUserDoc, fetchUserPlaylistsFromDoc, getPlaylistItems, postFeedback, removePlaylistFromUserDoc, updateUserOnboarding } from '../controllers';
import { googleAuth } from '../controllers/auth';

const indexRouter = Router();

indexRouter.route('/playlist').get(getPlaylistItems);
indexRouter.route('/feedback').post(postFeedback);
indexRouter.route('/auth').post(googleAuth)
indexRouter.route('/onboarding').post(updateUserOnboarding)
indexRouter.route('/user-playlists').post(fetchUserPlaylistsFromDoc)
indexRouter.route('/add-playlist').post(addPlaylistToUserDoc)
indexRouter.route('/remove-playlist').post(removePlaylistFromUserDoc)

export default indexRouter;
