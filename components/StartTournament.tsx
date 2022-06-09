import React, {useRef, useState} from 'react'
import {useUser} from './../lib/firebase/useUser'
import {db} from './../lib/firebase/initFirebase'
import {doc, setDoc, collection, documentId, getDoc, getDocs, query, where, writeBatch} from 'firebase/firestore'
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
import {GetServerSideProps, GetStaticProps} from 'next'
import {responseSymbol} from 'next/dist/server/web/spec-compliant/fetch-event'


const StartTournament = ({tournaments}) => {

    const auth = getAuth()
    const [teamName, setTeamName] = useState<string>('')
    const [tournamentName, setTournamentName] = useState<string>('')
    const [tournamentId, setTournamentId] = useState<string>('')

    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const {register, handleSubmit} = useForm();
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
        const batch = writeBatch(db);




        try {

            axios.post('https://us-central1-ehubladder.cloudfunctions.net/startTournament', {
                tournamentId: `${tournamentId}`,
            })
                .then(async function (response) {
                    // console.log(response);
                    // console.log(tournamentId);


                    response.data.tournament.matches.map(async (match) => {
                        const myCollRef = collection(db, "matches");
                        const myDocRef = doc(myCollRef);

                        await batch.set(myDocRef, {
                            player1_id: match.match.player1_id,
                            player2_id: match.match.player2_id,
                            round: match.match.round,
                            id: myDocRef.id,
                            matchid: match.match.id,
                            started_at: match.match.started_at,
                            state: match.match.state,
                            tournament_id: match.match.tournament_id,
                            match_series_id: ""
                        });
                    })

                    await batch.commit();




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
                _hover={{bg: 'gray.700'}}
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

