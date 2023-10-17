import Layout from "@/components/layout"
import Nav from "@/components/Nav"
import UserButton from "@/components/userButton"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



export default function Home() {
  const { data: session } = useSession()
  const [showLogoutDiv, setshowLogoutDiv] = useState("hidden")

  const showLogout = () => {
    setshowLogoutDiv("flex")
    console.log("first")
  }

  return(
    <Layout title={"Welcome | Dashboard"}>
      <div className="flex items-center gap-2 relative">
       
        <div className="flex gap-1">
          <span>Hello, </span><span>{session?.user?.name || <Skeleton/>}</span> 
        </div> 

        <div className="ml-auto flex items-center gap-3 justify-center">

          

        </div>
        
       

        
        
      </div>
    </Layout>
  )
}
