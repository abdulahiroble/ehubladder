import 'tailwindcss/tailwind.css'
// import type {AppProps} from 'next/app'
import Layout from '../components/layout'
import FirebaseProvider from '../lib/authContext'
import '../lib/firebase/initFirebase'
import React from 'react'
import '../styles/globals.css'
import '../styles/profile.css'


function MyApp({Component, pageProps}) {
  return <FirebaseProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </FirebaseProvider>
}
export default MyApp
