"use client"

import UpdateProfile from "@/actions/update-profile"
import { Tables } from "@/lib/database.types"

const ProfileDetails = ({profile}: {profile:Tables<"users">}) => {

  const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const result = await UpdateProfile(form, profile.id)
  }

  return (
    <div className="h-fit rounded-2xl w-100 bg-primary">
      <form onSubmit={handleSubmit} className="flex flex-col items-center pt-7">
        <h2 className="text-2xl font-semibold pb-2">Finish your profile</h2>
        <div className="w-80 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
          <input className="focus:outline-none text-black w-78" name="name" required type="text" defaultValue={profile?.name || undefined} placeholder="Name" />
        </div>
        <div className="w-80 flex justify-center p-2 border mb-3 border-accent rounded-2xl">
          <textarea className="focus:outline-none text-black w-78 h-24" name="description" required defaultValue={profile?.description || undefined} placeholder="Description" />
        </div>
        <div className="w-80 flex justify-left p-2 border mb-3 border-accent rounded-2xl">
          <input className="focus:outline-none text-black w-76" name="genres" required type="text" placeholder="genre, genre..." />
        </div>
        <button className="px-4 w-80 cursor-pointer py-2 mt-2 mb-8 text-secondary rounded-xl bg-accent hover:bg-hover active:bg-pressed font-600 text-xl font-medium">Save Profile</button>
      </form>
    </div>
  )
}

export default ProfileDetails