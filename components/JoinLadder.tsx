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

    const members = userDetailAll.map((user) => {
        return {
            value: user.gamerTag,
            label: user.steamId
        }
    }
    )

    const memberHandler = (event) => {
        const value = event.value
        setMember(value)
    }

    const joinLadder = async (teamDetail, tournaments) => {

        try {
            const myCollRef = collection(db, "tournaments");
            const myDocRef = doc(myCollRef);

            await setDoc(myDocRef, {
                teamName: teamName,
                tournamentName: tournamentName,
                id: tournamentId
            });

            toast({
                title: "Success!",
                description: "Your team has been created!",
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



    const tourneys = tournaments.map(tournament => (
        [
            {value: teamDetail.teamName, label: tournament.tournament.name},

        ]));


    const tournamentHandler = (event) => {
        const value = event.value
        setTeamName(value)
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
                <ModalContent as="form" onSubmit={handleSubmit(joinLadder)}>
                    <ModalHeader fontWeight="bold">Join Ladder</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <FormControl mt={4}>
                            <FormLabel>Choose Member</FormLabel>
                            <Select options={members} onChange={memberHandler}
                                formatOptionLabel={member => (
                                    <div>{member.value}</div>
                                )}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Choose Ladder</FormLabel>
                            <Select
                                options={tourneys}
                                onChange={tournamentHandler}
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


