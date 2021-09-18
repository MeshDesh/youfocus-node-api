import { userDBRef } from "../database/firestore"
import { onboardingData, PlaylistInfo, user } from "../interfaces"
import firebase from '../database/DatabaseConfig'

export const addOnboardingData = async (user: user, onboardingData: onboardingData) => {
    return await userDBRef.doc(user.email).update({
        ...user,
        onboardingData
    }).then(() => {
        return {
            message: 'Onboarding Done!'
        }
    }).catch((error) => {
        console.log(error.message)
    })
}

export const addPlaylistToUser = async (user: user, playlist: PlaylistInfo) => {
    try {
        const userData = await userDBRef.doc(user.email).get();
        const playlists = userData.data()?.userPlaylists
        const playlistFound = playlists.find(({playlistId}) => playlistId === playlist.playlistId)
        if(playlists.length === 0 || !playlistFound){
            await userDBRef.doc(user.email).update({
                ...user,
                userPlaylists: firebase.firestore.FieldValue.arrayUnion(playlist)
            })
        } 
        return {
            message: 'Playlist Added to User'
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchUserPlaylists = async (user: user) => {
    try {
        const userData = await userDBRef.doc(user.email).get();
        const playlists = userData.data()?.userPlaylists
        return playlists
    } catch (error) {
        console.log(error)
    }
}


export const removePlaylistFromUser = async (user: user, id: string) => {
    try {
        const userData = await userDBRef.doc(user.email).get();
        const playlists = userData.data()?.userPlaylists
        const playlistFound = playlists.find(({ playlistId }) => playlistId === id)
        await userDBRef.doc(user.email).update({
            ...user,
            userPlaylists: firebase.firestore.FieldValue.arrayRemove(playlistFound)
        })
        return {
            message: 'Playlist Added to User'
        }
    } catch (error) {
        console.log(error)
    }
}

