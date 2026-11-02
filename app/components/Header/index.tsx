import Image from "next/image"
import Profile from "../Profile"
import Link from "next/link"
import SearchIcon from "../icons/search"
import NavLink from "./navLink"
import NewSong from "../NewSong"
import getCurrentUser from "@/lib/supabase/getUser"

const Header = async () => {

  const user = await getCurrentUser()

  return (
    <header className="h-1/12 max-h-20 w-full items-center z-20 justify-between px-5 flex shrink-0 shadow-xl bg-primary">
      <div className="flex items-center h-full w-fit ">
        <Link href="/" className="relative h-7/10 aspect-3/5 mr-4">
          <Image className="absolute" fill src={"/Clef Logo (transparent).png"} alt="logo" />
        </Link>
        <div className="flex gap-2">
          <NavLink href="/feed" name="Feed" />
          <NavLink href="/songs" name="My Songs" />
        </div>
      </div>
      <div className="h-full flex gap-10 items-center">
        <div className="border-text3 w-84 rounded-lg px-3 py-1.5 border-2 flex gap-3">
          <SearchIcon />
          <input type="text" placeholder="search..." className="focus:outline-none text-xl"/>
        </div>
        {user && <NewSong />}
        <div className="h-7/10 aspect-square items-center">
          <Profile />
        </div>
      </div>

    </header>
  )
}

export default Header