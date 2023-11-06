import Layout from '../components/layout'
import '../globals.css'
import localFont from "@next/font/local";



const bbfont = localFont({
  src: [
    {
      path: '../fonts/BBCasualPro-SemiNormal.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/BBCasualPro-Bold.otf',
      weight: '600',
      style: 'bold',
    }
  ],
})

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <div style={bbfont.style}>
      <Component {...pageProps} />
      </div>
    </Layout>
  )
}