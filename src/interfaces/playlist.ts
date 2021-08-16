export interface videoModel{
    id:string,
    title:string,
    channelName:string,
    thumbnailUrl:string,
}
export interface playlistModel{
    playlistId:string,
    nextPageToken?:string,
    prevPageToken?:string,
    items:Array<videoModel>,
    playlistMeta: Object
}