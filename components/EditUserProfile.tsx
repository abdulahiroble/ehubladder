import { useToast, useDisclosure } from "@chakra-ui/react";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { useState } from "react";


const EditUserProfile = (userDetail: any) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const auth = getAuth()
    const loggedInUser = auth.currentUser;




    const updateLoginInformation = async (user: any) => {


        try {
            updateEmail(loggedInUser, email).then(() => {
                // Email updated!
                // ...
            }).catch((error) => {
                // An error occurred
                // ...
            });

            updatePassword(loggedInUser, password).then(() => {
                // Update successful.
            }).catch((error) => {
                // An error ocurred
                // ...
            });

            toast({
                title: "Success!",
                description: "Your profile has been updated!",
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

    return (
        <div className='mt-5 text-xl text-center'>
            <form className="w-full ">
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder={userDetail.userDetail.email} aria-label="Full name" />
                </div>
                <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Password:</label>
                    <input
                        className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="password"
                        placeholder="********"
                        aria-label="Full name"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                {/* <div className="flex items-center border-b border-white py-2 mx-10 grid grid-cols-4">
                    <label className="col-span-2 text-left">Retype password:</label>
                    <input className="col-span-2 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="password" placeholder="********" aria-label="Full name" />
                </div> */}
                <div className="flex flex-row-reverse mx-10 py-10">
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-10 rounded"
                        type="button"
                        onClick={updateLoginInformation}>
                        Update login info
                    </button>
                </div>
            </form>



        </div>

    )


}

export default EditUserProfile

