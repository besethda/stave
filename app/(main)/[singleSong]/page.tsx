import { createClient } from "@/lib/supabase/serverClient"
import RecordingBox from "../../components/RecordingBox"
import Profile from "@/app/components/Profile"
import { notFound } from "next/navigation"
import Link from "next/link"
import ShareIcon from "@/app/components/icons/share"
import CreatePost from "@/app/components/CreatePost"

const SingleSong = async ({params}:{params:Promise<{singleSong : string}>}) => {

  const song = await params
  const supabase = await createClient()

  const { data: songData } = await supabase
  .from("songs")
  .select("*, owner:users(username, image)")
  .eq("id", Number(song.singleSong))
  .single()

  if(!songData) notFound()

  return (
    <div className="h-full w-full flex justify-center">
      <div className="max-w-7xl p-5 pt-8 w-full h-full">
        <div className="flex w-full">
          <p className="text-sm opacity-75 uppercase">song ·</p>
          <p className="text-sm opacity-75 uppercase pl-1">{songData?.created_at.slice(0, 10)}</p>
        </div>
        <div className="flex justify-between w-fit items-center gap-4">
          <h1 className="text-4xl my-3">{songData?.title}</h1>
          <CreatePost songData={songData}/>
        </div>
        <div className="flex items-center">
          <div className="relative h-8 w-8">
            <Profile username={songData.owner.username}/>
          </div>
          <Link href={`/profile/${songData.owner.username}/songs`} className="ml-3 hover:underline opacity-80">@{songData.owner.username}</Link>
        </div>
        <div className="flex items-center pt-4 gap-2">
          {songData.key && <p className="border px-2 bg-error py-0.5 rounded-2xl border-text3">Key of {songData.key}</p>}
          {songData.tempo && <p className="border px-2 bg-error py-0.5 rounded-2xl border-text3">{songData.tempo}bpm</p>}
        </div>
        <div className="flex">
        </div>
        <RecordingBox songId={songData.id}/>
      </div>
    </div>
  )
}

export default SingleSong