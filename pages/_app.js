import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import 'react-loading-skeleton/dist/skeleton.css'

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}
