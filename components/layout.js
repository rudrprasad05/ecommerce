import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"
import Head from 'next/head'
import { Offline, Online } from "react-detect-offline";
import {HiWifi} from 'react-icons/hi2'


export default function Layout({children, title}) {
  const { data: session } = useSession()

  if(!session) {
    return (
      <>
        <div className="w-screen h-screen grid items-center">
          <button onClick={() => signIn("google")} className="bg-blue-500 rounded-lg text-white mx-auto px-5 py-2">Login with google</button>
        </div>
      </>
    )
  }

  return (
    <>
      
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex min-h-screen w-screen">
        <Nav/>

        
        <div className="grow bg-white text-black px-8 py-5">
          {children}
        </div>
        

        {/* <Offline>
          <div className="grow bg-white text-black px-8 py-5 grid items-center">
            <div className="text-center">
              <div>
                <HiWifi size={65} className={"mx-auto"} strokeWidth={0.01}/>
              </div>
              <div>
                You are Offline. Check your Wifi connection
              </div>
            </div>
          </div>
        </Offline> */}
        
      </div>
    </>
  )
  
}
