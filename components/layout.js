import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"


export default function Layout({children}) {
  const { data: session } = useSession()

//   if(!session) {
//     return (
//       <>
//         <div className="w-screen h-screen grid items-center">
//           <button onClick={() => signIn("google")} className="bg-blue-500 rounded-lg text-white mx-auto px-5 py-2">Login with google</button>
//         </div>
//       </>
//     )
//   }

  return (
    <>
      <div className="flex h-screen w-screen">
        <Nav/>
        <div className="grow bg-white text-black px-8 py-5">
          {children}
        </div>
      </div>
    </>
  )
  
}
