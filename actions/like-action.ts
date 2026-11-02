"use server"

import { createClient } from "@/lib/supabase/serverClient"
import getCurrentUser from "@/lib/supabase/getUser"
import { revalidatePath } from "next/cache"

const LikeAction = async (post: number) => {

  const user = await getCurrentUser()
  if(!user) return {message: "not logged in"}

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("likes")
    .insert({ post: post, user_id: user.id})
    .select("id")
    .single()
  
  if(error) {
    console.log(error)
    return {message: error.message}
  }

  revalidatePath("/profile", "layout")
  
}

export default LikeAction