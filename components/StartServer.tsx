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
import axios from "axios"
import Select from 'react-select';
import { getAuth } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"
import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { db } from "../lib/firebase/initFirebase"
import FormData from 'form-data';

const StartServer = ({ teamOneDetail, teamTwoDetail }) => {
    const auth = getAuth()
    const [mapOneName, setMapOneName] = useState<string>('')
    const [MapTwoName, setMapTwoName] = useState<string>('')
    const [mapOneStartingSide, setMapOneStartingSide] = useState<string>('')
    const [MapTwoStartingSide, setMapTwoStartingSide] = useState<string>('')
    const [disabled, setDisabled] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const { register, handleSubmit } = useForm();

    const startServer = async () => {

        try {

            const myCollRef = collection(db, "game-servers");

            const myDocRef = doc(myCollRef);



            axios.post('https://us-central1-ehubladder.cloudfunctions.net/dublicateServer')
                .then(async function (response) {

                    await setDoc(myDocRef, {
                        serverId: response.data.id,
                        ip: response.data.raw_ip,
                        gotv: response.data.ports.gotv,
                        id: myDocRef.id,
                        port: response.data.ports.game,
                    }, { merge: true });


                    axios.put('https://us-central1-ehubladder.cloudfunctions.net/updateServer', {
                        serverId: `${response.data.id}`,
                    }).then(async function(res) {
                        console.log(res);
                    })

                    axios.post('https://us-central1-ehubladder.cloudfunctions.net/startMatchSeries', {
                        serverId: `${response.data.id}`,
                        teamOneName: `${teamOneDetail[0].teamName}`,
                        teamTwoName: `${teamTwoDetail[0].teamName}`,                        
                        mapOne: `${mapOneName}`,
                        startCTMapOne: `${mapOneStartingSide}`,
                        mapTwo: `${MapTwoName}`,
                        startCTMapTwo: `${MapTwoStartingSide}`,

                    }).then(async function (response) {
                        console.log(response);
                    })

                })




            toast({
                title: "Success!",
                description: "You started the server",
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

        setDisabled(true);

    }


    const mapOneOptions = [
        { value: 'de_dust2', label: 'Dust 2' },
        { value: 'de_inferno', label: 'Inferno' },
        { value: 'de_mirage', label: 'Mirage' },
        { value: 'de_nuke', label: 'Nuke' },
        { value: 'de_overpass', label: 'Overpass' },
        { value: 'de_vertigo', label: 'Vertigo' },
        { value: 'de_ancient', label: 'Ancient' }
    ]

    const mapTwoOptions = [
        { value: 'de_dust2', label: 'Dust 2' },
        { value: 'de_inferno', label: 'Inferno' },
        { value: 'de_mirage', label: 'Mirage' },
        { value: 'de_nuke', label: 'Nuke' },
        { value: 'de_overpass', label: 'Overpass' },
        { value: 'de_vertigo', label: 'Vertigo' },
        { value: 'de_ancient', label: 'Ancient' }
    ]


    const teamStartOptions = [
        { value: 'team1', label: teamOneDetail[0].teamName },
        { value: 'team2', label: teamTwoDetail[0].teamName },
    ]



    const mapOneHandler = (event) => {
        const mapOneValue = event.value
        setMapOneName(mapOneValue)
    }

    const mapTwoHandler = (event) => {
        const mapTwoValue = event.value
        setMapTwoName(mapTwoValue)
    }

    
    const mapOneStartingSideHandler = (event) => {
        const mapOneStartingSide = event.value
        setMapOneStartingSide(mapOneStartingSide)
    }
    
    const mapTwoStartingSideHandler = (event) => {
        const mapTwoStartingSide = event.value
        setMapTwoStartingSide(mapTwoStartingSide)
    }

    
  





    return (
        <>
            <Button
                onClick={onOpen}
                disabled={disabled}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                Start Server
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(startServer)}>
                    <ModalHeader fontWeight="bold">Start Server</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>

                        <FormControl mt={4}>
                            <FormLabel>Start Match</FormLabel>
                            <FormLabel mt={4}>Map 1:</FormLabel>
                            <Select name="mapOne"
                                options={mapOneOptions}
                                onChange={mapOneHandler}
                            />
                            <FormLabel mt={4}>Team to start CT on map 1:</FormLabel>
                            <Select name="mapOne"
                                options={teamStartOptions}
                                onChange={mapOneStartingSideHandler}
                            />
                            <FormLabel mt={4}>Map 2:</FormLabel>
                            <Select name="mapTwo"
                                options={mapTwoOptions}
                                onChange={mapTwoHandler}
                            />
                            <FormLabel mt={4}>Team to start CT on map 2:</FormLabel>
                            <Select name="mapTwo"
                                options={teamStartOptions}
                                onChange={mapTwoStartingSideHandler}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button backgroundColor="#99FFFE" fontWeight="medium" type="submit">
                            Start Server
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    )
}

export default StartServer;