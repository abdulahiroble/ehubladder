import {useDisclosure, useToast} from "@chakra-ui/react"
import {doc, setDoc, updateDoc} from "firebase/firestore"
import {useState} from "react"
import {db} from "../lib/firebase/initFirebase"


const EditUserInformation = (userDetail) => {
    const [firstName, setFirstname] = useState(userDetail.userDetail.firstName || "");
    const [lastName, setLastname] = useState(userDetail.userDetail.lastName || "");
    const [gamerTag, setGamerTag] = useState(userDetail.userDetail.gamerTag || "");
    const [steamId, setSteamId] = useState(userDetail.userDetail.steamId || "");
    const [email, setEmail] = useState("");
    const toast = useToast()
    const {isOpen, onOpen, onClose} = useDisclosure()

    const editUserDoc = async (user: any) => {

        try {
            const userDoc = doc(db, "users", userDetail.userDetail.id)

            await updateDoc(userDoc, {
                firstName: firstName,
                lastName: lastName,
                gamerTag: gamerTag,
                steamId: steamId,
                email: email,
                id: userDetail.userDetail.id,
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
                    <label className="col-span-2 text-left">Firstname:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        aria-label="Full name"
                        placeholder={userDetail.userDetail.firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                        defaultValue={userDetail.userDetail.firstName}
                    />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Lastname:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={userDetail.userDetail.lastName}
                        aria-label="Full name"
                        defaultValue={userDetail.userDetail.lastName}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">GamerTag:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={userDetail.userDetail.gamerTag}
                        aria-label="Full name"
                        defaultValue={userDetail.userDetail.gamerTag}
                        onChange={(e) => setGamerTag(e.target.value)} />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">SteamID:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder={userDetail.userDetail.steamId}
                        aria-label="Full name"
                        defaultValue={userDetail.userDetail.steamId}
                        onChange={(e) => setSteamId(e.target.value)}
                    />
                </div>
                <div className="flex flex-row-reverse mx-10 py-10">
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-10 rounded"
                        type="button"
                        onClick={editUserDoc}>
                        Update user info
                    </button>
                </div>
            </form>

        </div>


    )
}

export default EditUserInformation