"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavMenu = ({username}:{username:string}) => {
  const pathname = usePathname()
  return (
    <nav className="flex max-w-300 mt-6 w-full ml-15 gap-3">
      <div className="w-fit px-1">
        <Link className="flex" href={`/profile/${username}/songs`}>Songs</Link>
        {pathname === `/profile/${username}/songs` && <div className="h-0.5 grow bg-accent"/>}
      </div>
      <div className="w-fit px-1">
      <Link className="flex" href={`/profile/${username}/collaborations`}>Collaborations</Link>
      {pathname === `/profile/${username}/collaborations` && <div className="h-0.5 grow bg-accent"/>}
      </div>
      <div className="w-fit px-1">
        <Link className="flex" href={`/profile/${username}/about`}>About</Link>
        {pathname === `/profile/${username}/about` && <div className="h-0.5 grow bg-accent"/>}
      </div>
  </nav>
  )
}

export default NavMenu