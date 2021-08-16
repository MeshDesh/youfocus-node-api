import configEnv from "../config";
import { playlistModel, videoModel } from "../interfaces/playlist";
const {google} = require('googleapis');

//youtube api config;
const youtube = google.youtube({
  version: 'v3',
  auth: configEnv.YOUTUBE_API_KEY
});

//extracting playlist id;
export const getPlaylistId = (url:string) => {
  var reg = new RegExp("[&?]list=([a-z0-9_]+)","i");
  var match = reg.exec(url);

  if (match && match[1].length > 0){
    return match[1];
  }
  
}

//Get playlist items
export const getPlaylist = async(playlistId:string = '', pageToken:string = '') => {
    let playlistData = {} as playlistModel
    let videoData = {} as videoModel
    return await youtube.playlistItems.list({
      "maxResults": 10,
      "part": 'snippet, id',
      "playlistId": playlistId,
      "pageToken": pageToken
    }).then(res => {
      playlistData = {
        playlistId: playlistId,
        playlistMeta: res.data.pageInfo,
        nextPageToken: res.data.nextPageToken,
        prevPageToken: res.data.prevPageToken,
        items: res.data.items.map(video => {
          return videoData = {
            id: video.snippet.resourceId.videoId,
            thumbnailUrl:video.snippet.thumbnails.default,
            channelName: video.snippet.channelTitle,
            title: video.snippet.title
          } as videoModel          
        }),
      } as playlistModel
      return playlistData;
    }).catch((err) => {
        return{
            message: 'There was an error',
            err
        }
    })

}