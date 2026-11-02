"use client"

import { HtmlDivFormatter, Song } from "chordsheetjs";
import { useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import UltimateInput from "./ultimateInput";
import ProInput from "./proInput";
import SaveIcon from "@/app/components/icons/save";

type songMetaData = {
  artist: string,
  title: string,
  key: string,
  type: boolean
}

const Chords = () => {

    const [chordSheet, setChordSheet] = useState<Song | null>(null)
    const [ultimateSheet, toggleUltimateSheet] = useState<boolean>(true)
    const [songData, setSongData] = useState<songMetaData>({artist:"", title:"", key:"", type: true})
  
    const formatter = new HtmlDivFormatter()
    const defaultCss = formatter.cssString();

  const formatSong = () => {
    if(!chordSheet) return ""
    const disp = formatter.format(chordSheet)
    const cleanedDisp = DOMPurify.sanitize(disp)
    return cleanedDisp
  }

  const updateTitle = (titleString: string)=> {
    setSongData(data=> ({...data, title: titleString}))
  }

  const updateKey = (keyString: string)=> {
    setSongData(data=> ({...data, key: keyString}))
  }

  const updateType = (type: boolean)=> {
    setSongData(data=> ({...data, type: type}))
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="gap-1 mt-2 min-h-10 flex items-center bg-ternary shadow-lg z-10 shrink-0">
        <button className="flex gap-2 items-center text-2xl h-full px-4 hover:bg-primary">
          <SaveIcon />
          Save
        </button>
        <div className="flex gap-2">
          <label htmlFor="title" className="h-full text-2xl">Title:</label>
          <input type="text" id="title" onChange={e=>updateTitle(e.target.value)} className="focus:outline-none h-full w-42 text-2xl" placeholder="song title"/>
        </div>
        <div className="flex gap-2">
          <label htmlFor="key" className="h-full text-2xl">Song key:</label>
          <input type="text" id="key" onChange={e=>updateKey(e.target.value)} className="focus:outline-none w-20 h-full text-2xl" placeholder="Gb"/>
        </div>
        <div className="flex gap-3">
          <label htmlFor="type" className="h-full text-2xl mr-2">Chart type:</label>
          <label htmlFor="pro" className="h-full gap-2 flex text-2xl">
            <input onChange={e=> {toggleUltimateSheet(false), updateType(false)}} type="radio" id="pro" checked={!ultimateSheet} value="pro"/>
            Inline
          </label>
          <label htmlFor="ultimate" className="h-full gap-2 flex text-2xl">
            <input onChange={e=> {toggleUltimateSheet(true), updateType(true)}} type="radio" id="ultimate" value="ultimate" checked={ultimateSheet}/>
            Above
          </label>
          </div>
      </div>
      <div className="grid grid-cols-2 grow bg-linear-60 bg-primary p-3 gap-3">
      {ultimateSheet ? <UltimateInput setChordSheet={setChordSheet}/> : <ProInput setChordSheet={setChordSheet} />}
        <div className="p-5 h-full bg-white rounded-xl border border-gray-200">
          <style dangerouslySetInnerHTML={{ __html: defaultCss }} />
          <div dangerouslySetInnerHTML={{ __html: formatSong() }}></div>
        </div>
      </div>
    </div>

  )
}

export default Chords