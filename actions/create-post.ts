"use server"

import getCurrentUser from "@/lib/supabase/getUser"
import { createClient } from "@/lib/supabase/serverClient"
import { PostSchema } from "@/lib/schemas"
import { redirect } from "next/navigation"

const CreatePostAction = async (form: FormData, songId:number) => {

  const user = await getCurrentUser()
  if(!user) return {message: "not logged in"}

  const parsedData = PostSchema.safeParse({
    title: form.get("title"),
    text: form.get("text"),
  })
  
  if(!parsedData.success) return {message: "Check the post details"}

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...parsedData.data, user_id: user.id, song:songId})
    .select("id")
    .single()
  
  if(error) {
    console.log(error)
    return {message: error.message}
  }

  redirect(`/feed/${data.id}`)

}

export default CreatePostAction