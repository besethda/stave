'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { redirect } from "next/navigation"

const SignUp = async (formdata: FormData) => {
  const userdata = {
    username: formdata.get("username") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string
  }
  const supabase = await createClient()
  const {data: { user }, error } = await supabase.auth.signUp({
    email: userdata.email,
    password: userdata.password,
    options: {data: { username: userdata.username}}
  })
  if (error) return {message: error.message}

  if(user && user.email) {
    const {data, error} = await supabase.from('users').insert({id: user.id, email: user.email, username: userdata.username})
    if(error) console.log(error, data)
  }
  redirect('/feed')
}

export default SignUp