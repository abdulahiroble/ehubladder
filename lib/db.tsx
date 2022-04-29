import firebase from "./firebaseConfig/init-admin"
import '@firebase/firestore'

const firestore = firebase.firestore();

export function createUser(uid: string, data: any) {
    return firestore
        .collection("users")
        .doc(uid)
        .set({uid, ...data}, {merge: true});
}