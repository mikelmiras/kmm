
"use client";
import { SigninForm } from "@/components/Forms";
import React from "react";
import {Button, ButtonGroup} from "@nextui-org/button";
import { useTheme } from "next-themes";

const SigninPage = () => {
    const { theme, setTheme } = useTheme();
    return(<>
        <SigninForm />
    </>)
}

export default SigninPage