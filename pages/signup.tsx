import type {NextPage} from 'next'
import Head from 'next/head'
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useState} from 'react'
import {useAuth} from '../lib/authContext'
import React from 'react';
import {doc, setDoc, Timestamp, GeoPoint} from "firebase/firestore"
import {db} from '../lib/firebase/initFirebase'

const Home: NextPage = () => {
    const {user, loading} = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstname] = useState<string>('')
    const [lastName, setLastname] = useState<string>('')
    const [gamerTag, setGamerTag] = useState<string>('')
    const [steamId, setSteamId] = useState<string>('')


    if (loading) return null

    if (user) return <h1>U already logged</h1>

    const createUser = async (user: any) => {
        const {uid, email, xa, displayName, photoUrl} = user

        // create user in db
        try {
            const userDoc = doc(db, "users", uid)
            await setDoc(userDoc, {
                name: firstName,
                lastName: lastName,
                gamerTag: gamerTag,
                steamId: steamId,
                email: email,
                id: uid,
            })

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    const auth = getAuth()

    function createUserCredentials() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log('success', user)

                // create user in db
                createUser(user)


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', errorMessage)
                window.alert(errorMessage)
                // ..
            });
    }


    function loginWithGoogle() {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('sign with google', user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>

            <div className="m-auto my-24 w-1/3 h-1/3 divide-y-4 space-y-1">
                <div className="space-y-1">
                    <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} className="border border-current	" /><br />
                    <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} className="border border-current	" /><br />
                    <input type="text" placeholder='first name' onChange={(e) => setFirstname(e.target.value)} className="border border-current	" /><br />
                    <input type="text" placeholder='last name' onChange={(e) => setLastname(e.target.value)} className="border border-current	" /><br />
                    <input type="text" placeholder='gamer tag' onChange={(e) => setGamerTag(e.target.value)} className="border border-current	" /><br />
                    <input type="text" placeholder='steam id' onChange={(e) => setSteamId(e.target.value)} className="border border-current	" /><br />
                    <button onClick={createUserCredentials}>Signup</button>
                </div>
                <div>
                    <button onClick={() => loginWithGoogle()}>Login with Google</button>
                </div>
            </div>
        </>
    )
}

export default Home
