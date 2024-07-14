// src/user/User.tsx
import React, { useState } from 'react';
import InputFields from '../input/inputFeild';
import '../user/user.css';
import TopNavbar from '../topNavbar';
import Button from '../crudbuttons/buttons';
import Combobox from '../combobox/combobox';


const User = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        // { value: 'guest', label: 'Guest' }
    ];

    const handleItemAddOnClick = () => {
        // Add item logic
    };

    const handleItemDeleteOnClick = () => {
        // Delete item logic
    };

    const handleItemUpdateOnClick = () => {
        // Update item logic
    };

    return (
        <div className='m-4 w-full'>
            <div className='m-4'>
                <TopNavbar />
            </div>
            <div className='flex items-center justify-between mt-5 my-[5vh]'>
                <InputFields value={name} onChange={(event) => setName(event.target.value)} placeholder="   name" />
                <Combobox value={role} onChange={(event) => setRole(event.target.value)} options={roleOptions} placeholder="   Select Role" />
                <InputFields value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="   Contact Number" />
            </div>
            <div className='flex items-center justify-between'>
                <InputFields value={email} onChange={(event) => setEmail(event.target.value)} placeholder="   email" />
                <InputFields value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="   userName" />
                <InputFields value={password} onChange={(event) => setPassword(event.target.value)} placeholder="   password" />
            </div>
            <div className='flex mt-5 justify-end'>
                <Button 
                    onClick={handleItemAddOnClick} 
                    className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center' 
                    iconSrc={'src/assets/icons/Add Btn.svg'} 
                    iconAlt='add icon'
                >
                    ADD
                </Button>
                <Button 
                    onClick={handleItemDeleteOnClick} 
                    className='mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center' 
                    iconSrc={'src/assets/icons/Delete Btn.svg'} 
                    iconAlt='delete icon'
                >
                    DELETE
                </Button>
                <Button 
                    onClick={handleItemUpdateOnClick} 
                    className='buttons-styles bg-blue-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center' 
                    iconSrc={'src/assets/icons/Update Btn.svg'} 
                    iconAlt='update icon'
                >
                    UPDATE
                </Button>
            </div>
        </div>
    );
}

export default User;
