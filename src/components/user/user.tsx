// src/user/User.tsx
import React, { useState } from 'react';
import InputFields from '../input/inputFeild';
import '../user/user.css';

const User = () => {
    const [token, setToken] = useState('');

    return (
        <div className='flex'>
            <InputFields value={token} onChange={(event) => setToken(event.target.value)} placeholder="user" />
            <InputFields value={token} onChange={(event) => setToken(event.target.value)} placeholder="user" />
            <InputFields value={token} onChange={(event) => setToken(event.target.value)} placeholder="user" />
        </div>
    );
}

export default User;
