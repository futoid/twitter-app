
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import LoginModal from '../components/Modals/LoginModal';
import RegisterModal from '../components/Modals/RegisterModal';
import '../styles/globals.css';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <RegisterModal/>
    <LoginModal/>
    <Layout > 
      <Component {...pageProps} />
    </Layout>
    </>
  )
}

export default MyApp;
