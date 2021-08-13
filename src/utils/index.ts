import configEnv from "../config";

const {google} = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: configEnv.YOUTUBE_API_KEY
});

export const getPlaylist = async(playlistid) => {
    const playlist = await youtube.playlistItems.list({
          "maxResults": 50,
          "part": 'snippet, id',
          "playlistId": playlistid
    }).then(res => {
          return res.data;
    })
    .catch(error => {
        console.log(error);
        return [];
    });
  return playlist;
}

