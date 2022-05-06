import React, {useRef, useState} from 'react'
import {useUser} from './../lib/firebase/useUser'
import {db} from './../lib/firebase/initFirebase'
import {doc, setDoc} from 'firebase/firestore'
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
// import { useForm } from "react-hook-form";

const CreateTeam = () => {
  const auth = getAuth()
  const {user, logout} = useUser()
  const [teamName, setTeamName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [game, setGame] = useState<string>('')
  const [lowRank, setLowRank] = useState<string>('')

  const {isOpen, onOpen, onClose} = useDisclosure()
  const toast = useToast()
  const initialRef = useRef()
  const {register, handleSubmit} = useForm();

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
    </Button><Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
        <ModalOverlay />
        <ModalContent as="form" onSubmit="#">
          <ModalHeader fontWeight="bold">Create Team</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Team Name</FormLabel>
              <Input ref={initialRef} placeholder="Team Name" name="name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Country</FormLabel>
              <Input placeholder="Country" name="url" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Game</FormLabel>
              <Input placeholder="Game" name="url" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Lowrank</FormLabel>
              <Input placeholder="Lowrank" name="url" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>Annuller</Button>
            <Button backgroundColor="#99FFFE" fontWeight="medium" type="submit">
              Skab
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal></>
  )
}

export default CreateTeam


