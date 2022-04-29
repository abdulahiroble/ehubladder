import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import FirebaseProvider from '../lib/authContext'
import '../lib/firebaseConfig/init'
import '../styles/globals.css'
import '../styles/profile.css'


function MyApp({ Component, pageProps }: AppProps) {
  return     <FirebaseProvider>
      <Layout> 
      <Component {...pageProps} />
  </Layout>
  </FirebaseProvider>
}
export default MyApp
