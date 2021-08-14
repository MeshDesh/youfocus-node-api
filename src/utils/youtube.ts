import configEnv from "../config";
const {google} = require('googleapis');

//youtube api config;
const youtube = google.youtube({
  version: 'v3',
  auth: configEnv.YOUTUBE_API_KEY
});

//extracting playlist id;
export const getPlaylistId = (url) => {
  var reg = new RegExp("[&?]list=([a-z0-9_]+)","i");
  var match = reg.exec(url);

  if (match&&match[1].length>0){
      return match[1];
  }else{
      return 0;
  }
}

//Get playlist items
export const getPlaylist = async(playlistid) => {
    return await youtube.playlistItems.list({
      "maxResults": 50,
      "part": 'snippet, id',
      "playlistId": playlistid
    }).then(res => {
      return res.data;
    }).catch((err) => {
        return{
            message: 'There was an error',
            err
        }
    })

}

