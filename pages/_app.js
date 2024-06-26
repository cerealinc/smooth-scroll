import Layout from '../components/layout'
import '../globals.css'
import 'react/jsx-dev-runtime';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}