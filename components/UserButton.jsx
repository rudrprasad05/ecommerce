import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const UserButton = () => {
    const { data: session } = useSession()
    return (
        <>
            <div>

                <button className="rounded-full overflow-clip w-8 relative my-auto">
                    <img src={session?.user?.image} alt="" className="w-full object-cover"/>
                </button>

        
            </div>
            
        </>
    ) 
}

export default UserButton