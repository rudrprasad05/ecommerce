import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const admin = process.env.NEXT_PUBLIC_EMAILS.split(',')

export const authOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        session: ({session, token, user}) => {
            if(admin.includes(session?.user?.email)){
                return session

            }
            else{
                return false;
            }
        },
    }
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res){
    const session = await getServerSession(req, res, authOptions)
    if(!admin.includes(session?.user?.email)){
        throw "Not Admin"
    }

}