"use client"

import { useState } from "react"
import CreatePostAction from "@/actions/create-post"
import ShareIcon from "../icons/share"
import { Tables } from "@/lib/database.types"
import SongListing from "../SongListing"

const CreatePost = ({songData}:{songData: Tables<"songs">}) => {

  const [display, setDisplay] = useState<boolean>(false)
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setDisplay(false)
    const result = await CreatePostAction(form, songData.id)
    console.log(result)
  }

  return (
    <>
    <button className="w-fit h-fit" onClick={()=> setDisplay(!display)}>
      <ShareIcon />
    </button>
      {display && <div onClick={()=> setDisplay(!display)} className="absolute flex items-center justify-center z-30 top-0 left-0 w-full h-full bg-gray-800/20 backdrop-blur-xs">
        <div onClick={(e)=> e.stopPropagation()} className="h-fit rounded-2xl w-120 bg-primary">
          <form onSubmit={handleSubmit} className="flex flex-col items-center pt-7">
            <h2 className="text-2xl font-semibold pb-2">Make a post</h2>
            <SongListing songData={songData} user={String(songData.id)}/>
            <div className="w-108 flex justify-center p-2 border mb-3 bg-white border-accent rounded-2xl">
              <input className="focus:outline-none text-black w-104" name="title" required type="text" placeholder="Post Title" />
            </div>
            <div className="w-108 flex justify-center p-2 border mb-3 bg-white border-accent rounded-2xl">
              <textarea className="focus:outline-none text-black w-104 h-24" name="text" required placeholder="Say something..." />
            </div>
            <button className="px-4 mb-8 w-108 cursor-pointer py-2 mt-2 text-secondary rounded-xl bg-accent hover:bg-hover active:bg-pressed font-600 text-xl font-medium">Post</button>
          </form>
        </div>
      </div>}
    </>
  )
}

export default CreatePost