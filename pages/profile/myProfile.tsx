import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const myProfile = () => {
    <Head>USERNAME</Head>

    return (<>
        <div className='bg-black text-white'>
            <div className='profile-background'>
                <div className='pt-32 flex justify-start mx-96'>
                    <Image
                        src={"/images/user-profile.png"}
                        height={178}
                        width={178} />
                    <h1 className='text-white text-3xl pt-20 pl-10'>USERNAME</h1>
                </div>

                <div className='grid grid-cols-6 mx-32 mt-20'>
                    <div className='col-span-4 bg-gray-800 pb-5'>
                        <div className='flex justify-between mx-14 py-5'>
                            <h2 className='text-3xl'>Overview</h2>
                            <Link href="/editprofile" passHref>
                                <a
                                    className="inline-block text-sm px-8 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white font-bold">Edit profile</a>
                            </Link>
                        </div>

                        <div className='grid grid-cols-2 mt-5 text-xl text-center'>
                            <p className='pt-4'>Firstname</p>
                            <p className='pt-4'>Thomas</p>
                            <p className='pt-4'>Lastname</p>
                            <p className='pt-4'>West</p>
                            <p className='pt-4'>Gamer Tag</p>
                            <p className='pt-4'>SpAnkz</p>
                            <p className='pt-4'>SteamID</p>
                            <p className='pt-4'>STEAM_0:0:21977583</p>
                            <p className='pt-4'>Rank</p>
                            <div className='pt-2'>
                                <Image
                                    src={"/icons/faceit10.png"}
                                    height={50}
                                    width={50} />
                            </div>


                        </div>
                    </div>

                    <div className='col-span-2 bg-gray-800 mx-10 '>
                        <div className='flex spaxe-x-10 space-x-4 mx-5 py-5'>
                            <div>
                                <h3>Team Manager</h3>
                            </div>
                            <div className='pt-1 cursor-pointer'>
                                <Link href="/">
                                    <Image
                                        src={"/icons/redplus.png"}
                                        height={20}
                                        width={20} />
                                </Link>
                            </div>


                        </div>
                        <div className='flex space-x-7 mx-20'>
                            <div>
                                <Image
                                    src={"/icons/faceit10.png"}
                                    height={50}
                                    width={50} />
                            </div>
                            <div className='pt-4'>
                                <Link href="/">
                                    <a className='hover:underline'>Confectors</a>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </div>


    </>

    )
}

export default myProfile;