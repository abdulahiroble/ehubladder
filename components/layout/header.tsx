import {useAuth, signOut} from '../../lib/authContext'
import Link from 'next/link'
import React, {useState} from 'react'
import {Transition} from "@headlessui/react"
import Image from 'next/image'

const Header = (props: any) => {
    const [isOpen, setIsOpen] = useState(false)
    // const {user, loading} = useAuth()
    return (
        <nav className="lg:bg-opacity-50 bg-black p-2 lg:p-3 text-white lg:fixed w-full z-10 lg:h-20">
            {/* Desktop Navigation */}
            <div className="hidden lg:block flex items-center justify-between flex-wrap">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <Link href="/" passHref>
                        <a>
                            <Image
                                src={'/images/ehub-logo-large.webp'}
                                alt={`ehub-logo`}
                                width={125}
                                height={50}
                            />
                        </a>
                    </Link>
                    <div className="lg:flex-grow ml-12">
                        <Link href="/" passHref>
                            <a className="inline-block mt-0 hover:text-white mr-10 font-bold">Home</a>
                        </Link>
                        <Link href="/about" passHref>
                            <a className="inline-block mt-0 hover:text-white mr-10 font-bold">Ladders</a>
                        </Link>
                        <Link href="/academy" passHref>
                            <a className="inline-block mt-0 hover:text-white mr-10 font-bold">Cups</a>
                        </Link>
                        <Link href="/academy" passHref>
                            <a className="inline-block mt-0 hover:text-white font-bold">Profile</a>
                        </Link>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            {/* Mobile Navigation starts */}
            <div className="block lg:hidden">
                <div className="flex justify-between">
                    <Image
                        src={'/images/ehub-logo-large.webp'}
                        alt={`ehub-logo`}
                        width={100}
                        height={50}
                    />
                    <button onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        aria-controls="mobile"
                        aria-expanded="false"
                        className='bg-black inline-flex items-center justify-center p-2 mr-2 rounded-md text-white'
                    >
                        <span className='sr-only'>Open main menu</span>
                        {!isOpen ? (
                            <svg
                                className='block h-6 w-6'
                                xmlns="http:www.w3.org/2000/svg"
                                fill="none" viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden="true">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 18h16"
                                />
                            </svg>
                        ) : (
                            <svg
                                className='block h-6 w-6'
                                xmlns="http:www.w3.org/2000/svg"
                                fill="none"
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden="true">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}

                    </button>
                </div>
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opcaity-100 scale-100"
                    leave='transition ease-in duration-75 transform'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                >
                    {(ref) => (
                        <div className='lg:hidden id=mobile-menu w-full'>
                            <div ref={ref} className="bg-black px-2 pt-2 pb-3 sm:px-3 w-full">
                                <Link href="/" passHref >
                                    <a onClick={() => setIsOpen(!isOpen)} className="text-white cursor-pointer hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-semibold">Home</a>
                                </Link>

                                <Link href="/about" passHref>
                                    <a onClick={() => setIsOpen(!isOpen)} className="text-white cursor-pointer hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-semibold">Ladders</a>
                                </Link>

                                <Link href="/academy" passHref>
                                    <a onClick={() => setIsOpen(!isOpen)} className="text-white cursor-pointer hover:text-black hover:bg-white block px-3 py-2 rounded-md text-base font-semibold">Cups</a>
                                </Link>
                                <Link href="/academy" passHref>
                                    <a onClick={() => setIsOpen(!isOpen)} className="text-white cursor-pointer hover:text-black hover:bg-white block px-3 py-2 rounded-md text-base font-semibold">Profile</a>
                                </Link>
                                <Link href="/signin" passHref>
                                    <a onClick={() => setIsOpen(!isOpen)} className="inline-block text-sm px-8 py-3 leading-none border rounded text-white text-center border-white mt-6 w-full">Sign in</a>
                                </Link>
                            </div>
                        </div>
                    )}

                </Transition>
            </div>
        </nav>

    )
}

export default Header;

// export default function Header(props: any) {
//     const { user, loading } = useAuth()

//     return <div className="flex h-full flex-row">

//         <div className="flex-1 my-auto">
//             <Link href='/'>
//                 <button >Home</button>
//             </Link>
//         </div>

//         <div className="m-auto space-x-2">

//             {!user && !loading ?
//                 <>
//                     <Link href='/signup'><button className="m-auto"> Signup</button></Link>

//                     <Link href='/signin'><button className="m-auto"> Signin</button></Link>
//                 </>
//                 : null}
//             {user ? <>

//                 <Link href='/privatessr'><button > PrivateSSR</button></Link>

//                 <Link href='/private'><button > Private</button></Link>

//                 <button onClick={signOut}> Signout</button>

//             </> : null}

//         </div>
//     </div>
// }