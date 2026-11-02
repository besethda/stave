import Post from "./post"
import { createClient } from "@/lib/supabase/serverClient"

const Feed = async () => {

  const supabase = await createClient()
  const { data:posts, error } = await supabase
  .from("posts").select("*")
  
  return (
    <div className="flex flex-col items-center">
      {/* <Post /> */}
    </div>
  )
}

export default Feed