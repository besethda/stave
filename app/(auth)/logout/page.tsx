import { LogOut } from "@/actions/logout-action"
import { redirect } from "next/navigation"

const Logout = () => {
  LogOut()
  redirect("/login")
}

export default Logout