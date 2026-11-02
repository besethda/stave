import { ReactNode } from "react"
import NavMenu from "./navMenu"
import { createClient } from "@/lib/supabase/serverClient"
import getCurrentUser from "@/lib/supabase/getUser"

const ProfileLayout = async ({children, params}:{children: ReactNode, params: Promise<{profile: string}>}) => {

  const {profile: username} = await params
  const user = await getCurrentUser()  
  const supabase = await createClient()
  const data = await supabase
  .from("users")
  .select("*")
  .eq("username", username)
  .single()

  return (
    <>
      <div className="flex flex-col items-center grow overflow-scroll">
        <div className="grid max-w-7xl h-65 grid-cols-4 w-full">
          <div className="col-span-1 flex items-center justify-center" >
          <div className="block rounded-[50%] bg-success h-7/10 aspect-square shadow-2xl" ></div>
          </div>
          <div className="grid col-span-3 h-full pb-2 pt-10 px-4">
            <div className="flex items-center justify-between h-fit">
              <div className="flex flex-col">
                <h2 className="text-3xl">Thomas Filmore</h2>
                <h4 className="opacity-65 text-md">@{data.data?.username}</h4>
              </div>
              {data.data?.username !== user?.user_metadata.username && <div className="flex gap-2">
                <button className="px-3 py-1.5 text-text1 rounded-xl border-accent border bg-secondary hover:bg-error active:bg-text2 font-600 text-lg font-medium">Invite to Collaborate</button>
                <button className="px-3 py-1.5 text-secondary rounded-xl bg-accent hover:bg-hover active:bg-pressed font-600 text-lg font-medium">Follow</button>
              </div>}
            </div>
            <p className="">A guitarist who likes to write songs and collaborate with others. </p>
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
                <h5 className="">32</h5>
                <p className="">Songs</p>
              </div>
              <div className="flex flex-col py-2 px-4">
                <h5 className="">1034</h5>
                <p className="">Likes</p>
              </div>
            </div>
            <div className="flex items-center">
              <h3 className="mr-4">Genres:</h3>
              <p className="border px-2 bg-error py-0.5 rounded-2xl border-text3">Guitar</p>
            </div>
          </div>
        </div>
        <NavMenu username={username}/>
      {children}
      </div>
    </>

  )
}

export default ProfileLayout