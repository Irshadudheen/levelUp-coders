import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetAdmin from '../hook/useGetAdmin';
import { useForm } from 'react-hook-form';
import HeaderAdmin from './headerAdmin';
import AdminSideBar from './adminSideBar';
import { Form } from 'react-bootstrap';
import { addSubject } from '../Api/admin';
import { getAllCategory } from '../Api/subject';

const Subject: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
    const [categorys, setCategory] = useState([])
    const [selectedCategory,setSelectedCategory]=useState('')
    const currentuser = useGetAdmin();

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await getAllCategory()
            setCategory(res)
            setSelectedCategory(res[0]._id)
            console.log(res)
        }
        fetchCategory()
    }, [])
    useEffect(() => {
        console.log(currentuser, 'current user');
        if (!currentuser) {
            navigate('/admin');
        }
    }, [currentuser, navigate]);

    const onSubmit = async (data: any) => {
        try {
            console.log("Form submitted, data received:", data);
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('image', data.image[0]);
            formData.append('categoryId',selectedCategory)
            console.log("FormData object:", formData);
            console.log(data.image);

            // Sending formData directly to the API
            const res = await addSubject(formData);
            console.log(res?.data)
            if (res?.data.succuss) {
                navigate('/admin/course')
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
            <HeaderAdmin />
            <div className="flex flex-1">
                <AdminSideBar />
                <div className="flex-1 p-10 shadow-md rounded-lg">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Welcome to Admin</h2>
                    <div className="grid md:grid-cols-2 gap-14">
                        <div className="border bg-blue-100 rounded-lg border-gray-400 w-full min-h-[500px] flex items-center justify-center">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className="text-3xl font-bold mb-8 text-gray-800">Create Subject</h2>
                                <div className="mb-5">
                                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                                    <input type="text" id="subject" {...register('name', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Subject" required />
                                    {errors.name && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                                    <input type="file" id="image" accept='image/*' {...register('image', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    {errors.image && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="category" className='block mb-2 text-sm font-medium text-gray-900'>Category</label>
                                    <select name="category" onChange={e=>setSelectedCategory(e.target.value)} className="w-32" id="category-select">
                                        {categorys.length > 0 &&
                                            categorys.map((category, index) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                          
                                    </select>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                    <textarea id="description" {...register('description', { required: true })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a description..."></textarea>
                                    {errors.description && <span className="text-red-600">This field is required</span>}
                                </div>
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create new Course</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subject;
