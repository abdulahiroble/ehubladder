import React, {useRef, useState} from 'react'
import {useUser} from './../lib/firebase/useUser'
import {db} from './../lib/firebase/initFirebase'
import {doc, setDoc, collection, documentId, getDoc, getDocs, query, where} from 'firebase/firestore'
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
import {useForm} from "react-hook-form";
import Select from 'react-select';
import {GetStaticProps} from 'next'

const AddMembers = ({userDetailAll}) => {
    const auth = getAuth()
    const [player, setPlayer] = useState<string>('')

    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const initialRef = useRef()
    const {register, handleSubmit} = useForm();
    const [member, setMember] = useState<string>("")

    const addTeamMember = async () => {

        try {
            const myCollRefTeams = doc(db, "teams", "XpVs0rVyRf9QltlSv62J");

            const myUserRef = doc(db, 'users', auth.currentUser.uid)

            await setDoc(myCollRefTeams, {
                player1: member,
            }, {merge: true});

            await setDoc(myUserRef, {
                team: myCollRefTeams.id
            }, {merge: true});

            toast({
                title: "Success!",
                description: "Your team member has been added!",
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

    console.log(userDetailAll)


    const members = userDetailAll.map((user) => {
        return {
            value: user.gamerTag,
            label: user.gamerTag
        }
    }
    )

    const memberHandler = (event) => {
        const value = event.value
        setMember(value)
    }

    return (
        <div>
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
                <ModalContent as="form" onSubmit={handleSubmit(addTeamMember)}>
                    <ModalHeader fontWeight="bold">Add Team Members!</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Members</FormLabel>
                            <Select options={members} onChange={memberHandler}
                                formatOptionLabel={member => (
                                    <div>{member.value}</div>
                                )}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button color={"#fff"} backgroundColor="#066F01" fontWeight="medium" type="submit">
                            Add member
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default AddMembers