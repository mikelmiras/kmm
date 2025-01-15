import { db } from "@/db"
import { sessionsTable, usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST (request: Request){
    const cookieStore = await cookies()
    let body : any = {}
    try {
        body = await request.json()
    }
    catch (e) {
        return Response.json({error:"Provide a valid JSON"}, {status:400})
    }


    const email = body.email
    const password = body.password
    if (!email || !password) return Response.json({error:"Provide a valid email and password", body:request.json()}, {status:400})

    const user = (await db.select({password:usersTable.password, id:usersTable.id}).from(usersTable).where(eq(usersTable.email, email)).limit(1))[0]
    if (!user) return Response.json({error:"Account doesn't exist"}, {status:401});
    const isvalidPassword = bcrypt.compareSync(password, user.password as string)
    const expires_at : Date = new Date()
    expires_at.setMonth(new Date().getMonth() + 1)
    try {
        const session : typeof sessionsTable.$inferInsert = {userid:user.id, expires_at:expires_at}
        const r = (await db.insert(sessionsTable).values(session).returning())[0]
        cookieStore.set({
            name: 'session_auth_key',
            value: r.token,
            httpOnly: true,
            path: '/',
            expires:r.expires_at
          })
        return Response.json(r)
    } catch (e) {
        console.log(e)
        return Response.json({error:"Internal server error"}, {status:500})
    }
}