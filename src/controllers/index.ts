import { Request, Response } from 'express';
import { addFeedbackToDatabase } from '../database-modules';
import { feedbackModel } from '../interfaces';
import { getPlaylist } from '../utils';
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
  const { playlistId, pageToken } = request.query;

  if (!playlistId) {
    errorResponse(404, 'Invalid playlist ID', response)
    return
  }
  await getPlaylist(playlistId as string, pageToken as string)
    .then(result => {
      successResponse(result, response)
    })
    .catch(err => {
      console.log(err)
      errorResponse(404, 'Some Error Occured', response)
    });
};

//2. Post Feedback to DB
export const postFeedback = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { email, rating, feedbackMessage } = request.body;

  let feedbackData = {
    email,
    rating: parseInt(rating),
    feedbackMessage,
    addedOn: new Date(Date.now()),
  } as feedbackModel;

  addFeedbackToDatabase(feedbackData)
    .then(result => {
      successResponse(result, response)
    })
    .catch(err => {
      console.log(err)
      errorResponse(404, 'Some Error Occured', response)
    });
};
