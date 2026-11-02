"use client"

import Link from "next/link"
import SignUp from "@/actions/signup-action"
import { useState } from "react"

const Signup = () => {

  const [error, setError] = useState<null | string>(null)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = form.get("password") as string
    const passwordTwo = form.get("password-second") as string

    if(password !== passwordTwo) return

    const result = await SignUp(form)

    if(result?.message) {
      setError(result.message)
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col border border-text3 p-5 rounded-2xl bg-primary">
      <h1 className="text-2xl mb-4 w-full text-center">Sign up</h1>
      <div className="w-80 bg-white flex justify-center p-2 border mb-3 border-accent rounded-2xl">
        <input className="focus:outline-none w-78" type="email" required name="email" placeholder="Email"/>
      </div>
      <div className="w-80 flex bg-white justify-center p-2 border mb-3 border-accent rounded-2xl">
        <input className="focus:outline-none w-78" type="text" required name="username" placeholder="Username"/>
      </div>
      <div className="w-80 flex bg-white justify-center p-2 border mb-3 border-accent rounded-2xl">
        <input className="focus:outline-none w-78" type="password" required name="password" placeholder="Password"/>
      </div>
      <div className="w-80 flex bg-white justify-center p-2 border mb-3 border-accent rounded-2xl">
        <input className="focus:outline-none w-78" type="password" required name="password-second" placeholder="Re-type Password"/>
      </div>
      <Link className="pl-2 opacity-70 text-sm" href="/login" >Already have an account? Log in here</Link>
      <button className="px-4 py-2 text-secondary rounded-xl bg-accent hover:bg-hover mt-3 cursor-pointer active:bg-pressed font-600 text-xl font-medium">Sign up</button>
    </form>
  )
}

export default Signup