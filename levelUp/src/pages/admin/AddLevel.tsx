import React, { useEffect } from 'react'
import HeaderAdmin from '../../components/headerAdmin'
import AdminSideBar from '../../components/adminSideBar'
import { useNavigate, useParams } from 'react-router-dom';
import useGetAdmin from '../../hook/useGetAdmin';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { addLevel } from '../../Api/subject';
const AddLevel:React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
    const navigate = useNavigate();
    const currentuser = useGetAdmin();
    const {id}=useParams()
    useEffect(() => {
        console.log(currentuser, 'current user');
        if (!currentuser) {
            navigate('/admin');
        }
    }, [currentuser, navigate]);
    const onSubmit = async (data:any)=>{
        try {
            data.subjectId=id
            data.image=data.image[0]
            console.log(data)
            const res:any = await addLevel(data)
            if(res.data.succuss){
                navigate(`/admin/listLevel/${id}`)
            }
        } catch (error) {
            
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
                                <h2 className="text-3xl font-bold mb-8 text-gray-800">Create Level</h2>
                                <div className="mb-5">
                                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                                    <input type="text" id="subject" {...register('name', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Subject" required />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                                    <input type="file" id="image"  accept='image/*' {...register('image', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="videodescription" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <textarea id="videoDescription" {...register('videoDescription', { required: true })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a description..."></textarea>
                                    {errors.description && <span className="text-red-600">This field is required</span>}
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create new Course</button>
                            </Form>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default AddLevel
