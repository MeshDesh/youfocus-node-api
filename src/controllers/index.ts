import { Request, response, Response } from 'express';
import { addFeedbackToDatabase } from '../database-modules';
import { feedbackModel } from '../interfaces';
import { getPlaylist, getPlaylistId } from '../utils';

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
export const getPlaylistItems = async(
  req: Request,
  res: Response,
):Promise<void> => {
  const {url} = req.body;
  var id = getPlaylistId(url);
  if(id === 0){
    res.status(404).json({message: 'The provided playlist url is wrong. please try again with a different url'})
  }
  getPlaylist(id)
    .then(result => {
      if(result.err){
        res.status(404).json({
          status: false,
          error: 'No such playlist found!',
          payload: result,
        })
      }else{
        res.status(200).json({
          status: true,
          payload: result,
        })
      } 
    })
    .catch((err) => {
      res.status(404).json({
        status: false,
        error: 'No such playlist found!',
        payload: err,
      })
    })
}

//2. Post Feedback to DB
export const postFeedback = async(
  req: Request,
  res: Response,
):Promise<void> => {
  const {email, rating, feedbackMessage} = req.body;
  
  let feedbackData = {} as feedbackModel;
  
  feedbackData = {
    email,
    rating: rating as Number,
    feedbackMessage,
    addedOn: new Date(Date.now())
  } as feedbackModel

  addFeedbackToDatabase(feedbackData)
    .then(result => {
      res.status(200).json({
        status: true,
        payload: result,
      })
    })
    .catch(err => {
      response.status(400).json({
        status: false,
        error: 'Whoops! Something went wrong.',
        payload: err,
      });
    })
}

