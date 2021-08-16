export const errorResponse = (statusCode:number = 404, message:string = '') => {
    return {
        statusCode,
        message
    }
}

export const successResponse = (payload:object = {}) => {
    return payload
}