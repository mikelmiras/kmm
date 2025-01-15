import { db } from "@/db"
import { sessionsTable, usersTable } from "@/db/schema";
import { eq, gt, and } from "drizzle-orm";

export const fetchUserFromSession = async (session_id:string) => {
    try {
        const s = (await db.select().from(sessionsTable).where(and(eq(sessionsTable.token, session_id), gt(sessionsTable.expires_at, new Date()))).limit(1))[0]
        if (!s) return undefined

        const u = (await db.select({id:usersTable.id, email:usersTable.email, name:usersTable.name}).from(usersTable).where(eq(s.userid as any, usersTable.id)).limit(1))[0]

        if (!u) return undefined

        return u
    } catch(e){
        console.log("Error: ", e)
        return false
    }
}


export const removeSession = async (session_id:string) => {
    try {
        await db.delete(sessionsTable).where(eq(sessionsTable.token, session_id))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}