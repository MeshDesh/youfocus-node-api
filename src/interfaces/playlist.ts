export interface VideoModel{
    id: string | null | undefined,
    title: string | null | undefined,
    thumbnail: Object | null | undefined,
}

export interface PlaylistModel{
    playlistId:string,
    nextPageToken?:string,
    prevPageToken?:string,
    items:Array<VideoModel>,
    channelName:string,
    playlistMeta: {
        totalResults: number,
        resultsPerPage: number
    }
}