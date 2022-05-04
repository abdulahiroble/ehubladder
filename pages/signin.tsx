import type {NextPage} from 'next'
import Head from 'next/head'
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useState} from 'react'
import {useAuth} from '../lib/authContext'
import ReadDataFromCloudFirestore from '../components/cloudFirestore/Read';
import {useUser} from '../lib/firebase/useUser';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {user, loading} = useAuth()
  const {singleUser, logout} = useUser()

  if (loading) return null

  if (user) {
    return (
      <div className='p-64'>
        <ReadDataFromCloudFirestore />
      </div>
    )
  }

  // if (users) {
  //   return (
  //     <div className='p-64'>
  //       <ReadDataFromCloudFirestore />
  //     </div>
  //   )
  // }

  const auth = getAuth()

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('success', user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error', errorMessage)
        window.alert(errorMessage)
      });
  }

  function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('sign with google', user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="background h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0 py-14">
          <div className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0 loginform">
            <div className="flex flex-col w-full md:w-1/2 p-4">
              <div className="flex flex-col flex-1 justify-center mb-8">
                <h1 className="text-4xl text-center font-thin">Welcome Back</h1>
                <div className="w-full mt-4">
                  <form className="form-horizontal w-3/4 mx-auto" method="POST" action="#">
                    <div className="flex flex-col mt-4">
                      <input id="email" onChange={(e) => setEmail(e.target.value)} type="text" className="flex-grow h-8 px-2 border rounded border-grey-400" name="email" placeholder="Email" />
                    </div>
                    <div className="flex flex-col mt-4">
                      <input id="password" onChange={(e) => setPassword(e.target.value)} type="password" className="flex-grow h-8 px-2 rounded border border-grey-400" name="password" required placeholder="Password" />
                    </div>
                    <div className="flex flex-col mt-8">
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">
                        Login
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-4">
                    <a className="no-underline hover:underline text-blue-dark text-xs" href="{{ route('password.request') }}">
                      Forgot Your Password?
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 rounded-r-lg loginbackground"></div>
          </div>
        </div>
<<<<<<< HEAD
  {/* <div>
          <button onClick={() => loginWithGoogle()}>Login with Google</button>
        </div> */}

=======
>>>>>>> 262caefafcbf15ce0999900f8d4934065ca4ed0b
      </div >





    </>
  )
}

export default Home
