import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {GetStaticProps, GetStaticPaths} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {useUser} from '../../lib/firebase/useUser'
import CreateTeam from "../../components/CreateTeam";
import {db} from '../../lib/firebase/initFirebase'
import "firebase/storage";
import {storage} from "../../lib/firebase/initFirebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";


const myProfile = ({userDetail, teamDetail}) => {
    const {user, logout} = useUser()
    const [imageUpload, setImageUpload] = useState(null);

    const ShowEditProfile = () => {
        if (user) {
            if (user.id == userDetail.id) {
                return (
                    <Link href={`/profile/${userDetail.id}/edit`} passHref>
                        <a className="inline-block text-sm px-8 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white font-bold">Edit profile</a>
                    </Link>
                )
            }
        }

        return null;

    }


    const ShowAddTeam = () => {

        if (user) {
            if (user.id == userDetail.id) {
                return (
                    <CreateTeam />
                )
            }
        }

        return null;

    }




    getDownloadURL(ref(storage, `/images/profilepic/${userDetail.id}`)).then(onResolve, onReject);

    function onResolve(url) {
        if (typeof window !== "undefined") {
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
        }
    }

    function onReject(error) {
        console.log(error.code);

        getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
        });


    }


    return (
        <>
            <Head>{userDetail.gamerTag}</Head>

            <div className='text-white bg-black'>
                <div className='profile-background'>
                    <div className='pt-32 flex justify-start mx-96'>
                        <div className="wrapper">
                            <img className="rounded-full h-52 w-52 pb-5" id="myimg" />
                        </div>

                        <h1 className='text-white text-3xl pt-20 px-10'>{userDetail.gamerTag}</h1>
                        <h1 className='text-white text-3xl pt-20 px-10'>{teamDetail.teamName}</h1>
                    </div>



                    <div className='grid grid-cols-6 mx-32 mt-20'>
                        <div className='col-span-4 bg-gray-800 pb-5'>
                            <div className='flex justify-between mx-14 py-5'>
                                <h2 className='text-3xl'>Overview</h2>
                                <ShowEditProfile />
                            </div>

                            <div className='grid grid-cols-2 mt-5 text-xl text-center'>
                                <p className='pt-4'>Firstname</p>
                                <p className='pt-4'>{userDetail.firstName}</p>
                                <p className='pt-4'>Lastname</p>
                                <p className='pt-4'>{userDetail.lastName}</p>
                                <p className='pt-4'>GamerTag</p>
                                <p className='pt-4'>{userDetail.gamerTag}</p>
                                <p className='pt-4'>SteamID</p>
                                <p className='pt-4'>{userDetail.steamID}</p>
                                <p className='pt-4'>Rank</p>
                                <div className='pt-2'>
                                    <Image
                                        src={"/icons/faceit10.png"}
                                        height={50}
                                        width={50} />
                                </div>
                            </div>
                        </div>

                        <div className='col-span-2 bg-gray-800 mx-10 '>
                            <div className='flex spaxe-x-10 space-x-4 mx-5 py-5'>
                                <div>
                                    <h3>Team Manager</h3>
                                </div>
                                <ShowAddTeam />



                            </div>
                            <div className='flex space-x-7 mx-20'>
                                <div>
                                    <Image
                                        src={"/icons/faceit10.png"}
                                        height={50}
                                        width={50} />
                                </div>
                                <div className='pt-4'>
                                    <Link href="/">
                                        <a className='hover:underline'>Confectors</a>
                                    </Link>
                                </div>

                            </div>

                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default myProfile;


export const getStaticPaths: GetStaticPaths = async () => {

    const querySnapshot = await getDocs(collection(db, "users"));
    
    const paths = querySnapshot.docs.map((user) => {

        return {
            params: {
                id: user.id.toString()
            },
        };
    });

    return {
        paths,
        fallback: false,

    };
};


export const getStaticProps: GetStaticProps = async (context) => {

    const userDoc = doc(db, "users", context.params.id)
    const userDetail = await getDoc(userDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })



    const teamDoc = doc(db, "teams", "GLwJo5YQxrI0erBFOw4N")
    const teamDetail = await getDoc(teamDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })

    return {
        props: {
            userDetail,
            teamDetail,
        },
        revalidate: 60,
    }

}




