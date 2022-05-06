import {initializeApp, applicationDefault, cert} from 'firebase-admin/app'
import {getFirestore, Timestamp, FieldValue} from 'firebase-admin/firestore'
import {db} from '../lib/firebase/initFirebase';
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
} from '@chakra-ui/react'


import {collection, getDocs} from "firebase/firestore";
import React from 'react';




async function myFunc() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const obj = {name: 'Daniel', age: 40, occupation: 'Engineer', level: 4};


    querySnapshot.forEach((user) => {
        const userid = [user.id]
        console.log(`${user.id} => ${user.data()}`);
        // console.log(Object.values(user.data()))
        console.log(userid)
    });
}
function BasicUsage() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const initialRef = React.useRef()
    const finalRef = React.useRef()
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
                <ModalContent as="form" onSubmit="#">
                    <ModalHeader fontWeight="bold">Tilføj Side</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Navn</FormLabel>
                            <Input ref={initialRef} placeholder="Min side" name="name" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input placeholder="example.com" name="url" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Annuller</Button>
                        <Button backgroundColor="#99FFFE" fontWeight="medium" type="submit">
                            Skab
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BasicUsage;