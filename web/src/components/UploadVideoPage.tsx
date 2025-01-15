"use client";

import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function UploadVideoPage(){
    const user = useUser()

    useEffect(()=>{
        if (user.loaded && !user.user) redirect("/signin")
    }, [user])

    return(<>
        <h1>Upload vídeo</h1>
    </>)
}