import Layout from "@/components/layout"
import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {
  const { data: session } = useSession()

  return(
    <Layout>
      <div className="flex items-center gap-2">
       
        <div>
          Hello, {session?.user?.name}
        </div> 
        <button className="rounded-full overflow-clip w-8 ml-auto relative">
          <img src={session?.user?.image} alt="" className="w-full object-cover"/>
          <div></div>
        </button>
      </div>
    </Layout>
  )
}
