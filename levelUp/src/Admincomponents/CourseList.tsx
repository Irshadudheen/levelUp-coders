import React, { useEffect, useState } from 'react';
import HeaderAdmin from './headerAdmin';
import AdminSideBar from './adminSideBar';
// import { getAllSubject, updateSubject } from '../Api/subject';
import { useNavigate } from 'react-router-dom';
import useGetAdmin from '../hook/useGetAdmin';
import { getAllSubject,updateSubject ,actionToSubject} from '../Api/subject';

const CourseList = () => {
  const [subjects, setSubjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [updateSubjectState, setUpdatedSubject] = useState({ name: '', description: '', image: '', categoryId: '' });
  const [action,setAction]=useState('block')
  const navigate = useNavigate();
  const currentuser = useGetAdmin();
  
  useEffect(() => {
    if (!currentuser) {
      navigate('/admin');
    }
  }, [currentuser, navigate]);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllSubject();
        setSubjects(res.data);
        console.log(subjects)
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCourses();
  }, []);
  
  const handleEditClick = (subject) => {
    setCurrentSubject(subject);
    setUpdatedSubject({ 
      name: subject.name, 
      description: subject.description, 
      image: subject.image, 
      categoryId: subject?.categoryId?.name 
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    setUpdatedSubject({
      ...updateSubjectState,
      [e.target.name]: e.target.value,
    });
  };
const handleListCourse = async (subject) => {
  try {
    console.log(subject, 'the action subject');
    
    // Call the API to toggle the block/unblock status of the subject
    const res = await actionToSubject(subject._id);
    console.log(res.data, 'updated subject'); // Assuming response contains updated subject
    const response = await getAllSubject();
        setSubjects(response.data);
    // Update the state with the modified subject

  } catch (error) {
    console.log(error.message);
  }
};
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      console.log(updateSubjectState,currentSubject)
      if(!currentSubject) return 
      await updateSubject(currentSubject._id as string, updateSubjectState); // Update the subject using API
      setIsEditModalOpen(false); // Close the modal
      const updatedSubjects = subjects.map(subject =>
        subject._id === currentSubject._id ? { ...subject, ...updateSubjectState } : subject
      );
      setSubjects(updatedSubjects); // Update the local state with the new data
    } catch (error) {
      console.error('Error updating course:', error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      <HeaderAdmin />
      <div className="flex flex-1">
        <AdminSideBar />
        <div className="flex-1 p-10 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to Course</h2>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3">Subject name</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Edit</th>
                  <th className='px-6 py-3'>action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, i) => (
                  <tr key={subject._id} className={i % 2 === 0 ? 'bg-gray-50 border-b' : 'bg-gray-100 border-b'}>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{subject.name}</th>
                    <td className="px-6 py-4">{subject.description}</td>
                    <td className="px-6 py-4">
                      <img src={subject.image} width={50} height={50} alt={subject.name} />
                    </td>
                    <td className="px-6 py-4">{subject?.categoryId?.name}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/admin/listLevel/${subject._id}`)}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        List Level
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleEditClick(subject)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Edit Course
                      </button>
                    </td>
                    <td>
                    <button onClick={()=>handleListCourse(subject)} className="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5">{subject.is_blocked?'block':'unblock'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => navigate(`/admin/addCourse`)}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add Course
            </button>
          
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900">Edit Course</h3>
            <form onSubmit={handleUpdateCourse} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Course Name</label>
                <input
                  type="text"
                  name="name"
                  value={updateSubjectState.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Description</label>
                <textarea
                  name="description"
                  value={updateSubjectState.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={updateSubjectState.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Category</label>
                <input
                  type="text"
                  name="categoryId"
                  value={updateSubjectState.categoryId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
