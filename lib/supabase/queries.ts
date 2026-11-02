import { createClient } from "./browserClient"
import { type QueryData, type SupabaseClient } from "@supabase/supabase-js"
import { type Database } from "../../lib/database.types"

export const getHomePosts = async (supabase: SupabaseClient<Database>) => {
  return await supabase.from('posts').select('title, slug, author:users(id, username)').order("created_at", { ascending: false })
}

export const getSinglePost = async (slug: string) => {
  const supabase = createClient()
  return await supabase.from('posts').select('title, content, author:users(id, username)').eq('slug', slug)
}

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient()
  return await supabase.from('posts')
    .select('title, slug')
    .textSearch('title', searchTerm)
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>
export type SearchResultType = QueryData<ReturnType<typeof searchPosts>>
export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>