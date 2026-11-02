import getCurrentUser from "@/lib/supabase/getUser"
import Link from "next/link"

const Profile = async ({username}:{username?:string}) => {

  const user = await getCurrentUser()

  return (
    <div className="relative">
      <Link href={`${user ? username ? `/profile/${username}/songs` : "/profile" : "/login"}`} className="block rounded-[50%] bg-success h-7/10 aspect-square shadow-2xl" />
    </div>
  )
}

export default Profile