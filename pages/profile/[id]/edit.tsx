import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { useUser } from '../../../lib/firebase/useUser'
import { db, storage } from "../../../lib/firebase/initFirebase";
import Image from "next/image";
import "firebase/storage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const editProfile = (userDetail) => {
    const { user, logout } = useUser()
    const [imageUpload, setImageUpload] = useState(null);

    const handleUpload = () => {

        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/profilepic/${userDetail.userDetail.id}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded")

        })
    };




    getDownloadURL(ref(storage, `/images/profilepic/${userDetail.userDetail.id}`)).then(onResolve, onReject);

    function onResolve(url) {
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
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
            <div className="text-white">
                <div className="background">
                    <div className='grid grid-cols-6 mx-48 pt-20'>
                        <div className='col-span-2 bg-gray-800 pb-5 mb-10'>
                            <div className='text-center mx-14 py-5'>
                                <h2 className='text-3xl pb-3'>Profile Picture</h2>
                            </div>
                            <div className="flex justify-center">
                                <img className="rounded-full h-52 w-52 pb-5" id="myimg" />
                            </div>
                            <div className="grid grid-cols-3 mx-8">
                                <p className="col-span-3 pb-2 text-sm">User image:</p>
                                <input className="col-span-2 form-label inline-block mb-2 text-white" type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                <button className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow" onClick={handleUpload}>Upload </button>
                            </div>
                        </div>

                        <div className="col-span-4 bg-gray-800 pb-5 mb-10 mx-10">
                            <div className='text-center mx-14 py-5'>
                                <h2 className='text-3xl'>Login information</h2>
                                <div className='mt-5 text-xl text-center'>
                                    <form className="w-full ">
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">Email:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.email} aria-label="Full name" />
                                        </div>
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">Password:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="********" aria-label="Full name" />
                                        </div>
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">Retype password:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="********" aria-label="Full name" />
                                        </div>
                                    </form>
                                    <div className="flex flex-row-reverse mx-10 py-10">
                                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-10 rounded" type="button">
                                            Update login info
                                        </button>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 pb-5 mb-10 mx-10">
                        </div>

                        <div className="col-span-4 bg-gray-800 pb-5 mb-10 mx-10">
                            <div className='text-center mx-14 py-5'>
                                <h2 className='text-3xl'>User Info</h2>


                                <div className='mt-5 text-xl text-center'>

                                    <form className="w-full ">
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">Firstname:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.firstName} aria-label="Full name" />
                                        </div>
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">Lastname:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.lastName} aria-label="Full name" />
                                        </div>
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">GamerTag:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.gamerTag} aria-label="Full name" />
                                        </div>
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">SteamID:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.steamId} aria-label="Full name" />
                                        </div>
                                        <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                                            <label className="col-span-2 text-left">Rank:</label>
                                            <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.firstName} aria-label="Full name" />
                                        </div>
                                    </form>
                                    <div className="flex flex-row-reverse mx-10 py-10">
                                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-10 rounded" type="button">
                                            Update user info
                                        </button>
                                    </div>
                                </div>
                            </div>



                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default editProfile;



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

    return {
        props: {
            userDetail,
        },
        revalidate: 60,
    }

}