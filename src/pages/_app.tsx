import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Background from 'components/background/Background';
import Layout from 'components/layout/Layout';
import Navbar from 'constant/navbar';
import Footer from 'constant/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Background />
      <Navbar/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer/>
    </>
  )
}

export default MyApp
