// ReturnItem.tsx

import React, {useState} from 'react';
import TopNavbar from "../topNavbar.tsx";
import Combobox from "../combobox/combobox.tsx";
import Button from "../crudbuttons/buttons.tsx";
import axios from "axios";
import {backend_url} from "../../utill/utill.ts";
import Swal from "sweetalert2";


const brandOptions = [
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Apple', label: 'Apple' },
    { value: 'OMS', label: 'OMS' },
];

interface ReturnPhones {
    return_phone_id : number;
    brand: string;
    category: string;
    contact_number: string;
    name: string;
    reason: string;
}

export default function ReturnItem()  {
    const [returnPhones, setReturnPhones] = useState<ReturnPhones[]>([]);
    const [selectedReturnPhone, setSelectedReturnPhone] = useState<ReturnPhones | null>(null);
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [contact_number, setContact_number] = useState<string>('');
    const [token, setToken] = useState('');


    const fetchReturnItem = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setToken(token);
            try {
                const response = await axios.get(`${backend_url}/api/returnItem`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data && Array.isArray(response.data.data)) {
                    setReturnPhones(response.data.data);
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

    const handleAddReturnItem = async () => {
        const newUser = {
            category,
            name,
            brand,
            reason,
            contact_number
        };

        try {
            const response = await axios.post(`${backend_url}/api/returnItem`, newUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.data.data != null) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Item added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setName('');
                setCategory('');
                setBrand('');
                setReason('');
                setContact_number('');
                fetchReturnItem();            }
        } catch (error) {
            console.error('Error adding user:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add user',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    const handleTableRowClick = (user: ReturnPhones) => {
        setSelectedReturnPhone(user);
        setBrand(user.brand);
        setCategory(user.category);
        setContact_number(user.contact_number);
        setName(user.name);
        setReason(user.reason);
    };

        return (
            <div className='m-4 w-full'>
                <div className="m-4">
                    <TopNavbar />
                </div>

                {/* inputs */}
                <div className='text-white font-semibold'>
                    <div className='mt-5 flex flex-col sm:flex-row justify-between '>
                        <input
                            className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                            value={category}
                            onChange={(ev) => setCategory(ev.target.value)}
                            placeholder='   Category'
                        />
                        <input
                            className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                            placeholder='   Name'
                        />
                        <Combobox
                            value={brand}
                            onChange={(ev) => setBrand(ev.target.value)}
                            options={brandOptions}
                            placeholder='  Brand'
                        />
                    </div>

                    <div className='mt-3 flex flex-col sm:flex-row justify-between'>
                        <div>
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[45%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={reason}
                                onChange={(ev) => setReason(ev.target.value)}
                                placeholder='Reason'
                            />
                        </div>

                        <input
                            className='text-feild mb-4 md:mb-0 md:w-[45%] lg:mx-2 md:mx-2 sm:mx-1'
                            value={contact_number}
                            onChange={(ev) => setContact_number(ev.target.value)}
                            placeholder='Contact'
                        />
                    </div>
                </div>
                <div className='flex mt-5 justify-end'>
                    <Button
                        onClick={() => handleAddReturnItem()}
                        className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                        iconSrc={'src/assets/icons/Add Btn.svg'}
                        iconAlt='add icon'
                    >
                        ADD
                    </Button>
                    {/*<Button
                        onClick={() => handleItemDeleteOnClick(selectedUser?.user_id || 0)}
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
                    </Button>*/}
                </div>

                {/* Table to display users */}
                <div className='mt-5 w-[78vw] overflow-x-auto'>
                    <table className='min-w-full divide-y table-styles'>
                        <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Id</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Brand</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact Number</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Reson</th>
                        </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                        {returnPhones.map((user) => (
                            <tr key={user.return_phone_id} onClick={() => handleTableRowClick(user)} className='hover:bg-gray-200 cursor-pointer'>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.return_phone_id}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.brand}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.category}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.contact_number}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{user.reason}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );

}

