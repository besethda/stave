import { string, z } from "zod" 

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

export const SongSchema = z.object({
  title: z.string(),
  tempo: z.coerce.number().int().max(220).min(30).transform(e=> e||null),
  key: z.string().max(8).transform(e=> e||null),
  artist: z.string().transform(e=> e||null)
})

export const ProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
  genres: z.string().transform(genre=> genre.split(",").map(e=> e.trim()).filter(Boolean))
    .pipe(z.array(z.string().max(30)).min(1))
})