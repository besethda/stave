import { ReactNode } from "react"
import NavMenu from "./navMenu"

const SingleSongLayout = async ({children, params}: {children: ReactNode, params:Promise<{singleSong : string}>}) => {

  const song = await params

  return (
    <div className="h-full flex flex-col bg-primary">
      <NavMenu songName={song.singleSong}/>
      <div className="flex grow justify-center">
        {children}
      </div>
    </div>
  )
}

export default SingleSongLayout