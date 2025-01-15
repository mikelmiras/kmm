"use client";

import { useUser } from "@/context/userContext";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card"
import { Form } from "@nextui-org/form";
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from "react";
export const SigninForm = () => {
    const [loginDetails, setLoginDetails] = useState({email:"", password:""})
    const [loading, setLoading] = useState(false)
    const user = useUser()
    useEffect(()=> {
     if (user.user) window.location.href = "/"
    }, [user])
    return (<>
    <Card className="p-4">
      <CardHeader>
        <h1 className="text-2xl">Log in</h1>
      </CardHeader>
      <Divider/>
        <CardBody className="p-4">
        <Form
        
      className="w-72 max-w-xl flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(loginDetails)
        fetch("/api/auth/login", {method:"POST", headers:{"Content-type":'application/json'}, body:JSON.stringify(loginDetails)}).then(data => data.json()).then(data => {
          if (data.error) {
            alert(data.error)
            return
            }
            window.location.href = '/'
        })
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="example@website.com"
        type="text"
        onChange={(e)=> setLoginDetails({...loginDetails, email:e.currentTarget.value})}
      />

      <Input
        isRequired
        errorMessage="Please enter a valid password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        onChange={(e)=> setLoginDetails({...loginDetails, password:e.currentTarget.value})}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
        </CardBody>
    </Card>
    </>)

}





export const SignupForm = () => {
  const [loginDetails, setLoginDetails] = useState({email:"", password:"", name:""})
  const [loading, setLoading] = useState(false)
  return (<>
  <Card className="p-4">
    <CardHeader>
      <h1 className="text-2xl">Create an account</h1>
    </CardHeader>
    <Divider/>
      <CardBody className="p-4">
      <Form
      
    className="w-72 max-w-xl flex flex-col gap-4"
    validationBehavior="native"
    onSubmit={(e) => {
      e.preventDefault();
      console.log(loginDetails)
      fetch("/api/auth/signup", {method:"POST", headers:{"Content-type":'application/json'}, body:JSON.stringify(loginDetails)}).then(data => data.json()).then(data => {
        if (data.error) {
          alert(data.error)
          return
          }
          alert("Account created successfully")
          window.location.href = '/signin'
      })
    }}
  >
    <Input
      isRequired
      errorMessage="Please enter a valid name"
      label="Name"
      labelPlacement="outside"
      name="name"
      placeholder="Introduce your name"
      type="text"
      onChange={(e)=> setLoginDetails({...loginDetails, name:e.currentTarget.value})}
    />
    <Input
      isRequired
      errorMessage="Please enter a valid email"
      label="Email"
      labelPlacement="outside"
      name="email"
      placeholder="example@website.com"
      type="text"
      onChange={(e)=> setLoginDetails({...loginDetails, email:e.currentTarget.value})}
    />

    <Input
      isRequired
      errorMessage="Please enter a valid password"
      label="Password"
      labelPlacement="outside"
      name="password"
      placeholder="Enter your password"
      type="password"
      onChange={(e)=> setLoginDetails({...loginDetails, password:e.currentTarget.value})}
    />
    <div className="flex gap-2">
      <Button color="primary" type="submit">
        Submit
      </Button>
    </div>
  </Form>
      </CardBody>
      <CardFooter>
        Already have an account? <Link href={"/signin"}>Sign in.</Link>
      </CardFooter>
  </Card>
  </>)

}