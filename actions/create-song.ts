"use server"

import getCurrentUser from "@/lib/supabase/getUser"
import { createClient } from "@/lib/supabase/serverClient"
import { SongSchema } from "@/lib/schemas"
import { redirect } from "next/navigation"

const CreateSong = async (form: FormData) => {

  const user = await getCurrentUser()
  if(!user) return {message: "not logged in"}

  const parsedData = SongSchema.safeParse({
    title: form.get("title"),
    tempo: form.get("tempo"),
    key: form.get("key"),
    artist: form.get("artist")
  })
  
  if(!parsedData.success) return {message: "Check the song details"}

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("songs")
    .insert({ ...parsedData.data, owner: user.id})
    .select("id")
    .single()
  
  if(error) {
    console.log(error)
    return {message: error.message}
  }

  redirect(`/${data.id}`)

}

export default CreateSong