
"use client";
import { SigninForm, SignupForm } from "@/components/Forms";
import React from "react";
import {Button, ButtonGroup} from "@nextui-org/button";
import { useTheme } from "next-themes";

const SignupPage = () => {
    const { theme, setTheme } = useTheme();
    return(<>
        <SignupForm />
    </>)
}

export default SignupPage