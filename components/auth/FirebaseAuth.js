import {initFirebase} from '@/lib/firebase/initFirebase'
import {useEffect, useState} from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {
    getAuth,
    GoogleAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    EmailAuthProvider
} from "firebase/auth";
import {setUserCookie} from '@/lib/firebase/userCookies'
import {mapUserData} from '@/lib/firebase/mapUserData'
import {doc, setDoc, Timestamp, GeoPoint} from "firebase/firestore"
import {db} from '@/lib/firebase/initFirebase'
import {useUser} from '@/lib/firebase/useUser'

initFirebase() // initialize firebase

const auth = getAuth()

// const {user} = useUser()

const sendData = async () => {
    try {
        const userDoc = doc(db, "users", "test")
        await setDoc(userDoc, {
            string_data: 'Benjamin Carlson',
            number_data: 2,
            boolean_data: true,
            map_data: {stringInMap: 'Hi', numberInMap: 7},
            array_data: ['text', 4],
            null_data: null,
            time_stamp: Timestamp.fromDate(new Date('December 17, 1995 03:24:00')),
            geo_point: new GeoPoint(34.714322, -131.468435)
        })
        alert('Data was successfully sent to cloud firestore!')
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

const firebaseAuthConfig = {
    signInFlow: 'popup',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        // add additional auth flows below
        // GoogleAuthProvider.PROVIDER_ID,
        // TwitterAuthProvider.PROVIDER_ID,
        // GithubAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/',
    credentialHelper: 'none',
    callbacks: {
        signInSuccessWithAuthResult: async ({user}, redirectUrl) => {
            const userData = mapUserData(user)
            setUserCookie(userData)

        },
    },
}

const FirebaseAuth = () => {
    // Do not SSR FirebaseUI, because it is not supported.
    // https://github.com/firebase/firebaseui-web/issues/213
    const [renderAuth, setRenderAuth] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRenderAuth(true)
        }
    }, [])
    return (
        <div>
            {renderAuth ? (
                <StyledFirebaseAuth
                    uiConfig={firebaseAuthConfig}
                    firebaseAuth={auth}
                />
            ) : null}
        </div>
    )
}

export default FirebaseAuth