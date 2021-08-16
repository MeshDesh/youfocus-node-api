import configEnv from "../config";
import { PlaylistModel,VideoModel} from "../interfaces/playlist";
import { google } from "googleapis";

//youtube api config;
const youtube = google.youtube({
  version: 'v3',
  auth: configEnv.YOUTUBE_API_KEY
});

//extracting playlist id;
export const getPlaylistId = (url: string) => {
  var reg = new RegExp("[&?]list=([a-z0-9_]+)", "i");
  var match = reg.exec(url);

  if (match && match[1].length > 0) {
    return match[1];
  }

}

//Get playlist items
export const getPlaylist = async (playlistId: string = '', pageToken: string = '') => {

  let playlistData = {} as PlaylistModel
  let videoData = {} as VideoModel

  return await youtube.playlistItems.list({
    playlistId: playlistId,
    maxResults: 10,
    part: ['snippet', 'id'],
    pageToken: pageToken
  }).then(res => {
    playlistData = {
      playlistId: playlistId,
      playlistMeta: res.data.pageInfo,
      nextPageToken: res.data.nextPageToken,
      prevPageToken: res.data.prevPageToken,
      items: res.data.items?.map((video) => {
        return videoData = {
          id: video.snippet?.resourceId?.videoId,
          title: video.snippet?.title,
          thumbnail: video.snippet?.thumbnails?.default
        } as VideoModel
      })
    } as PlaylistModel
    return playlistData;
  }).catch((err) => {
    return {
      message: 'There was an error',
      err
    }
  })

}

