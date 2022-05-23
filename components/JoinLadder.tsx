import React, {useRef, useState} from 'react'
import {useUser} from './../lib/firebase/useUser'
import {db} from './../lib/firebase/initFirebase'
import {doc, setDoc, collection, documentId, getDoc} from 'firebase/firestore'
import {getAuth} from '@firebase/auth'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from '@chakra-ui/react'
import {useAuth} from '../lib/authContext'
import {useForm} from "react-hook-form";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../lib/firebase/initFirebase";
import Select from 'react-select';
import axios from 'axios';
import {GetServerSideProps} from 'next'


const JoinLadder = ({tournaments, teamDetail, userDetailAll, id}) => {
    const auth = getAuth()
    const [teamName, setTeamName] = useState<string>('')
    const [tournamentName, setTournamentName] = useState<string>('')
    const [tournamentId, setTournamentId] = useState<string>('')

    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const {register, handleSubmit} = useForm();
    const [member, setMember] = useState<string>("")

    // console.log(teamDetail.teamName)

    const addParticipant = async () => { 

        try {

            const myDocRef = doc(db, "tournaments", tournamentName.toString());

            axios.post('https://us-central1-ehubladder.cloudfunctions.net/addParticipant', {
                name: `addsdda`,
              })
              .then(function (response) {
                console.log(response);
              })

              await setDoc(myDocRef, {
                teamName: teamDetail.teamName,
                tournamentId: tournamentName,
                tournamentName: tournamentId,
            }, {merge: true});

            toast({
                title: "Success!",
                description: "You successfully joined the tournament",
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


    const tourneys = tournaments.map((tournament) => {
        return {
            value: tournament.tournament.id,
            label: tournament.tournament.name
        }
    }

    )



    const tournamentHandler = (event) => {
        const value = event.value
        const value2 = event.label
        setTournamentName(value)
        setTournamentId(value2)
    }


    return (
        <>
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{bg: 'gray.700'}}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                +
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(addParticipant)}>
                    <ModalHeader fontWeight="bold">Join Ladder</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <FormControl mt={4}>
                            <FormLabel>Choose Ladder</FormLabel>
                            <Select name="tournament"
                                options={tourneys}
                                onChange={tournamentHandler}
                                formatOptionLabel={tourney => (
                                    <div>{tourney.label}</div>
                                )}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button backgroundColor="#99FFFE" fontWeight="medium" type="submit">
                            Join Ladder
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default JoinLadder


