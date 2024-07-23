'use client';

import { useMutation } from '@apollo/client';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CREATE_ACCOUNT } from '../lib/qraphql';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function Signup() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ createAccountMutation, {loading, error} ] = useMutation(CREATE_ACCOUNT);

    const signup = async (formData: any) => {
        try {
            const { data } = await createAccountMutation({
                variables: {name: formData.username,email: formData.email,password: formData.password},
            });

            sessionStorage.setItem('token', data.createAccount.accessToken)
            sessionStorage.setItem('user', JSON.stringify(data.createAccount))

            // Set cookies for token and user data
            Cookies.set('valid2fa', data.createAccount.authEnabled);

            router.push('/2fa')
        } catch(error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(signup)}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="John Doe"
                        {...register('username', { required: true })}
                    />
                    {errors.username && <p className='text-red-600'>Username is required</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="john.doe@example.com"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <p className='text-red-600'>Email is required</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500"
                        placeholder="********"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <p className='text-red-600'>Password is required</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
                    >
                        Sign up
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}
