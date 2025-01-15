import { removeSession } from "@/util/session";
import { cookies } from "next/headers";

export async function GET (request: Request){
    const cookieStore = await cookies()
    const val = cookieStore.get("session_auth_key")?.value

    const loggedout = await removeSession(val as string)

    if (!loggedout) return Response.json({error:"Internal server error"}, {status:500})
        cookieStore.delete('auth_session_key')
        return Response.json({status:true})
}