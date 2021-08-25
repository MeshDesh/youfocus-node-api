import configEnv from '../config';
import {
  Playlist,
  PlaylistData,
  PlaylistInfo,
  VideoModel,
} from '../interfaces';
import { google } from 'googleapis';

//youtube api config;
const youtube = google.youtube({
  version: 'v3',
  auth: configEnv.YOUTUBE_API_KEY,
});

// //extracting playlist id;
// export const getPlaylistId = (url: string) => {
//   var reg = new RegExp('[&?]list=([a-z0-9_]+)', 'i');
//   var match = reg.exec(url);

//   if (match && match[1].length > 0) {
//     return match[1];
//   }
// };

const getPlaylistInfo = async (playlistId: string) => {
  return await youtube.playlists
    .list({
      id: [playlistId],
      part: ['snippet', 'id'],
    })
    .then(response => {
      const { items } = response.data;

      return {
        playlistId,
        playlistName: items![0].snippet?.title!,
        playlistItemCount: items![0].contentDetails?.itemCount!,
        playlistThumb: items![0].snippet?.thumbnails?.default?.url!,
        playlistDescription: items![0].snippet?.description!,
        channelName: items![0].snippet?.channelTitle!,
      } as PlaylistInfo;
    })
    .catch(error => {
      console.log(error);
    });
};

const getPlaylistData = async (playlistId: string, pageToken: string) => {
  return await youtube.playlistItems
    .list({
      playlistId,
      part: ['snippet', 'id'],
      pageToken,
    })
    .then(async response => {
      const { pageInfo, prevPageToken, nextPageToken, items } = response.data;

      return {
        playlistMeta: pageInfo,
        nextPageToken: nextPageToken,
        prevPageToken: prevPageToken,
        videos: items?.map(video => {
          const { snippet } = video;
          let videoData = {
            id: snippet?.resourceId?.videoId,
            title: snippet?.title,
            thumbnail: snippet?.thumbnails?.default?.url,
          } as VideoModel;
          return videoData;
        })
      } as PlaylistData;
    })
    .catch(error => {
      return {
        message: 'There was an error',
        error,
      };
    });
};

//Get playlist items
export const getPlaylist = async (playlistId: string, pageToken: string) => {
  console.log(playlistId)

  let playlist = {} as Playlist;
  
  try {

    const playlistInfo = (await getPlaylistInfo(playlistId)) as PlaylistInfo;
    
    const playlistData = (await getPlaylistData(
      playlistId,
      pageToken,
    )) as PlaylistData;

    playlist = {
      playlistInfo,
      playlistData,
    };
    
    return playlist;
  } catch (error) {
    console.log(error.message);
  }
};
