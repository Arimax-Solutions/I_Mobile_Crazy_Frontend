// src/user/User.tsx
import React, { useState } from 'react';
import InputFields from '../input/inputFeild';
import Combobox from '../combobox/combobox';
import TopNavbar from '../topNavbar';
import Button from '../crudbuttons/buttons';
import '../user/user.css';

const User = () => {

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', role: 'Admin', contactNumber: '1234567890', email: 'john@example.com', userName: 'johndoe', password: 'password123' },
        // Add more user objects as needed
    ]);

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const roleOptions = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' },
        // Add more roles as needed
    ];

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            name,
            role,
            contactNumber,
            email,
            userName,
            password,
        };
        setUsers([...users, newUser]);
    };

    const handleItemAddOnClick = () => handleAddUser();
    const handleItemDeleteOnClick = () => { /* Delete user logic */ };
    const handleItemUpdateOnClick = () => { /* Update user logic */ };

    return (
        <div className='m-4 w-full'>
            <div className='m-4'>
                <TopNavbar />
            </div>
            <div className='flex items-center justify-between mt-5 my-[5vh]'>
                <InputFields value={name} onChange={(event) => setName(event.target.value)} placeholder="   Name" />
                <Combobox value={role} onChange={(event) => setRole(event.target.value)} options={roleOptions} placeholder="   Select Role" />
                <InputFields value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="   Contact Number" />
            </div>
            <div className='flex items-center justify-between'>
                <InputFields value={email} onChange={(event) => setEmail(event.target.value)} placeholder="   Email" />
                <InputFields value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="   Username" />
                <InputFields value={password} onChange={(event) => setPassword(event.target.value)} placeholder="   Password" />
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

            {/* Table to display users */}
            <div className='mt-5'>
                <table className='min-w-full divide-y table-styles'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Id</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Role</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact Number</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Username</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className=' text-white font-semibold hover:bg-gray-50'
                            >
                                <td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-500'>{user.id}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.name}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.role}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.contactNumber}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.userName}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




        </div>
    );
}

export default User;
