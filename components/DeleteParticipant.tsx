import { useDisclosure, useToast } from "@chakra-ui/react"
import axios from "axios"
import { getAuth } from "firebase/auth"
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { db } from "../lib/firebase/initFirebase"



const DeleteParticipant = ({ tournament }) => {
    const auth = getAuth()
    const [participantId, setParticipantId] = useState<string>('')
    const [tournamentId, setTournamentId] = useState<string>('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const { register, handleSubmit } = useForm();
    const deleteParticipant = async () => {

        try {

            const participantDoc = doc(db, "participants", tournament.id)

            await deleteDoc(participantDoc)



            setTournamentId(tournament.tournamentId)
            setParticipantId(tournament.participantid)

            console.log(tournament)




            axios.delete('https://us-central1-ehubladder.cloudfunctions.net/deleteParticipant', {
                data: {
                    participantId: `${tournament.participantid}`,
                    tournamentId: `${tournament.tournamentId}`,
                }
            })
                .then(async function (response) {
                    console.log(response);
                    console.log(tournamentId);

                })



            toast({
                title: "Success!",
                description: "Your team successfully left the tournament",
                status: "success",
                duration: 5000,
                isClosable: true,
            })


            onClose()

        } catch (error) {

            console.log(error)

            toast({
                title: "Error!",
                description: "Something went wrong :(",
                status: "error",
                duration: 5000,
                isClosable: true,
            })

            onClose()

        }

    }





    return (

        <>
            <button onClick={handleSubmit(deleteParticipant)}>
                <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" fill="#c0392b" transform="translate(0 1029.4)" /><path d="m22 12c0 5.523-4.477 10-10 10-5.5228 0-10-4.477-10-10 0-5.5228 4.4772-10 10-10 5.523 0 10 4.4772 10 10z" fill="#e74c3c" transform="translate(0 1028.4)" /><path d="m6 1039.4h12v4h-12z" fill="#c0392b" /><path d="m6 1039.4h12v3h-12z" fill="#ecf0f1" /></g></svg>
            </button>
        </>
    )
}

export default DeleteParticipant;