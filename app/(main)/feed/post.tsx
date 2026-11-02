import { Tables } from "@/lib/database.types"
import ApplaudIcon from "../../components/icons/applaud"
import CommentIcon from "../../components/icons/comment"
import Profile from "../../components/Profile"
import SongListing from "../../components/SongListing"
import { createClient } from "@/lib/supabase/serverClient"
import Link from "next/link"
import Applaud from "@/app/components/Applaud"

const Post = async ({postData}:{postData:Tables<"posts">}) => {

    const supabase = await createClient()
  
    const { data: songData } = await supabase
    .from("songs")
    .select("*, owner:users(username, image)")
    .eq("id", Number(postData.song))
    .single()

  return (
    <div className="m-3 relative p-3 shadow-lg rounded-2xl bg-primary max-w-180 min-w-150 flex flex-col items-center">
      <Link className="absolute top-0 left-0 w-full h-full z-8" href={`/feed/${postData.id}`}/>
      <div className="flex w-full min-h-12 justify-between">
        <div className="flex">
          <div className="relative flex w-12">
            <Profile username={songData?.owner.username}/>
          </div>
          <Link href={`/profile/${songData?.owner.username}/songs`} className="text-lg hover:underline z-10">@{songData?.owner.username}</Link>
        </div>
        <div className="opacity-70 text-sm">{postData.created_at.slice(0,10)}</div>
      </div>
      <h2 className="text-2xl w-full">{postData.title}</h2>
      <div className="flex w-full">
        <p className="text-left">{postData.text}</p>
      </div>
      {songData && <SongListing  user={null} songData={songData}/>}
      <div className="flex w-full gap-3">
        <div className="rounded-md p-0.5 cursor-pointer hover:scale-108 duration-50">
          <CommentIcon />
        </div>
        <div className="rounded-md cursor-pointer hover:scale-108 duration-50">
          <Applaud postId={postData.id}/>
        </div>
      </div>
    </div>
  )
}

export default Post