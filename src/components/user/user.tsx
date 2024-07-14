import React, { useEffect, useState } from 'react';
import InputFields from '../input/inputFeild';
import Combobox from '../combobox/combobox';
import TopNavbar from '../topNavbar';
import Button from '../crudbuttons/buttons';
import Swal from "sweetalert2";
import axios from 'axios';
import { backend_url } from '../../utill/utill';

interface UserData {
    user_id: number;
    name: string;
    role: string;
    contact_number: string;
    email: string;
    username: string;
    password: string;
}

const User: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null); // Track selected user
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [contact_number, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const roleOptions = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' },
        // Add more roles as needed
    ];

    // validate inputs
    const validateForm = (): boolean => {
        if (!name || !contact_number || !email || !username || !password) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all fields',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
        return true;
    };

    // fetch users
    const fetchItems = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setToken(token);
            try {
                const response = await axios.get(`${backend_url}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data && Array.isArray(response.data.data)) {
                    setUsers(response.data.data);
                } else {
                    console.error('Invalid data format received from server:', response.data);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        } else {
            console.log('No token found');
        }
    };

    // add users 
    const handleAddUser = async () => {
        const newUser = {
            name,
            role,
            contact_number,
            email,
            username,
            password,
        };

        if (!validateForm()) {
            return;
        }
        console.log(newUser)

        try {
            const response = await axios.post(`${backend_url}/auth/register`, newUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data.data)
            if(response.data.data!=null){
                // Show success alert
                Swal.fire({
                    title: 'Success!',
                    text: 'User added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Clear input fields after successful addition
                setName('');
                setUsername('');
                setPassword('');
                setContactNumber('');
                setEmail('');
                fetchItems();
            }
           
        } catch (error) {
            console.error('Error adding user:', error);

            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add user',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // delete users 
    const handleItemDeleteOnClick = async (userId: number) => {
        if (!validateForm()) {
            return;
        }
        try {
            await axios.delete(`${backend_url}/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

           
            const updatedUsers = users.filter(user => user.user_id !== userId);
            setUsers(updatedUsers);
            setSelectedUser(null);

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'User deleted successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setName('');
            setUsername('');
            setPassword('');
            setContactNumber('');
            setEmail('');
            fetchItems();

        } catch (error) {
            console.error('Error deleting user:', error);

            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete user',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleItemUpdateOnClick = async () => {
        const newUser = {
            name,
            role,
            contact_number,
            email,
            username,
            password,
        };

        if (!validateForm()) {
            return;
        }


        try {
            const response = await axios.put(`${backend_url}/api/users/${selectedUser?.user_id}`, newUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            Swal.fire({
                title: 'Success!',
                text: 'User updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setName('');
            setUsername('');
            setPassword('');
            setContactNumber('');
            setEmail('');
            fetchItems();

        } catch (error) {
            console.error('Error updating user:', error);

            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update user',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleTableRowClick = (user: UserData) => {
        setSelectedUser(user);
        setName(user.name);
        setRole(user.role);
        setContactNumber(user.contact_number);
        setEmail(user.email);
        setUsername(user.username);
        setPassword(user.password);
    };

    return (
        <div className='m-4 w-full'>
            <div className='m-4'>
                <TopNavbar />
            </div>
            <div className='flex items-center justify-between mt-5 my-[5vh]'>
                <InputFields value={name} onChange={(event) => setName(event.target.value)} placeholder="   Name" />
                <Combobox value={role} onChange={(event) => setRole(event.target.value)} options={roleOptions} placeholder="   Select Role" />
                <InputFields value={contact_number} onChange={(event) => setContactNumber(event.target.value)} placeholder="   Contact Number" />
            </div>
            <div className='flex items-center justify-between'>
                <InputFields value={email} onChange={(event) => setEmail(event.target.value)} placeholder="   Email" />
                <InputFields value={username} onChange={(event) => setUsername(event.target.value)} placeholder="   Username" />
                <InputFields value={password} onChange={(event) => setPassword(event.target.value)} placeholder="   Password" />
            </div>
            <div className='flex mt-5 justify-end'>
                <Button
                    onClick={() => handleAddUser()}
                    className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                    iconSrc={'src/assets/icons/Add Btn.svg'}
                    iconAlt='add icon'
                >
                    ADD
                </Button>
                <Button
                    onClick={() => handleItemDeleteOnClick(selectedUser?.user_id || 0)} // Ensure to pass a default value if selectedUser is null
                    className='mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                    iconSrc={'src/assets/icons/Delete Btn.svg'}
                    iconAlt='delete icon'
                >
                    DELETE
                </Button>
                <Button
                    onClick={() => handleItemUpdateOnClick()}
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
                        {users.map(user => (
                            <tr
                                key={user.user_id}
                                className=' text-white font-semibold hover:bg-gray-50 cursor-pointer'
                                onClick={() => handleTableRowClick(user)} // Set selected user on row click
                            >
                                <td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-500'>{user.user_id}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.name}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.role}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.contact_number}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.email}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.username}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{user.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;
