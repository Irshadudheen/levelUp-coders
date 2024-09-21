import React, { useEffect } from 'react'
import HeaderAdmin from './headerAdmin'
import AdminSideBar from './adminSideBar'
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { uploadVideo } from '../Api/subject';
import { useNavigate, useParams } from 'react-router-dom';
import useGetAdmin from '../hook/useGetAdmin';

const UploadVideo:React.FC = () => {
    const navigate = useNavigate()
    const currentuser = useGetAdmin();
    useEffect(() => {
        console.log(currentuser, 'current user');
        if (!currentuser) {
            navigate('/admin');
        }
    }, [currentuser, navigate]);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
    const {id}=useParams()
    const  onSubmit=async(data:any)=>{
        const formData = new FormData()
        formData.append('image',data.image[0])
        formData.append('name',data.name)
        console.log(data)
        formData.append('videoDescription',data.videoDescription)
        formData.append('levelId',id)
    const res= await uploadVideo(formData)
    console.log(res)
    if(res._id){
        navigate(-1)
    }
    }
    return (
    <div>
      <HeaderAdmin/>
        <div className="flex flex-1">
            <AdminSideBar/>
            <div className="flex-1 p-10 shadow-md rounded-lg">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome to Admin</h2>
                    <div className="grid md:grid-cols-2 gap-14">
                        <div className="border bg-blue-100 rounded-lg border-gray-400 w-full min-h-[500px] flex items-center justify-center">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className="text-3xl font-bold mb-8 text-gray-800">Upload Video</h2>
                                <div className="mb-5">
                                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Video Name</label>
                                    <input type="text" id="subject" {...register('name', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Video name" required />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Video</label>
                                    <input type="file" id="image"   {...register('image', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="videodescription" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <textarea id="videoDescription" {...register('videoDescription', { required: true })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a description..."></textarea>
                                    {errors.description && <span className="text-red-600">This field is required</span>}
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Upload Video</button>
                            </Form>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default UploadVideo
