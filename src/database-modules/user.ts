import { userDBRef } from "../database/firestore"
import { onboardingData, user } from "../interfaces"

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
