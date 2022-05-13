import type {NextPage} from 'next'
import Head from 'next/head'
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useState} from 'react'
import {useAuth} from '../lib/authContext'
import React from 'react';
import {doc, setDoc, Timestamp, GeoPoint} from "firebase/firestore"
import {db} from '../lib/firebase/initFirebase'
import ReadDataFromCloudFirestore from '../components/cloudFirestore/Read';

const Home: NextPage = () => {
    const {user, loading} = useAuth()
    const auth = getAuth();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstname] = useState<string>('')
    const [lastName, setLastname] = useState<string>('')
    const [gamerTag, setGamerTag] = useState<string>('')
    const [steamId, setSteamId] = useState<string>('')
    


    if (loading) return null

    if (user) return <>
        <div>U already logged</div>
    </>

    const createUser = async (user: any) => {
        // const {uid, email} = user

        // create user in db
        try {
            const userDoc = doc(db, "users", user.uid)
            await setDoc(userDoc, {
                firstName: firstName,
                lastName: lastName,
                gamerTag: gamerTag,
                steamId: steamId,
                email: email,
                id: user.uid,
            })
            console.log('success', user)

        } catch (error) {
            console.log(error)
            alert(error)
        }
    }



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


    // function loginWithGoogle() {
    //     const googleProvider = new GoogleAuthProvider();

    //     signInWithPopup(auth, googleProvider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             // const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             console.log('sign with google', user)
    //             // ...
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.email;
    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             // ...
    //         });
    // }

    return (
        <>
            <Head>
                <title>Signup</title>
            </Head>

            {/* <div className="m-auto my-24 w-1/3 h-1/3 divide-y-4 space-y-1">
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
            </div> */}


            <div className="flex items-center min-h-screen background">
                <div className="flex-1 h-full max-w-7xl mx-auto bg-white rounded-lg shadow-xl">
                    <div className="flex flex-col md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img className="object-cover w-full h-full" src="./images/signupimg.png"
                                alt="img" />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">

                                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                    Sign up
                                </h1>
                                <div>
                                    <label className="block text-sm">
                                        Email
                                    </label>
                                    <input type="email"
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm">
                                        Password
                                    </label>
                                    <input type="password"
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mt-4 text-sm">
                                        Firstname
                                    </label>
                                    <input
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Firstname"
                                        type="text"
                                        onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mt-4 text-sm">
                                        Lastname
                                    </label>
                                    <input
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Lastname"
                                        type="text"
                                        onChange={(e) => setLastname(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mt-4 text-sm">
                                        GamerTag
                                    </label>
                                    <input
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="GamerTag"
                                        type="text"
                                        onChange={(e) => setGamerTag(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block mt-4 text-sm">
                                        GamerTag
                                    </label>
                                    <input
                                        className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="STEAM_1:1:21977583"
                                        type="text"
                                        onChange={(e) => setSteamId(e.target.value)} />
                                </div>





                                <button
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                    onClick={createUserCredentials} >
                                    Sign up
                                </button>

                                <div className="mt-4 text-center">
                                    <p className="text-sm">Don't have an account yet? <a href="#"
                                        className="text-blue-600 hover:underline"> Sign up.</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Home
