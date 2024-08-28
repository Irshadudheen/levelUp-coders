import React, { useState } from 'react'
import UserHeader from './userHeader'
import { useGetUserData } from '../hook/useGetUser'
import { updateUserProfile } from '../Api/user'
import { toast } from "react-toastify";
import rootShouldForwardProp from '@mui/material/styles/rootShouldForwardProp';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
const EditUserProfile: React.FC = () => {
    const dispatch = useDispatch()
    const currentUser = useGetUserData()
    const navigate = useNavigate()
    const [name, setName] = useState(currentUser.name)
    const [githubUrl,setgithubUrl]=useState('')
    const [linkedinUrl,setlinkedinUrl]=useState('')
    const handleSubmit = async(e)=>{
        console.log("askdjflkj")
        e.preventDefault()
        if(name.trim()){

            const res = await updateUserProfile({name,userId:currentUser.id})
          if(res.succuss){
            console.log(res._doc)
            dispatch(setUser({
                ...currentUser,
                name:res._doc.name,
              }
              ))
              toast.success('Profile updated successfully')
            //   navigate('/profile')
            }else{
                toast.error('the User not update')
            }
                
        }else{
            toast.error('Please enter your name')
        }
        
        
    }
  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-900 p-4 mt-14">
        <div className="max-w-2xl mx-auto"> {/* Reduced width */}
          <div className="bg-gray-800 mt-16 rounded-lg shadow-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">Edit Profile</h2>
            
                <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Name Edit */}
              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              
              {/* Optional: GitHub and LinkedIn Links */}
              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="github">
                  GitHub Link (Optional)
                </label>
                <input
                  id="github"
                  type="url"
                  onChange={e=>setgithubUrl(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter GitHub profile URL"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="linkedin">
                  LinkedIn Link (Optional)
                </label>
                <input
                  id="linkedin"
                  type="url"
                  onChange={e=>setlinkedinUrl(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter LinkedIn profile URL"
                />
              </div>
              
              {/* Save Button */}
              <button className="w-full p-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                Save Changes
              </button>
            </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUserProfile
