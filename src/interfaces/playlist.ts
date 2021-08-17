export interface VideoModel {
    id: string,
    title: string,
    thumbnail: {
        url: string,
        width: number,
        height: number
    }
}

export interface PlaylistModel {
    playlistId: string,
    nextPageToken?: string,
    prevPageToken?: string,
    items: Array<VideoModel>,
    channelName: string,
    playlistMeta: {
        totalResults: number,
        resultsPerPage: number
    }
}