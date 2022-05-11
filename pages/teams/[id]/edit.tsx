import { getDocs, collection, doc, getDoc, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { db, storage } from "../../../lib/firebase/initFirebase";
import { useUser } from "../../../lib/firebase/useUser";
import EditTeamInformation from "../../../components/EditTeam";

const EditTeam = ({teamDetail, userDetail}) => {
    const { user, logout } = useUser()
    const [imageUpload, setImageUpload] = useState(null);
    
    
    const handleUpload = () => {

        if (imageUpload == null) return;

        const imageRef = ref(storage, `/images/teams/logo/${teamDetail.id}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded")

        })
    };

    
    getDownloadURL(ref(storage, `/images/teams/logo/${teamDetail.id}`)).then(onResolve, onReject);

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


    if (user) {
        if (user.id == teamDetail.owner) {
            return (
                <>
                    <div className="text-white">
                        <div className="background">
                            <div className='grid grid-cols-6 mx-48 pt-20'>
                                <div className='col-span-2 bg-gray-800 pb-5 mb-10'>
                                    <div className='text-center mx-14 py-5'>
                                        <h2 className='text-3xl pb-3'>Team Logo</h2>
                                    </div>
                                    <div className="flex justify-center">
                                        <img className="rounded-full h-52 w-52 pb-5" id="myimg" />
                                    </div>
                                    <div className="grid grid-cols-3 mx-8">
                                        <p className="col-span-3 pb-2 text-sm">Team logo:</p>
                                        <input className="col-span-2 form-label inline-block mb-2 text-white" type="file" onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                                        <button className="col-span-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow" onClick={handleUpload}>Upload </button>
                                    </div>
                                </div>

                                <div className="col-span-4 bg-gray-800 pb-5 mb-10 mx-10">
                                    <div className='text-center mx-14 py-5'>
                                        <h2 className='text-3xl'>Team information</h2>
                                        <EditTeamInformation 
                                        teamDetail={teamDetail} />
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


export default EditTeam


export const getStaticPaths: GetStaticPaths = async () => {

    const querySnapshot = await getDocs(collection(db, "teams"));

    const paths = querySnapshot.docs.map((team) => {

        return {
            params: {
                id: team.id.toString()
            },
        };
    });

    return {
        paths,
        fallback: false,

    };
};


export const getStaticProps: GetStaticProps = async (context) => {

    const teamDoc = doc(db, "teams", context.params.id)
    const teamDetail = await getDoc(teamDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })


    return {
        props: {
            teamDetail,
        },
        revalidate: 60,
    }

}