import { Request, Response } from 'express';
import { addFeedbackToDatabase } from '../database-modules';
import { addOnboardingData, addPlaylistToUser, fetchUserPlaylists, removePlaylistFromUser } from '../database-modules/user';
import { feedbackModel, Playlist } from '../interfaces';
import { getPlaylist } from '../utils';
import { errorResponse, successResponse } from '../utils/response';

//1.Get Playlist Items
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
      successResponse(result, response);
    })
    .catch(err => {
      errorResponse(404, err, response);
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

//3. Post Onboarding Data 
export const updateUserOnboarding = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { user, form } = request.body;

  console.log(form.profession, form.isLearning)

  const onboardingData = {
    profession: form.profession,
    isLearning: form.isLearning
  }

  addOnboardingData(user, onboardingData)
    .then(result => {
      successResponse(result!, response)
    })
    .catch(error => {
      console.log(error)
      errorResponse(404, 'Server Error', response)
    });
};

//4. Add Playlist to User Document
export const addPlaylistToUserDoc = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { user, playlist } = request.body;

  addPlaylistToUser(user, playlist)
    .then(result => {
      successResponse(result!, response)
    }).catch(error => {
      console.log(error)
      errorResponse(404, 'Server Error', response)
    })
}

//5. Fetch User Playlist 
export const fetchUserPlaylistsFromDoc = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { user } = request.body;

  fetchUserPlaylists(user)
  .then(result => {
    successResponse(result!, response)
  }).catch(error => {
    console.log(error)
    errorResponse(404, 'Server Error', response)
  })

}

//6. Remove playlist from user
export const removePlaylistFromUserDoc = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { user, id } = request.body;

  removePlaylistFromUser(user, id)
    .then(result => {
      successResponse(result!, response)
    }).catch(error => {
      console.log(error)
      errorResponse(404, 'Server Error', response)
    })
}