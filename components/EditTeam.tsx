import { useDisclosure, useToast } from "@chakra-ui/react"
import { doc, setDoc, deleteDoc, collection, getDocs, query, where, deleteField, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import { useState } from "react"
import { db, storage } from "../lib/firebase/initFirebase"
import Select from 'react-select';
import { useRouter } from "next/router"
import context from "react-bootstrap/esm/AccordionContext"
import { QuerySnapshot } from "firebase-admin/firestore"
import { getAuth } from "firebase/auth"


const EditTeamInformation = ({ teamDetail }) => {
    const router = useRouter();
    const auth = getAuth()
    const [country, setCountry] = useState<string>('')
    const [game, setGame] = useState<string>('')
    const [highRank, setHighRank] = useState<string>('')
    const [lowRank, setLowRank] = useState<string>('')
    const [teamName, setTeamName] = useState<string>('')
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const editTeamDoc = async (user: any) => {

        try {
            const TeamDoc = doc(db, "teams", teamDetail.id)
            await setDoc(TeamDoc, {
                country: country,
                game: game,
                highRank: highRank,
                lowRank: lowRank,
                teamName: teamName,
                id: teamDetail.id,
                owner: auth.currentUser.uid,
            })
            toast({
                title: "Success!",
                description: "Your profile has been updated!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            onClose()



        } catch (error) {
            console.log(error)

            toast({
                title: "Error!",
                description: "Something went wrong :(",
                status: "error",
                duration: 3000,
                isClosable: true,
            })

            onClose()


        }
        router.push(`/teams/${teamDetail.id}`)
        console.log(window.location.href)

    }

    getDownloadURL(ref(storage, `/images/ranks/faceit10.png`)).then(url => {
        console.log(url)

        return url
    });


    const ranks = [
        { value: "faceit1.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit1.png?alt=media&token=0ab5dd1a-5833-46d7-8b2e-29d5fba193d3" },
        { value: "faceit2.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit2.png?alt=media&token=00b9e38e-4467-42f4-a880-41854c1fceae" },
        { value: "faceit3.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit3.png?alt=media&token=a20b8bab-e961-46e2-ac57-a55a2b5a5e0b" },
        { value: "faceit4.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit4.png?alt=media&token=e4b220b9-f881-426d-8be4-942872b2a9d6" },
        { value: "faceit5.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit5.png?alt=media&token=40cedbd1-2bb9-4ad3-9e4e-0b05ede1abf5" },
        { value: "faceit6.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit6.png?alt=media&token=7213062c-2db9-47a6-84af-ca0aa20d0782" },
        { value: "faceit7.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit7.png?alt=media&token=c8dfd06d-d083-4798-984e-e28f1a0b5335" },
        { value: "faceit8.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit8.png?alt=media&token=1fd2dce3-7261-46c2-8a6d-2ee0963f9595" },
        { value: "faceit9.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit9.png?alt=media&token=952626a6-4e7d-4bc5-87b2-4d67985a4b3c" },
        { value: "faceit10.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit10.png?alt=media&token=27ca1c97-0758-489e-8e2d-023bef010874" },

    ];



    const lowRankHandler = (event) => {
        const value = event.value
        setLowRank(value)
    }

    const highRankHandler = (event) => {
        const value = event.value
        setHighRank(value)
    }

    const deleteTeamDoc = async () => {

        try {
            const TeamDoc = doc(db, "teams", teamDetail.id)
            const q = query(collection(db, "users"), where("team", "==", teamDetail.id));
            const userDocs = await getDocs(q);

            // await updateDoc(userDocs, {
            //     team: deleteField()
            // });


            await deleteDoc(TeamDoc)
            toast({
                title: "Success!",
                description: "Your team has been deleted!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })

            onClose()

            router.push("/")

        } catch (error) {
            console.log(error)

            toast({
                title: "Error!",
                description: "Something went wrong :(",
                status: "error",
                duration: 3000,
                isClosable: true,
            })

            onClose()


        }



    }


    return (

        <div className='mt-5 text-xl text-center'>

            <form className="w-full ">
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Team name:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text" placeholder={teamDetail.teamName}
                        aria-label="Full name"
                        onChange={(e) => setTeamName(e.target.value)} />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Country:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={teamDetail.country}
                        aria-label="Full name"
                        onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Game:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={teamDetail.game}
                        aria-label="Full name"
                        onChange={(e) => setGame(e.target.value)} />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Lowest Rank:</label>
                    <Select
                        options={ranks}
                        onChange={lowRankHandler}
                        placeholder={teamDetail.lowRank}
                        formatOptionLabel={rank => (

                            <div>
                                <img src={rank.image} className="w-20 mx-auto" />
                            </div>
                        )}
                    />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Highest Rank:</label>
                    <Select
                        options={ranks}
                        onChange={highRankHandler}
                        placeholder={teamDetail.highRank}
                        formatOptionLabel={rank => (
                            <div>
                                <img src={rank.image} className="w-20 mx-auto" />
                            </div>
                        )}
                    />
                </div>
                <div className="flex flex-row-reverse mx-10 py-10">
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-10 rounded"
                        type="button"
                        onClick={editTeamDoc}>
                        Update team
                    </button>
                </div>
                <div className="flex justify-center mx-10 py-10">
                    <button
                        className="flex-shrink-0 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-2 px-10 rounded"
                        type="button"
                        onClick={() => {
                            const confirmBox = window.confirm(
                                "Do you really want to delete this Team?"
                            )
                            if (confirmBox === true) {
                                deleteTeamDoc()
                            }
                        }}

                    >
                        Delete team
                    </button>
                </div>
            </form>

        </div>


    )
}

export default EditTeamInformation