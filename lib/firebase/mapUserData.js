// import {doc, setDoc, Timestamp, GeoPoint} from "firebase/firestore"
// import {db} from './initFirebase'

export const mapUserData = async (user) => {
    // const {uid, email, gamerTag, firstName, lastName, steamId} = user

    // return {
    //     email
    // }

    const {uid, email, xa, displayName, photoUrl} = user

    return {
        id: uid,
        email,
        token: xa,
        name: displayName,
        profilePic: photoUrl
    }
}