import configEnv from "../config";
import { PlaylistModel,VideoModel} from "../interfaces";
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
export const getPlaylist = async (playlistId: string, pageToken: string) => {

  let playlistData = {} as PlaylistModel
  
  let videoData = {} as VideoModel

  return await youtube.playlistItems.list({
    playlistId,
    maxResults: 10,
    part: ['snippet', 'id'],
    pageToken
  }).then(response => {
    const {pageInfo, prevPageToken, nextPageToken, items} = response.data;
    playlistData = {
      playlistId: playlistId,
      playlistMeta: pageInfo,
      nextPageToken: nextPageToken,
      prevPageToken: prevPageToken,
      items: items?.map((video) => {
        const {snippet} = video;
        return videoData = {
          id: snippet?.resourceId?.videoId,
          title: snippet?.title,
          thumbnail: snippet?.thumbnails?.default
        } as VideoModel
      })
    } as PlaylistModel
    return playlistData;
  }).catch((error) => {
    return {
      message: 'There was an error',
      error
    }
  })

}

