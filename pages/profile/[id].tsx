import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ReadDataFromCloudFirestore from '../../components/cloudFirestore/Read'
import { useUser } from '../../lib/firebase/useUser'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import * as firebase from 'firebase/app'
import { db } from '../../lib/firebase/initFirebase'





const myProfile = ({ userDetail }) => {
    const { user, logout } = useUser()
    // const firestore = firebase.firestore()
    // const colRef = collection(db, "users")
    // console.log(colRef)



    return (

        <>
            <Head>{userDetail.gamerTag}</Head>

            <div className='bg-black text-white'>
                <div className='profile-background'>
                    <div className='pt-32 flex justify-start mx-96'>
                        <Image
                            src={"/images/user-profile.png"}
                            height={178}
                            width={178} />
                        <h1 className='text-white text-3xl pt-20 pl-10'>{userDetail.gamerTag}</h1>
                    </div>

                    <div className='grid grid-cols-6 mx-32 mt-20'>
                        <div className='col-span-4 bg-gray-800 pb-5'>
                            <div className='flex justify-between mx-14 py-5'>
                                <h2 className='text-3xl'>Overview</h2>
                                <Link href="/editprofile" passHref>
                                    <a
                                        className="inline-block text-sm px-8 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white font-bold">Edit profile</a>
                                </Link>
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
                                <div className='pt-1 cursor-pointer'>
                                    <Link href="/">
                                        <Image
                                            src={"/icons/redplus.png"}
                                            height={20}
                                            width={20} />
                                    </Link>
                                </div>


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

    );
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

    console.log(paths)

    return {
        paths,
        fallback: false,

    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const userDoc = doc(db, "users", "zfurlNRT0jcj4FDXZsDNKNKFu1U2")
    const userDetail = await getDoc(userDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })

    return {
        props: {
            userDetail,
        },
        revalidate: 60,
    }

}




