'use client'

import React, { useState } from 'react';
import { Login2FA } from './login2fa';

const Auth2FA = () => {
    return (
        <div className="flex justify-center items-center h-full authCard">
            <Login2FA></Login2FA>
        </div>
    )
}

export default Auth2FA;
