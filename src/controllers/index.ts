import { Request, response, Response } from 'express';
import { getPlaylist } from '../utils';

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
  const playlistid = url.split('list=')[1];
  var playlistData = await getPlaylist(playlistid);
  if(playlistData.length === 0){
    res.status(404).json({message:'No such playlist found'});
  }else{
    res.status(200).json({playlist: playlistData, message: 'Found playlist!'})
  }
}


