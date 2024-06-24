'use client'

import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { GET_ACCOUNT } from '../lib/qraphql';

const Profile = () => {

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (user && user._id) {
            getAccount({variables: {userId: user._id}});
        }
    }, []);

    const [ getAccount, {data} ] = useLazyQuery(GET_ACCOUNT);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-6">
            <div className="flex items-center justify-center">
            <img
                className="h-24 w-24 rounded-full object-cover border-4 border-white"
                src="user.jpeg"
                alt="Profile Picture"
            />
            </div>
            <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">{data?.myProfile?.name}</h2>
            <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque erat in blandit luctus.</p>
            </div>
            <div className="mt-6">
            <h3 className="text-gray-800 text-sm font-semibold">Contact Information</h3>
            <div className="mt-2 text-gray-700 text-sm">
                <p>Email: {data?.myProfile?.email}</p>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Profile
