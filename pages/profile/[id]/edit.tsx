import {collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import {GetStaticPaths, GetStaticProps} from "next";
import {useUser} from '../../../lib/firebase/useUser'
import {db, storage} from "../../../lib/firebase/initFirebase";
import "firebase/storage";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import EditUserProfile from "../../../components/EditUserProfile";
import {useState} from "react";
import EditUserInformation from "../../../components/EditUserInformation";




const editProfile = (userDetail) => {
    const {user, logout} = useUser()
    const [imageUpload, setImageUpload] = useState(null);


    const ShowEditLogin = () => {

        if (user) {
            if (user.id == userDetail.userDetail.id) {
                return (
                    <EditUserProfile
                        key={userDetail.userDetail.id}
                        userDetail={userDetail.userDetail} />
                )
            }
        }

        return null;

    }

    const ShowProfileInfo = () => {

        if (user) {
            if (user.id == userDetail.userDetail.id) {
                return (
                    <EditUserInformation
                        key={userDetail.userDetail.id}
                        userDetail={userDetail.userDetail} />
                )
            }
        }

        return null;

    }



    const handleUpload = () => {

        if (imageUpload == null) return;

        const imageRef = ref(storage, `/images/profilepic/${userDetail.userDetail.id}`);
        uploadBytes(imageRef, imageUpload).then(async () => {

            getDownloadURL(ref(storage, `/images/profilepic/${userDetail.userDetail.id}`))
                .then(async (url) => {
                    // `url` is the download URL for 'images/stars.jpg'
                    const userDoc = doc(db, "users", userDetail.userDetail.id)
                    await setDoc(userDoc, {
                        profilePic: url
                    }, {merge: true})

                    alert("image uploaded")

                })
                .catch((error) => {
                    // Handle any errors
                    console.log(error)

                    getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
                        const teamImg = document.getElementById('teamlogo');
                        teamImg?.setAttribute('src', url);
                    });
                });


        })
    };




    getDownloadURL(ref(storage, `/images/profilepic/${userDetail.userDetail.id}`)).then(onResolve, onReject);

    function onResolve(url) {
        const img = document.getElementById('myimg');
        img?.setAttribute('src', url);
    }

    function onReject(error) {
        console.log(error.code);

        getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
            const img = document.getElementById('myimg');
            img?.setAttribute('src', url);
        });
    }


    if (user) {
        if (user.id == userDetail.userDetail.id) {
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
                                        <input className="col-span-2 form-label inline-block mb-2 text-white" type="file" onChange={(event) => {setImageUpload(event.target.files[0])}} />
                                        <button className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow" onClick={handleUpload}>Upload </button>
                                    </div>
                                </div>

                                <div className="col-span-4 bg-gray-800 pb-5 mb-10 mx-10">
                                    <div className='text-center mx-14 py-5'>
                                        <h2 className='text-3xl'>Login information</h2>
                                        <ShowEditLogin />
                                    </div>
                                </div>
                                <div className="col-span-2 pb-5 mb-10 mx-10">
                                </div>

                                <div className="col-span-4 bg-gray-800 pb-5 mb-10 mx-10">
                                    <div className='text-center mx-14 py-5'>
                                        <h2 className='text-3xl'>User Info</h2>
                                        <ShowProfileInfo />
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </>
            )


        }
        else return (
            <>
                <div>
                    <h1>Permission denied</h1>
                </div>
            </>
        )
    }
    else return (
        <>
            <div>
                <h1>Permission denied</h1>
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
        fallback: 'blocking',

    };
};


export const getStaticProps: GetStaticProps = async (context) => {

    const userDoc = doc(db, "users", context.params.id as string)
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
        revalidate: 10,
    }

}