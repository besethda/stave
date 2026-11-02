"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavMenu = ({ songName }: { songName: string }) => {

  const pathname = usePathname()

  return (
    <nav className="flex max-w-300 mt-6 w-full ml-15 gap-3">
      {pathname !== `/${songName}` ? 
      <Link href={`/${songName}`} className="text-2xl w-5.5 h-full relative bottom-2">←</Link> :
      <div className="w-5.5"></div>
      }
      <div className="w-fit px-1">
        <Link className="flex" href={`/${songName}/chords`}>Chords</Link>
        {pathname === `/${songName}/chords` && <div className="h-0.5 grow bg-accent" />}
      </div>
      <div className="w-fit px-1">
        <Link className="flex" href={`/${songName}/recordings`}>Recordings</Link>
        {pathname === `/${songName}/recordings` && <div className="h-0.5 grow bg-accent" />}
      </div>
      <div className="w-fit px-1">
        <Link className="flex" href={`/${songName}/staves`}>Staves</Link>
        {pathname === `/${songName}/staves` && <div className="h-0.5 grow bg-accent" />}
      </div>
    </nav>
  )
}

export default NavMenu