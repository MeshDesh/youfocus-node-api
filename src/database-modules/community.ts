import { publicDBRef } from "../database/firestore"
import * as database from '../database'
import { PlaylistInfo } from "../interfaces"

export const addPlaylistToCommunity = async (playlistId: string, category: string) => {
    const playlistRef = database.publicDBRef.doc(playlistId)
    const snapshot = await playlistRef.get()

    if (!snapshot.exists) {
        try {
            await playlistRef.set({
                playlistId,
                category
            })
            return {
                message: 'Playlist Added to Community'
            }
        } catch (error) {
            return{
                error
            }
        }

    }
}

export const updatePublicPlaylist = async (playlistId: string, playlistInfo: PlaylistInfo) => {
    const publicPlaylist = publicDBRef.doc(playlistId)
    try {
        publicPlaylist.update({
            playlistInfo: playlistInfo
        })
        return {
            message: 'Playlist Updated'
        }    
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }
}