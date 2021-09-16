import configEnv from '../config';
import {
  Playlist,
  PlaylistData,
  PlaylistInfo,
  VideoModel,
} from '../interfaces';
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: configEnv.YOUTUBE_API_KEY,
});

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
        playlistThumb: items![0].snippet?.thumbnails?.default?.url!,
        playlistDescription: items![0].snippet?.description!,
        channelName: items![0].snippet?.channelTitle!,
      } as PlaylistInfo;
    })
    .catch(error => {
      return {
        message: 'There was an error',
        error,
      };
    });
};

const getPlaylistData = async (playlistId: string, pageToken: string) => {
  return await youtube.playlistItems
    .list({
      maxResults:25,
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
      playlistInfo:
      {
        ...playlistInfo,
        playlistItemCount: playlistData.playlistMeta.totalResults
      },
      playlistData,
    };

    return playlist;
  } catch (error) {
    return {
      error,
      message: 'Playlist not found'
    }
  }
};
