"use client"

import CreateSong from "@/actions/create-song"
import { useState } from "react"

const NewSong = () => {

  const [display, setDisplay] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setDisplay(false)
    const result = await CreateSong(form)
    if(result?.message) {
      setError(result.message)
    }
  }

  return (
    <>
      <button onClick={()=> setDisplay(!display)} className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-hover active:bg-pressed font-600 text-xl font-medium">New Song</button>
      {display && <div onClick={()=> setDisplay(!display)} className="absolute flex items-center justify-center z-30 top-0 left-0 w-full h-full bg-gray-800/20 backdrop-blur-xs">
        <div onClick={(e)=> e.stopPropagation()} className="h-80 rounded-2xl w-100 bg-primary">
          <form onSubmit={handleSubmit} className="flex flex-col items-center pt-7">
            <h2 className="text-2xl font-semibold pb-2">New Song</h2>
            <div className="w-80 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
              <input className="focus:outline-none text-black w-78" name="title" required type="text" placeholder="Song Name" />
            </div>
            <div className="flex justify-between w-80">
              <div className="w-39 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
                <input className="focus:outline-none text-black w-35" name="key" type="text" placeholder="Song Key" />
              </div>
              <div className="w-39 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
                <input className="focus:outline-none text-black w-35" name="tempo" type="text" placeholder="Song Tempo" />
              </div>
            </div>
            <div className="w-80 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
              <input className="focus:outline-none text-black w-78" name="artist" type="text" placeholder="Artist Name" />
            </div>
            <button className="px-4 w-80 cursor-pointer py-2 mt-2 text-secondary rounded-xl bg-accent hover:bg-hover active:bg-pressed font-600 text-xl font-medium">Save Song</button>
          </form>
        </div>
      </div>}
    </>
  )
}

export default NewSong