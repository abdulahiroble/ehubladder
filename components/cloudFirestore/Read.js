import {db} from '../../lib/firebase/initFirebase'
import {doc, getDoc} from "firebase/firestore"
import {useUser} from '../../lib/firebase/useUser'
import Button from 'react-bootstrap/Button'

const ReadDataFromCloudFirestore = () => {
    const {user} = useUser()
    const readData = async () => {
        try {
            const userDoc = doc(db, "users", user.id)
            await getDoc(userDoc).then((doc) => {
                if (doc.exists()) {
                    console.log(doc.data())

                    const snapshot = await db.collection('users').get();
                    snapshot.forEach((doc) => {
                        console.log(doc.id, '=>', doc.data());
                    });


                }
            })
            alert('Data was successfully fetched from cloud firestore! Close this alert and check console for output.')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div style={{margin: '5px 0'}}>
            <Button onClick={readData} style={{width: '100%'}}>Read Data From Cloud Firestore</Button>
        </div>
    )
}

export default ReadDataFromCloudFirestore