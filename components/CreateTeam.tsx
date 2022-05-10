import React, {useRef, useState} from 'react'
import {useUser} from './../lib/firebase/useUser'
import {db} from './../lib/firebase/initFirebase'
import {doc, setDoc, collection, documentId} from 'firebase/firestore'
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
  Select,
} from '@chakra-ui/react'
import {useAuth} from '../lib/authContext'
import {useForm} from "react-hook-form";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../lib/firebase/initFirebase";

const CreateTeam = () => {
  const auth = getAuth()
  const [teamName, setTeamName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [game, setGame] = useState<string>('')
  const [lowRank, setLowRank] = useState<string>("")

  const {isOpen, onOpen, onClose} = useDisclosure()
  const toast = useToast()
  const initialRef = useRef()
  const {register, handleSubmit} = useForm();

  const createTeam = async (url) => {

    try {
      const myCollRef = collection(db, "teams");
      const myDocRef = doc(myCollRef);

      await setDoc(myDocRef, {
        teamName: teamName,
        country: country,
        game: game,
        lowRank: lowRank,
        owner: auth.currentUser.uid
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

    getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    });



  }

  return (
    <><Button
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
        <ModalContent as="form" onSubmit={handleSubmit(createTeam)}>
          <ModalHeader fontWeight="bold">Create Team</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Team Name</FormLabel>
              <Input placeholder="Team Name" name="teamName" onChange={(e) => setTeamName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input placeholder="Country" name="country" onChange={(e) => setCountry(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Game</FormLabel>
              <Input placeholder="Game" name="game" onChange={(e) => setGame(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Lowrank</FormLabel>
              <Select placeholder='Select Rank' onChange={((e) => setLowRank(e.target.value))}>
                <option value="hello">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </Select>
              {/* <Input placeholder="Lowrank" name="lowrank" onChange={(e) => setLowRank(e.target.value)} /> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Cancel</Button>
            <Button backgroundColor="#99FFFE" fontWeight="medium" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>
  )
}

export default CreateTeam


