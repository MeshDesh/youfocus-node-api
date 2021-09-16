import { userDBRef } from "../database/firestore"
import { onboardingData, Playlist, user } from "../interfaces"
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

export const addPlaylistToUser = async(user: user, playlist: Playlist) => {
    return await userDBRef.doc(user.email).update({
        ...user,
        userPlaylists: firebase.firestore.FieldValue.arrayUnion(playlist) 
    }).then(() => {
        return {
            message: 'Playlist Added to User'
        }
    }).catch((error) => {
        console.log(error.message)
    })
}