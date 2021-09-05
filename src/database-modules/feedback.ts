import { feedbackDBRef } from "../database/firestore"
import { feedbackModel } from "../interfaces"

export const addFeedbackToDatabase = async (feedbackData: feedbackModel): Promise<object> => {
    return await feedbackDBRef.add({ ...feedbackData })
        .then(() => {
            return {
                message: 'Feedback received. Thank you for using Youfocus!'
            }
        }).catch((error) => {
            return {
                error
            }
        })
}