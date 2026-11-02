import Post from "./post"
import { createClient } from "@/lib/supabase/serverClient"

const Feed = async () => {

  const supabase = await createClient()
  const { data:posts, error } = await supabase
  .from("posts").select("*, user_id:users!posts_user_fkey(username)")
  
  return (
    <div className="flex flex-col items-center">
      {posts?.map((e, i)=> <Post key={`post${i}`} postData={e}/>)}
    </div>
  )
}

export default Feed