import Layout from '../components/layout'
import '../globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <div>
      <Component {...pageProps} />
      </div>
    </Layout>
  )
}