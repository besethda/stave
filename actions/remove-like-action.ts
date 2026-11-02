"use server"

import { createClient } from "@/lib/supabase/serverClient"
import getCurrentUser from "@/lib/supabase/getUser"
import { revalidatePath } from "next/cache"

const RemoveLikeAction = async (postId: number) => {

  const user = await getCurrentUser()
  if(!user) return {message: "not logged in"}

  const supabase = await createClient()

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post", postId)
    .eq("user_id", user.id)
  
  if(error) {
    console.log(error)
    return {message: error.message}
  }

  revalidatePath("/feed", "layout")
  
}

export default RemoveLikeAction