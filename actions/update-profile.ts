"use server"

import { createClient } from "@/lib/supabase/serverClient"
import { ProfileSchema } from "@/lib/schemas"
import getCurrentUser from "@/lib/supabase/getUser"
import { revalidatePath } from "next/cache"

const UpdateProfile = async (form: FormData, id:string) => {

  const user = await getCurrentUser()
  if(!user) return {message: "not logged in"}

  const parsedData = ProfileSchema.safeParse({
    name: form.get("name"),
    description: form.get("description"),
    genres: form.get("genres"),
  })

  if(!parsedData.success) return {message: "Check the profile info"}

  const supabase = await createClient()

  const { data, error } = await supabase
  .from("users")
  .update(parsedData.data)
  .eq("id", user.id)


if(error) {
  console.log(error)
  return {message: error.message}
}

  revalidatePath("/profile", "layout")
  
}

export default UpdateProfile