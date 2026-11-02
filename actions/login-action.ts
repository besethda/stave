"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"
import { LoginSchema } from "@/lib/schemas"
import z from "zod"

const LoginAction = async(userdata: z.infer<typeof LoginSchema>) => {
  const parsedData = LoginSchema.parse(userdata)

  const supabase = await createClient()
  const {data, error} = await supabase.auth.signInWithPassword(parsedData)

  if (error) return {message: error.message}
  redirect("/feed")
}

export default LoginAction