"use client"

import PauseIcon from "@/app/components/icons/pause"
import PlayIcon from "@/app/components/icons/play"
import ShareIcon from "@/app/components/icons/share"
import { useState } from "react"

const SongBox = () => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="flex flex-col max-w-140 w-full bg-secondary m-4 border border-border shadow-md rounded-xl p-2">
      <div className="flex justify-between items-center pr-2">
        <div className="p-2">I wrote made this recording blahblahblah</div>
        <ShareIcon />
      </div>
      <div className="flex">
        <div onClick={()=> setIsPlaying(!isPlaying)} className="rounded-[50%] p-1.5 border border-error bg-error">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div className="pl-3">
          Waveform
        </div>
      </div>
    </div>
  )
}

export default SongBox