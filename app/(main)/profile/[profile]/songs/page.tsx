import SongListing from "@/app/components/SongListing"
import { createClient } from "@/lib/supabase/serverClient"
import { notFound } from "next/navigation"

const ProfileSongs = async ({params}: {params: Promise<{profile: string}>}) => {

  const {profile: username} = await params
  const supabase = await createClient()
  const {data: profile} = await supabase
  .from("users").select("id").eq("username", username).single()
  if(!profile) notFound()

  const { data:songs, error } = await supabase
  .from("songs").select("*").eq("owner", profile.id)

  return (
    <div className="h-full w-full flex justify-center max-w-7xl">
      {songs && songs.length && songs?.map((e, i)=> <SongListing key={i} songData={e} user={username}/>)}
    </div>
  )
}

export default ProfileSongs