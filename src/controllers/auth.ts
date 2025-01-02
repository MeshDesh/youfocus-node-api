import { Request, Response } from 'express'
import * as database from '../database'
import firebase from '../database/DatabaseConfig'
import { OAuth2Client } from 'google-auth-library'
import configEnv from '../config'


const client = new OAuth2Client(configEnv.GOOGLE_CLIENT_ID)
export const googleAuth = async (request: Request, response: Response) => {
    const { token } = request.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: configEnv.GOOGLE_CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload()!;
    const userRef =  database.userDBRef.doc(email);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        try{
            await userRef.set({
                name,
                email,
                avatar: picture,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                userPlaylists: []
            })
            const user = await userRef.get()
            response.json({user: user.data(), firstLogin: true})
        }catch(error){
            console.log('error creating user', error)
        }
    }else{
        response.json(snapshot.data())
    }
}

