import { db } from "@/db";
import { userSchema, usersTable } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs';
import { DrizzleError, DrizzleTypeError } from "drizzle-orm";
import {z} from 'zod'

export async function POST (request: Request){
    let userBody : any = {}    
    try{
            userBody = await request.json()

        } catch (e) {
            return Response.json({error:"Provide valid userdata"})
        }
        try {
            const isvalid = userSchema.parse(userBody)
        } catch (e : any) {
            if (e instanceof z.ZodError) return Response.json({error:e.errors})
           
            return Response.json({error:"Internal server error"})
        }
        
            userBody.password = bcrypt.hashSync(userBody.password, bcrypt.genSaltSync())


        try {
            const user : typeof usersTable.$inferInsert = userBody
            const saved  = await db.insert(usersTable).values(user)
            return Response.json({saved})
        } catch (e : any){
            console.log("Error creating user: ", e)
            if (e.constraint?.includes("unique")) return Response.json({error:"Email or username is already in use"}, {status:409})
            return Response.json({error:"Internal server error"})
        }

}