import { Request, Response } from 'express';
import { addFeedbackToDatabase } from '../database-modules';
import { feedbackModel } from '../interfaces';
import { getPlaylist, getPlaylistId } from '../utils';
import { errorResponse, successResponse } from '../utils/response';

// 1. Get status of the API
export const getStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(200).json({
    status: true,
  });
};

//2.Get Playlist Items
export const getPlaylistItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { url, pageToken } = req.body;
  var playlistId = getPlaylistId(url);
  if (!playlistId) {
    res.send(errorResponse(404, 'Invalid Playlist ID'))
  }
  getPlaylist(playlistId, pageToken)
    .then(result => {
      if (result.err) {
        res.send(errorResponse(404, 'No such playlist found'));
      } else {
        res.send(successResponse(result));
      }
    })
    .catch(err => {
      console.log(err)
      res.send(errorResponse(404, 'Whoops some error occured!'))
    });
};

//2. Post Feedback to DB
export const postFeedback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, rating, feedbackMessage } = req.body;

  let feedbackData = {} as feedbackModel;

  feedbackData = {
    email,
    rating: rating as Number,
    feedbackMessage,
    addedOn: new Date(Date.now()),
  } as feedbackModel;

  addFeedbackToDatabase(feedbackData)
    .then(result => {
      res.send(successResponse(result));
    })
    .catch(err => {
      console.log(err)
      res.send(errorResponse(404, 'Whoops some error occured!'))
    });
};
