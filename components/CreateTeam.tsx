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
} from '@chakra-ui/react'
import {useAuth} from '../lib/authContext'
import {useForm} from "react-hook-form";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../lib/firebase/initFirebase";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';


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


  }

  if (auth.currentUser) {
    getDownloadURL(ref(storage, `/images/profilepic/user-placeholder.png`)).then(url => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    });
  }


  const countries = [
    {value: "cat", label: "Cat", image: "https://placekitten.com/200/300"},
    {value: "cat2", label: "Dog", image: "https://placekitten.com/200/400"},
  ];


  const handler = (event) => {
    const value = event.value
    setLowRank(value)
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
              <Select options={countries} onChange={handler}
                formatOptionLabel={country => (
                  <div className="country-option">
                    <img src={country.image} alt="country-image" />
                  </div>
                )}
              />
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


