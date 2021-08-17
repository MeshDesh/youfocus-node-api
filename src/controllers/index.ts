import { Request, Response } from 'express';
import { addFeedbackToDatabase } from '../database-modules';
import { feedbackModel } from '../interfaces';
import { getPlaylist, getPlaylistId } from '../utils';
import { errorResponse, successResponse } from '../utils/response';

// 1. Get status of the API
export const getStatus = async (
  request: Request,
  response: Response,
): Promise<void> => {
  response.status(200).json({
    status: true,
  });
};

//2.Get Playlist Items
export const getPlaylistItems = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { url, pageToken } = request.body;
  var playlistId = getPlaylistId(url);
  if (!playlistId) {
    response.send(errorResponse(404, 'Invalid Playlist ID'))
  }
  getPlaylist(playlistId!, pageToken!)
    .then(result => {
      response.send(successResponse(result));
    })
    .catch(err => {
      console.log(err)
      response.send(errorResponse(404, 'Whoops some error occured!'))
    });
};

//2. Post Feedback to DB
export const postFeedback = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { email, rating, feedbackMessage } = request.body;

  let feedbackData = {} as feedbackModel;

  feedbackData = {
    email,
    rating: rating as Number,
    feedbackMessage,
    addedOn: new Date(Date.now()),
  } as feedbackModel;

  addFeedbackToDatabase(feedbackData)
    .then(result => {
      response.send(successResponse(result));
    })
    .catch(err => {
      console.log(err)
      response.send(errorResponse(404, 'Whoops some error occured!'))
    });
};
