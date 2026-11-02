import { ReactNode } from "react"
import NavMenu from "./navMenu"
import { createClient } from "@/lib/supabase/serverClient"
import getCurrentUser from "@/lib/supabase/getUser"
import { notFound } from "next/navigation"
import ProfileDetails from "./profileDetails"

const ProfileLayout = async ({children, params}:{children: ReactNode, params: Promise<{profile: string}>}) => {

  const {profile: username} = await params
  const user = await getCurrentUser()  
  const supabase = await createClient()
  const {data: profile} = await supabase
  .from("users")
  .select("*")
  .eq("username", username)
  .single()

  if(!profile) notFound()

  const { data: songs, error } = await supabase
  .from("songs").select("*").eq("owner", profile.id)

  const profileCompleted = profile.genres?.length && profile.name && profile.description ? true : false

  return (
    <>
      {profile.id === user?.id && !profileCompleted && <div className="absolute flex items-center justify-center z-30 top-0 left-0 w-full h-full bg-gray-800/20 backdrop-blur-xs">
        <ProfileDetails profile={profile}/>
      </div>}
      <div className="flex flex-col items-center grow overflow-scroll">
        <div className="grid max-w-7xl h-65 grid-cols-4 w-full">
          <div className="col-span-1 flex items-center justify-center" >
          <div className="block rounded-[50%] bg-success h-7/10 aspect-square shadow-2xl" ></div>
          </div>
          <div className="grid col-span-3 h-full pb-2 pt-10 px-4">
            <div className="flex items-center justify-between h-fit">
              <div className="flex flex-col">
                {profile.name && <h2 className="text-3xl">{profile.name}</h2>}
                <h4 className="opacity-65 text-md">@{profile?.username}</h4>
              </div>
              {profile.id !== user?.id && <div className="flex gap-2">
                <button className="px-3 py-1.5 text-text1 rounded-xl border-accent border bg-secondary hover:bg-error active:bg-text2 font-600 text-lg font-medium">Invite to Collaborate</button>
                <button className="px-3 py-1.5 text-secondary rounded-xl bg-accent hover:bg-hover active:bg-pressed font-600 text-lg font-medium">Follow</button>
              </div>}
            </div>
            {profile.description && <p className="">{profile.description}</p>}
            <div className="flex">
              <div className="flex flex-col py-2 pr-4">
                <h5 className="">100</h5>
                <p className="">Followers</p>
              </div>
              <div className="flex flex-col py-2 px-4">
                <h5 className="">107</h5>
                <p className="">Following</p>
              </div>
              <div className="flex flex-col py-2 px-4">
                <h5 className="">{songs && songs.length}</h5>
                <p className="">Songs</p>
              </div>
              <div className="flex flex-col py-2 px-4">
                <h5 className="">1034</h5>
                <p className="">Likes</p>
              </div>
            </div>
            {profile.genres && profile.genres.length && <div className="flex items-center">
              <h3 className="mr-2">Genres:</h3>
              {profile.genres.map((e, i)=> <p key={i} className="border px-2 bg-error py-0.5 mr-2 rounded-2xl border-text3">{e}</p>)}
            </div>}
          </div>
        </div>
        <NavMenu username={username}/>
      {children}
      </div>
    </>

  )
}

export default ProfileLayout