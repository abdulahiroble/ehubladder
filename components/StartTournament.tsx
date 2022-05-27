import React, { useRef, useState } from 'react'
import { useUser } from './../lib/firebase/useUser'
import { db } from './../lib/firebase/initFirebase'
import { doc, setDoc, collection, documentId, getDoc, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
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
import { useAuth } from '../lib/authContext'
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../lib/firebase/initFirebase";
import Select from 'react-select';
import axios from 'axios';
import { GetServerSideProps, GetStaticProps } from 'next'


const StartTournament = ({ tournaments }) => {

    const auth = getAuth()
    const [teamName, setTeamName] = useState<string>('')
    const [tournamentName, setTournamentName] = useState<string>('')
    const [tournamentId, setTournamentId] = useState<string>('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const { register, handleSubmit } = useForm();
    const [member, setMember] = useState<string>("")

    const tourneys = tournaments?.map((tournament) => {
        return {
            value: tournament.tournament.id,
            label: tournament.tournament.name
        }
    })

    const tournamentHandler = (event) => {
        const value = event.value
        const value2 = event.label
        setTournamentName(value2)
        setTournamentId(value)
    }

    const startTournament = async () => {

        try {

            axios.post('https://us-central1-ehubladder.cloudfunctions.net/startTournament', {
                tournamentId: `${tournamentId}`,
            })
                .then(async function (response) {
                    console.log(response);
                    console.log(tournamentId);

                })



            toast({
                title: "Success!",
                description: "You successfully started the tournament",
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
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                Start Tournament
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(startTournament)}> 
                    <ModalHeader fontWeight="bold">Start Tournament</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <FormControl mt={4}>
                            <FormLabel>Choose Tournament</FormLabel>
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
                            Start Tournament
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}

export default StartTournament;

