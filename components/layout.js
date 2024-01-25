
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
export default function Layout({ children }) {

  return (
    <div style={bbfont.style}>
          {children}
          </div>

  )
}
