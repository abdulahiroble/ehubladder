import {getDocs, collection, doc, getDoc, query, where} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import {GetStaticPaths, GetStaticProps} from "next";
import {Head} from "next/document";
import Link from "next/link";
import AddMembers from "../../components/AddMembers";
import {db, storage} from "../../lib/firebase/initFirebase";
import {useUser} from "../../lib/firebase/useUser";

const TeamPage = ({teamDetail, userDetail, userDetailAll}) => {
    const {user, logout} = useUser()


    // getDownloadURL(ref(storage, `/images/profilepic/${userDetail.id}`)).then(onResolve, onReject);

    // function onResolve(url) {
    //     const img = document.getElementById('profilepic');
    //     img.setAttribute('src', url);
    // }

    // function onReject(error) {
    //     console.log(error.code);

    //     getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
    //         const img = document.getElementById('profilepic');
    //         img.setAttribute('src', url);
    //     });
    // }




    getDownloadURL(ref(storage, `/images/ranks/${teamDetail.lowRank}`)).then(url => {
        const lowRankImg = document.getElementById('lowfaceit')
        lowRankImg.setAttribute('src', url)

    })

    getDownloadURL(ref(storage, `/images/ranks/${teamDetail.highRank}`)).then(url => {
        const highRankImg = document.getElementById('highfaceit')
        highRankImg.setAttribute('src', url)

    })



    const ShowEditTeam = () => {
        if (user) {
            if (user.id == teamDetail.owner) {
                return (
                    <div className="flex justify-end mx-48 -my-28">
                        <Link href={`/profile/edit`} passHref>
                            <a className="inline-block text-sm px-8 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white font-bold">
                                Edit team
                            </a>
                        </Link>
                    </div>
                )
            }
        }
        return null

    }

    return (
        <>
            <div className='text-white bg-black w-full'>
                <div className='team-background'>
                    <div className='py-32 flex px-96 w-full'>
                        <img className="rounded-full h-52 w-52 pb-5" id="myimg" />
                        <h1 className='text-white text-3xl pt-20 px-10'>{teamDetail.teamName} -</h1>
                        <h1 className='text-white text-3xl pt-20'>{teamDetail.country}</h1>

                    </div>

                    <div className="flex space-x-9 px-96">
                        <img className="rounded-full h-16 w-12 pb-5" id="lowfaceit" />
                        <p className="py-3">-</p>
                        <img className="rounded-full h-16 w-12 pb-5" id="highfaceit" />
                    </div>



                    <ShowEditTeam />

                    <div className="grid grid-cols-8 my-14">
                        <div className="col-span-5 bg-gray-800 mx-20">
                            <h2 className="text-3xl mx-10 mt-5 mb-3">Upcoming Matches</h2>
                            <div className="col-span-8 border-b-4 border-white mb-2" />

                            <div className="text-center">
                                <div className="grid grid-cols-6 mx-2">

                                    <p>Date</p>
                                    <p>Starttime</p>
                                    <p>Type</p>
                                    <p>Maps</p>
                                    <p>Opponent</p>
                                    <p>Match Room</p>
                                    <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                                </div>

                                <div className="grid grid-cols-6 mx-2 py-2">

                                    <p>01 May</p>
                                    <p>20:00</p>
                                    <p>BO2</p>
                                    <p>Inferno, Mirage</p>
                                    <p>FaZe Clan</p>
                                    <p>Link</p>
                                    <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                                </div>

                            </div>

                        </div>

                        <div className="col-span-3 bg-gray-800 mx-10">
                            <div className="mx-10">
                                <h2 className="text-3xl my-5">Members</h2>
                                <AddMembers userDetailAll={userDetailAll} />
                                <div className="grid grid-cols-4">

                                    <div className="py-5">
                                        {userDetail.map((user) => {

                                            getDownloadURL(ref(storage, `/images/profilepic/${user.id}`)).then(onResolve, onReject);

                                            function onResolve(url) {
                                                if (typeof window !== "undefined") {
                                                    const profileImg = document.getElementById('profileimg');
                                                    profileImg.setAttribute('src', url);
                                                }
                                            }

                                            function onReject(error) {
                                                console.log(error.code);

                                                getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
                                                    const profileImg = document.getElementById('profileimg');
                                                    profileImg.setAttribute('src', url);
                                                });


                                            }




                                            return (
                                                <div className="flex space-x-2 py-2">
                                                    <img className="rounded-full h-16 w-16" id="profileimg" />
                                                    <Link href={`/profile/${user.id}`}>
                                                        <a className="pt-5 px-4">{user.gamerTag}</a>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>


                                </div>
                            </div>


                        </div>

                        <div className="col-span-5 bg-gray-800 mx-20 my-20">
                            <h2 className="text-3xl mx-10 mt-5 mb-3">Match History</h2>
                            <div className="col-span-8 border-b-4 border-white mb-2" />

                            <div className="text-center">
                                <div className="grid grid-cols-6 mx-2">

                                    <p>Date</p>
                                    <p>Team</p>
                                    <p>Type</p>
                                    <p>Opponent</p>
                                    <p>Score</p>
                                    <p>Match Room</p>
                                    <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                                </div>

                                <div className="grid grid-cols-6 mx-2 py-2">

                                    <p>01 May</p>
                                    <p>Confectors</p>
                                    <p>BO2</p>
                                    <p>FaZe Clan</p>
                                    <p>2-0</p>
                                    <p>Link</p>
                                    <div className="col-span-6 -mx-2 border-b py-1 border-inherit" />
                                </div>

                            </div>

                        </div>



                    </div>


                </div>
            </div>
        </>

    )
}

export default TeamPage

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

    const id = context.params.id;

    const teamDoc = doc(db, "teams", id);



    const teamDetail = await getDoc(teamDoc).then((doc) => {
        if (doc.exists()) {

            const data = doc.data()

            return data
        }

    })


    const q = query(collection(db, "users"), where("team", "==", context.params.id));

    const userDocs = await getDocs(q);

    const userDetail = userDocs.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()


            return data

        }
    })

    const userQ = query(collection(db, "users"), where("team", "!=", context.params.id));

    const userDocsAll = await getDocs(userQ);

    const userDetailAll = userDocsAll.docs.map((doc) => {
        if (doc.exists()) {

            const data = doc.data()


            return data

        }
    })


    return {
        props: {
            teamDetail,
            userDetail,
            userDetailAll
        },
        revalidate: 60,
    }

}