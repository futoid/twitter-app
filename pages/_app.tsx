
import Layout from '../components/Layout';
import LoginModal from '../components/Modals/LoginModal';
import RegisterModal from '../components/Modals/RegisterModal';
import '../styles/globals.css';
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
        <Toaster/>
        <RegisterModal />
        <LoginModal />
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
  )
}

export default MyApp;
