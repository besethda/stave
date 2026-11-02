"use client"

import Link from "next/link"
import LoginAction from "@/actions/login-action"
import { useState } from "react"

const Login = () => {

  const [error, setError] = useState<null | string>(null)
  

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const result = await LoginAction({
      email: form.get("email") as string,
      password: form.get("password") as string
    })

    if(result?.message) {
      setError(result.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col border border-text3 p-5 rounded-2xl bg-primary">
      <h1 className="text-2xl mb-4 w-full text-center">Log in</h1>
      <div className="w-80 bg-white flex justify-center p-2 border mb-3 border-accent rounded-2xl">
        <input className="focus:outline-none w-78" type="email" name="email" required placeholder="email"/>
      </div>
      <div className="bg-white w-80 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
        <input className="focus:outline-none w-78" type="password" name="password" required placeholder="password"/>
      </div>
      <Link className="pl-2 opacity-70 text-sm" href="/signup" >Don't have an account? Sign up here</Link>
      <button className="px-4 py-2 text-secondary rounded-xl bg-accent hover:bg-hover mt-3 cursor-pointer active:bg-pressed font-600 text-xl font-medium">Log in</button>
    </form>
  )
}

export default Login