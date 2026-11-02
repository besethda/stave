import getCurrentUser from "@/lib/supabase/getUser"
import { createClient } from "@/lib/supabase/serverClient"
import ApplaudIcon from "../icons/applaud"

const Applaud = async ({postId}:{postId: number}) => {

  const supabase = await createClient()
  const user = await getCurrentUser()

  if(!user) return {message: "not logged in"}

  const { data, error } = await supabase
    .from("likes")
    .select()
    .eq("post", postId)
    .eq("user_id", user?.id)

  const handleClick = () => {
    
  }

  return (
    <div onClick={handleClick} className="z-8 w-fit h-fit">
      {data?.length && <ApplaudIcon /> }
    </div>
  )
}

export default Applaud