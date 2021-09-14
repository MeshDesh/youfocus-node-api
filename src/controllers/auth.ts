import { request, response, Request, Response } from 'express'
import { userDBRef } from '../database'
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
    const userRef = userDBRef.doc(email);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const createdAt = new Date();
        try{
            await userRef.set({
                name,
                email,
                avatar: picture,
                createdAt
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

