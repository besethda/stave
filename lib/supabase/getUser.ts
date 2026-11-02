import { createClient } from "./serverClient"

const getCurrentUser = async () => {
  const supabase = await createClient()
  const {data: { user }} = await supabase.auth.getUser()
  return user
}

export default getCurrentUser