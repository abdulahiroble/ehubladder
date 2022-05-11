import { useDisclosure, useToast } from "@chakra-ui/react"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "../lib/firebase/initFirebase"


const EditTeamInformation = ({teamDetail}) => {
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
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={teamDetail.lowRank}
                        aria-label="Full name"
                        onChange={(e) => setLowRank(e.target.value)} />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Highest Rank:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={teamDetail.highRank}
                        aria-label="Full name"
                        onChange={(e) => setHighRank(e.target.value)} />
                   
                </div>
                <div className="flex flex-row-reverse mx-10 py-10">
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-10 rounded"
                        type="button"
                        onClick={editTeamDoc}>
                        Update team
                    </button>
                </div>
            </form>

        </div>


    )
}

export default EditTeamInformation