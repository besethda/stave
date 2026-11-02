import { Tables } from "@/lib/database.types"
import ApplaudIcon from "../../components/icons/applaud"
import CommentIcon from "../../components/icons/comment"
import Profile from "../../components/Profile"
import SongListing from "../../components/SongListing"

const Post = ({postData}:{postData:Tables<"posts">}) => {
  return (
    <div className="m-3 p-3 shadow-lg rounded-2xl bg-primary max-w-180 min-w-150 flex flex-col items-center">
      <div className="flex w-full min-h-12 justify-between">
        <div className="flex">
          <div className="relative flex w-12">
            <Profile />
          </div>
          <h2 className="text-2xl">Title of the post</h2>
        </div>
        <div className="opacity-70 text-sm">yesterday</div>
      </div>
      <div className="flex w-full">
        <p className="text-left">This is some text about this post and what its about and everything like that</p>
      </div>
      <SongListing  user={null} />
      <div className="flex w-full gap-3">
        <div className="rounded-md p-0.5 cursor-pointer hover:scale-108 duration-50">
          <CommentIcon />
        </div>
        <div className="rounded-md cursor-pointer hover:scale-108 duration-50">
          <ApplaudIcon />
        </div>
      </div>
    </div>
  )
}

export default Post