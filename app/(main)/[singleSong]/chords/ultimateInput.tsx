"use client"

import { ChordProParser, Song, UltimateGuitarParser } from "chordsheetjs"

const UltimateInput = ({setChordSheet}:{setChordSheet:(song:Song)=>void}) => {

    const renderSong = (sheet:string):void => {
      const parser = new UltimateGuitarParser()
      try{
        const song = parser.parse(sheet)
        setChordSheet(song)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="w-full h-full">
      <div className="h-full w-full p-5 rounded-xl bg-white border border-gray-200">
        <textarea onChange={(e)=> renderSong(e.target.value)} className="w-full focus:outline-none h-full"/>
      </div>
    </div>
  )
}

export default UltimateInput