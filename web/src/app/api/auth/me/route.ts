import { fetchUserFromSession } from "@/util/session";
import { cookies } from "next/headers";

export async function GET (request: Request){
        const cookieStore = await cookies()

        const sessionId = cookieStore.get("session_auth_key")
        const session = await fetchUserFromSession(sessionId?.value as string)
        if (!session) return Response.json({error:"You're not logged in"}, {status:401})
        return Response.json(session)
}