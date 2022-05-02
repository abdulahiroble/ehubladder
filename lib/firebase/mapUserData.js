import {doc, setDoc, Timestamp, GeoPoint} from "firebase/firestore"
import {db} from './initFirebase'

export const mapUserData = async (user) => {
    const {uid, email, xa, displayName, photoUrl} = user

    // create user in db

    try {
        const userDoc = doc(db, "users", uid)

        await setDoc(userDoc, {
            name: displayName,
            email: email,
            id: uid,
        })

    } catch (error) {
        console.log(error)
        alert(error)
    }

    return {
        email,
        name: displayName,
    }
}