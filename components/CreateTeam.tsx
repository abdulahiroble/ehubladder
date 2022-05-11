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
  const [highRank, setHighRank] = useState<string>("")

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
        highRank: highRank,
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

  getDownloadURL(ref(storage, `/images/ranks/faceit10.png`)).then(url => {
    console.log(url)

    return url
  });


  const ranks = [
    {value: "faceit1.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit1.png?alt=media&token=0ab5dd1a-5833-46d7-8b2e-29d5fba193d3"},
    {value: "faceit2.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit2.png?alt=media&token=00b9e38e-4467-42f4-a880-41854c1fceae"},
    {value: "faceit3.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit3.png?alt=media&token=a20b8bab-e961-46e2-ac57-a55a2b5a5e0b"},
    {value: "faceit4.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit4.png?alt=media&token=e4b220b9-f881-426d-8be4-942872b2a9d6"},
    {value: "faceit5.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit5.png?alt=media&token=40cedbd1-2bb9-4ad3-9e4e-0b05ede1abf5"},
    {value: "faceit6.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit6.png?alt=media&token=7213062c-2db9-47a6-84af-ca0aa20d0782"},
    {value: "faceit7.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit7.png?alt=media&token=c8dfd06d-d083-4798-984e-e28f1a0b5335"},
    {value: "faceit8.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit8.png?alt=media&token=1fd2dce3-7261-46c2-8a6d-2ee0963f9595"},
    {value: "faceit9.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit9.png?alt=media&token=952626a6-4e7d-4bc5-87b2-4d67985a4b3c"},
    {value: "faceit10.png", image: "https://firebasestorage.googleapis.com/v0/b/ehubladder.appspot.com/o/images%2Franks%2Ffaceit10.png?alt=media&token=27ca1c97-0758-489e-8e2d-023bef010874"},

  ];

  const lowRankHandler = (event) => {
    const value = event.value
    setLowRank(value)
  }

  const highRankHandler = (event) => {
    const value = event.value
    setHighRank(value)
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
              <Select options={ranks} onChange={lowRankHandler}
                formatOptionLabel={rank => (
                  <div>
                    <img src={rank.image} className="w-20 mx-auto" />
                  </div>
                )}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Highrank</FormLabel>
              <Select options={ranks} onChange={highRankHandler}
                formatOptionLabel={rank => (
                  <div>
                    <img src={rank.image} className="w-20 mx-auto" />
                  </div>
                )}
              />
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


