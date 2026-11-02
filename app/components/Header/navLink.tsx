"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({name, href}: {name:string, href: string}) => {
  const pathname = usePathname()

  return (
    <Link href={href} className={`px-4 py-2 hover:text-accent rounded-xl hover:bg-error font-600 text-xl ${pathname === href ? "font-bold" : "font-medium"}`}>{name}</Link>
  )
}

export default NavLink