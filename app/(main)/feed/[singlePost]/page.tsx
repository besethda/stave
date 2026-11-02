import { createClient } from "@/lib/supabase/serverClient"

const SinglePost = async ({params}:{params:Promise<{singlePost : string}>}) => {

  const { singlePost } = await params
  console.log(singlePost)
  const supabase = await createClient()
  const { data: postData, error } = await supabase
  .from("posts")
  .select("*, user_id:users!posts_user_fkey(username)")
  .eq("id", Number(singlePost))
  .single()

  return (
    <div className="">
      
    </div>
  )
}

export default SinglePost