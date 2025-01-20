// app/page.tsx
import { getServerSession } from 'next-auth'
import Chat from './chat'

export default async function Page() {

    const session = await getServerSession()

    return <Chat user={session.user} />
}