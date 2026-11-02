import getCurrentUser from "@/lib/supabase/getUser"
import { redirect } from "next/navigation"

const ProfilePage = async () => {

  const user = await getCurrentUser()
  if(!user) redirect("/login")

  redirect(`profile/${user.user_metadata.username}/songs`)
}

export default ProfilePage