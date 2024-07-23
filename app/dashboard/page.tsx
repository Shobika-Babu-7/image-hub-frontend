'use client'

import { useLazyQuery, useMutation } from "@apollo/client";
import { DELETE_IMAGE, GET_IMAGES, UPLOAD_IMAGE } from "../lib/qraphql";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Gallery from "./gallery";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ getImages, {data, error, refetch} ] = useLazyQuery(GET_IMAGES);
    const [ uploadImageMutation, {loading: uploading} ] = useMutation(UPLOAD_IMAGE);
    const [ deleteImageMutation, {loading: deleting} ] = useMutation(DELETE_IMAGE);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (user && user._id) {
            fetchImages(user)
        } else router.push('/')
    }, []);

    if (error) {
        console.error('GraphQL error:', error.message);
        if(error.message?.toLowerCase() === "session expired") {
            sessionStorage.clear();
            router.push('/')
        }
        toast.error(error.message);
    }

    const fetchImages = async (user: any) => {
        try {
            await getImages({variables: {user: user._id}});
            console.log('done')
        } catch(error: any) {
            console.log('err', error)
            toast.error(error.message);
        }
    }

    const uploadImage = async (formData: any) => {
        try {
            await uploadImageMutation({
                variables: {file: formData?.file[0]},
            });

            refetch();
        } catch(error: any) {
            toast.error(error.message);
        }
    }

    const deleteImage = async(id: string) => {
        try {
            await deleteImageMutation({
                variables: {picId: id},
            });

            refetch();
        } catch(error: any) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-8 text-center mb-32">Image Hub</h1>
            <h5 className="text-xl font-bold mb-8 mb-22">Upload image</h5>
            <div className="flex items-center justify-center mb-22">
                <form 
                    onSubmit={handleSubmit(uploadImage)} 
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-300"
                >
                    <div className="mb-4">
                    <label 
                        className="block text-sm font-medium text-gray-700 mb-2" 
                        htmlFor="file"
                    >
                        Upload Image
                    </label>
                    <input 
                        type="file" 
                        {...register('file', { required: true })} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                    {errors.file && <p className='text-red-600'>Choose any file</p>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={uploading}
                        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Upload Image
                    </button>
                </form>
            </div>
            <Gallery images={data?.getAllMyUploadedPictures} onDelete={deleteImage}></Gallery>
        </>
        
    )
}