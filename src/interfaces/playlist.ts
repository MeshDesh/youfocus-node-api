export interface VideoModel {
    id: string,
    title: string,
    thumbnail: string
}

export interface Playlist{
    playlistInfo: PlaylistInfo,
    playlistData: PlaylistData
}



export interface PlaylistData {
    nextPageToken?: string,
    prevPageToken?: string,
    videos: Array<VideoModel>,
    channelName: string,
    playlistMeta: {
        totalResults: number,
    }
}

export interface PlaylistInfo{
    playlistId: string,
    playlistName: string,
    playlistItemCount: number,
    playlistDescription: string,
    playlistThumb: string,
    channelName: string
    recent?: boolean
}