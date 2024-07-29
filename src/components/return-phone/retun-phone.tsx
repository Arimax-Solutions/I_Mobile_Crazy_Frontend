import React, { useState, useEffect } from 'react';
import TopNavbar from '../topNavbar';
import Combobox from '../combobox/combobox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../crudbuttons/buttons';
import Swal from "sweetalert2";
import axios from 'axios';
import { backend_url } from '../../utill/utill';

const storageOptions = [
    { value: '64GB', label: '64GB' },
    { value: '128GB', label: '128GB' },
    { value: '256GB', label: '256GB' },
    { value: '512GB', label: '512GB' },
    { value: '1TB', label: '1TB' },
];

const colourOptions = [
    { value: 'Gold', label: 'Gold' },
    { value: 'White', label: 'White' },
];

interface PhoneData {
    id: string;
    imeiNumber: string;
    model: string;
    storage: string;
    colour: string;
    reason: string;
    name: string;
    outstanding: string;
    date: string;
    contact: string;
}

export default function ReturnPhone() {
    const [imeiNumber, setImeiNumber] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [storage, setStorage] = useState<string>('');
    const [colour, setColour] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [outstanding, setOutstanding] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [contact, setContact] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [items, setItems] = useState<PhoneData[]>([]);
    const [selectedItem, setSelectedItem] = useState<PhoneData | null>(null);

    useEffect(() => {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }

        // Fetch data from the backend
        const fetchData = async () => {
            try {
                const response = await axios.get('${backend_url}/api/return/phones', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setItems(response.data);
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to fetch return phone data',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchData();
    }, [token]);

    const validateForm = (): boolean => {
        if (!imeiNumber || !name || !model || !colour || !storage || !colour || !reason || !outstanding || !date || !contact) {
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

   
    const handleItemDeleteOnClick = async() => {
        if (!selectedItem) {
            Swal.fire({
                title: 'Error!',
                text: 'No item selected for update',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (!validateForm()) return;

        try {
            const response = await axios.put(`${backend_url}/api/return/phone/${selectedItem.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Phone data delete successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete return phone data',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        const phoneData: PhoneData = {
            imeiNumber,
            model,
            storage,
            colour,
            reason,
            name,
            outstanding,
            date: date?.toISOString() || '',
            contact
        };

        try {
            const response = await axios.post('${backend_url}/api/return/phone', phoneData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.data.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Phone data saved successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save return phone data',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };


    //
    const handleItemUpdateOnClick = async () => {
        if (!selectedItem) {
            Swal.fire({
                title: 'Error!',
                text: 'No item selected for update',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (!validateForm()) return;

        const updatedPhoneData: PhoneData = {
            ...selectedItem,
            imeiNumber,
            model,
            storage,
            colour,
            reason,
            name,
            outstanding,
            date: date?.toISOString() || '',
            contact
        };

        try {
            const response = await axios.put(`${backend_url}/api/return/phone/${selectedItem.id}`, updatedPhoneData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Phone data updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                // Update the local state with the updated item
                setItems(prevItems =>
                    prevItems.map(item => item.id === selectedItem.id ? updatedPhoneData : item)
                );
            }

        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update return phone data',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleTableRowClick = (item: PhoneData) => {
        setSelectedItem(item);
        setImeiNumber(item.imeiNumber);
        setModel(item.model);
        setStorage(item.storage);
        setColour(item.colour);
        setReason(item.reason);
        setName(item.name);
        setOutstanding(item.outstanding);
        setDate(new Date(item.date));
        setContact(item.contact);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };


    const handleSearch = async () => {
        if (!imeiNumber) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter an IMEI Number',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await axios.get(`${backend_url}/api/imei/return/${imeiNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const phoneData = response.data;
            if (phoneData) {
                console.log(phoneData)
                setSelectedItem(phoneData);
                setModel(phoneData.model);
                setStorage(phoneData.storage);
                setColour(phoneData.colour);
                setName(phoneData.name);
                setContact(phoneData.contact);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found for the given IMEI Number',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to search for the IMEI Number',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
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
                        value={imeiNumber}
                        onChange={(ev) => setImeiNumber(ev.target.value)}
                        placeholder='   IMEI Number'
                        onKeyDown={handleKeyDown}

                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={model}
                        onChange={(ev) => setModel(ev.target.value)}
                        placeholder='   Model'
                    />
                    <Combobox
                        value={storage}
                        onChange={(ev) => setStorage(ev.target.value)}
                        options={storageOptions}
                        placeholder='Storage'
                    />
                </div>

                <div className='mt-3 flex flex-col sm:flex-row justify-between '>
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={contact}
                        onChange={(ev) => setContact(ev.target.value)}
                        placeholder='   Contact Number'
                    />
                    <DatePicker
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        selected={date}
                        onChange={(date) => setDate(date)}
                        placeholderText='   Date'
                        dateFormat='MM/dd/yyyy'
                        showPopperArrow={false}
                    />
                    <Combobox
                        value={colour}
                        onChange={(ev) => setColour(ev.target.value)}
                        options={colourOptions}
                        placeholder='  Colour'
                    />
                </div>

                <div className='mt-3 flex flex-col sm:flex-row justify-between'>
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={reason}
                        onChange={(ev) => setReason(ev.target.value)}
                        placeholder='   Reason'
                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        placeholder='   Name'
                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={outstanding}
                        onChange={(ev) => setOutstanding(ev.target.value)}
                        placeholder='   Outstanding'
                    />
                </div>
            </div>

            <div className='flex mt-5 gap-x-[3vw] justify-end'>
                <Button
                    onClick={handleSave}
                    className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                    iconSrc={'src/assets/icons/Add Btn.svg'}
                    iconAlt='add icon'
                >
                    ADD
                </Button>
                <Button
                    onClick={handleItemDeleteOnClick}
                    className='buttons-styles bg-red-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                    iconSrc={'src/assets/icons/Delete Btn.svg'}
                    iconAlt='delete icon'
                >
                    DELETE
                </Button>
                <Button
                    onClick={handleItemUpdateOnClick}
                    className='buttons-styles bg-blue-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                    iconSrc={'src/assets/icons/Update Btn.svg'}
                    iconAlt='update icon'
                >
                    UPDATE
                </Button>
            </div>

            {/* table */}
            <div className='mt-5 overflow-auto max-h-[50vh]'>
                <table className='w-full text-white'>
                    <thead>
                        <tr>
                            <th className='p-2 border'>Model</th>
                            <th className='p-2 border'>IMEI Number</th>
                            <th className='p-2 border'>Storage</th>
                            <th className='p-2 border'>Colour</th>
                            <th className='p-2 border'>Name</th>
                            <th className='p-2 border'>Outstanding</th>
                            <th className='p-2 border'>Date</th>
                            <th className='p-2 border'>Contact</th>
                            <th className='p-2 border'>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className='cursor-pointer' onClick={() => handleTableRowClick(item)}>
                                <td className='p-2 border'>{item.model}</td>
                                <td className='p-2 border'>{item.imeiNumber}</td>
                                <td className='p-2 border'>{item.storage}</td>
                                <td className='p-2 border'>{item.colour}</td>
                                <td className='p-2 border'>{item.name}</td>
                                <td className='p-2 border'>{item.outstanding}</td>
                                <td className='p-2 border'>{item.date}</td>
                                <td className='p-2 border'>{item.contact}</td>
                                <td className='p-2 border'>{item.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
