import React, { useState } from 'react';
import UserHeader from './userHeader';
import { useGetUserData } from '../hook/useGetUser';
import { updateUserProfile } from '../Api/user';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const EditUserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useGetUserData();
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.name);
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const res = await updateUserProfile({ name, userId: currentUser.id });
      if (res.succuss) {
        dispatch(setUser({ ...currentUser, name: res._doc.name }));
        toast.success('Profile updated successfully');
      } else {
        toast.error('User not updated');
      }
    } else {
      toast.error('Please enter your name');
    }
  };

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-100 p-4 mt-14"> {/* Light gray background */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white mt-16 rounded-lg shadow-lg p-8 border border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Name Edit */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                {/* GitHub and LinkedIn Links */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="github">
                    GitHub Link (Optional)
                  </label>
                  <input
                    id="github"
                    type="url"
                    onChange={e => setGithubUrl(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter GitHub profile URL"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="linkedin">
                    LinkedIn Link (Optional)
                  </label>
                  <input
                    id="linkedin"
                    type="url"
                    onChange={e => setLinkedinUrl(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter LinkedIn profile URL"
                  />
                </div>
                
                {/* Save Button */}
                <button className="w-full p-3 mt-4 bg-black  text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
