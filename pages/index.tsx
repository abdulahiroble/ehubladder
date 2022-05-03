import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WriteToCloudFirestore from '../components/cloudFirestore/Write'
import {useUser} from '../lib/firebase/useUser'
// import UploadFile from '../components/storage/UploadFile'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import type {NextPage} from 'next'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className='hidden md:block '>
                <video
                    className='heroVideo'
                    autoPlay
                    muted
                    loop >
                    <source src="/videos/CMSVideo.mp4" type="video/mp4" />

                </video>
                <div className='flex justify-center'>
                    <Link href="https://app.ehub.gg/">
                        <a>
                            <button className="
                        lg:ml-20
                        lg:-mt-32
                        md:-mt-20
                        md:ml-12
                        absolute
                        transition-colors duration-150 
                        w-2/6
                        bg-transparent 
                        text-lg 
                        hover:bg-gray-100 
                        text-gray-100 
                        font-semibold 
                        hover:text-gray-900 
                        py-2 
                        px-4 
                        border border-gray-100 
                        hover:border-transparent
                        rounded">
                                GO TO PLATFORM
                            </button>
                        </a>
                    </Link>
                </div>
            </div>

            <div className='block md:hidden'>
                <video
                    autoPlay
                    muted
                    loop >
                    <source src="/videos/CMSVideo1-1.mp4" type="video/mp4" />

                </video>
            </div>
    </>
  )
}

export default Home
