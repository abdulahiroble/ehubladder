import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
import { db } from '../lib/firebase/initFirebase';


import { collection, getDocs } from "firebase/firestore"; 




async function myFunc() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const obj = { name: 'Daniel', age: 40, occupation: 'Engineer', level: 4 };

   
    querySnapshot.forEach((user) => {
        const userid = [user.id]
      console.log(`${user.id} => ${user.data()}`);
      // console.log(Object.values(user.data()))
      console.log(userid)
    });
}

const test = () => {

    myFunc();

    return (<>




    </>)

}

export default test;