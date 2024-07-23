'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { GENERATE_QR } from '../lib/qraphql';
import { Login2FA } from './login/page';

const Verify2FA = () => {
    const [qrCode, setQRCode] = useState('');
    const [ generateQrCode ] = useMutation(GENERATE_QR);

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user') || "{}")
        generateQrCode({variables: {userId: user._id}}).then((response): void => {
            setQRCode(response?.data?.generateQrCode?.qrCodeUrl)
        })
    }, []);

    return (
        <div className='h-full'>
            <div className="flex justify-center items-center h-full">
            <div className="authBox">
                <h2>Two-Factor Authentication Setup</h2>
                <p className='m-5'>Scan the QR code below with Google authenticator app.</p>
                <div className="flex">
                    <div>
                        {qrCode ? (
                            <img src={qrCode} alt="QR Code" className="qrCode" />
                        ) : (
                            <p>Loading QR code...</p>
                        )}
                         <p>Once scanned, enter the code from the app and verify.</p>
                    </div>
                    <div className="vertical-line"></div>
                    <Login2FA></Login2FA>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Verify2FA;
