import { Response } from 'express';

export const errorResponse = (statusCode:number, message:string, response: Response) => {
    response.status(statusCode).json({status: false, error: message})
}

export const successResponse = (payload:object = {},response: Response) => {
    response.status(200).json({status: true, payload})
}