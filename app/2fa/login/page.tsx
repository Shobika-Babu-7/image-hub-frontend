'use client'

import { VERIFY_ACCOUNT } from '@/app/lib/qraphql';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export const Login2FA = () => {
    const [code, setCode] = useState('');
    const [ verifyToken ] = useMutation(VERIFY_ACCOUNT);

    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            let user = JSON.parse(sessionStorage.getItem('user') || "{}")
            const { data } = await verifyToken({variables: {code, userId: user._id}});
            console.log(data)
            sessionStorage.setItem('user', JSON.stringify({...user, authEnabled: data.verifyToken?.user?.authEnabled}))
            // Set cookies for token and user data
            Cookies.set('valid2fa', data.verifyToken?.user?.authEnabled);
            router.push('/dashboard')
        } catch(error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-white">
            <h2>Two-Factor Authentication</h2>
            <p>Please enter the 6-digit code from your Google authenticator app.</p>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 2FA code"
                    className="input"
                />
                <button type="submit" className="button">Verify</button>
            </form>
        </div>
    );
};

const Auth2FA = () => {
    return (
        <div className="flex justify-center items-center h-full authCard">
            <Login2FA></Login2FA>
        </div>
    )
}

export default Auth2FA;
