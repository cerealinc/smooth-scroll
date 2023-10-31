import './globals.css'
import localFont from "@next/font/local";

const bbfont = localFont({
  src: [
    {
      path: './fonts/BBCasualPro-SemiNormal.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/BBCasualPro-Bold.otf',
      weight: '600',
      style: 'bold',
    }
  ],
})

export const metadata = {
  title: 'ST.',
  description: 'STUDIO',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body style={bbfont.style}>{children}</body>
    </html>
  )
}
