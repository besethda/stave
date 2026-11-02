"use client"

import { useState } from "react"
import PlayIcon from "../icons/play"
import PauseIcon from "../icons/pause"
import RecordIcon from "../icons/record"
import NoteIcon from "../icons/note"
import ChordIcon from "../icons/chord"
import Link from "next/link"
import { Tables } from "@/lib/database.types"

const SongListing = ({user, songData}:{user: string | null, songData: Tables<"songs">}) => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlayPause = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  return (
    <Link href={`/${songData.id}`} className="block max-w-110 z-8 hover:-translate-y-1 duration-150 w-full h-fit bg-secondary m-4 border border-border shadow-md rounded-xl p-2">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div onClick={(e)=> handlePlayPause(e)} className="rounded-[50%] p-1.5 border border-error bg-error">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
          <div className="flex flex-col py-2">
            <h2 className="">{songData.title}</h2>
            <div className="flex gap-3">
              {user && <p className="opacity-70 text-xs">{user}</p>}
              <p className="opacity-70 text-xs">{songData.created_at.slice(0,10)}</p>
            </div>
          </div>
        </div>
        <div className="">
          <h5 className="rounded-xl px-2 py-1 bg-error border border-error text-sm">finished</h5>
        </div>
      </div>
      <div className="">
        waveform
      </div>
      <div className="flex gap-2">
        <div className="rounded-md bg-error p-0.5">
          <RecordIcon />
        </div>
        <div className="rounded-md bg-error p-0.5">
          <NoteIcon />
        </div>
        <div className="rounded-md bg-error p-0.5">
          <ChordIcon />
        </div>
      </div>
    </Link>
  )
}

export default SongListing