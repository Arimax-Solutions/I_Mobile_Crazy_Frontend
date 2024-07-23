import React, { useState, useEffect } from 'react';
import TopNavbar from '../topNavbar';
import Combobox from '../combobox/combobox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../crudbuttons/buttons';
import Swal from "sweetalert2";
import axios from 'axios';

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

export default function ReturnPhone() {
    const [imeiNumber, setImeiNumber] = useState('');
    const [model, setModel] = useState('');
    const [storage, setStorage] = useState('');
    const [colour, setColour] = useState('');
    const [reason, setReason] = useState('');
    const [name, setName] = useState('');
    const [outstanding, setOutstanding] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [contact, setContact] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        // Retrieve token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

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

    const handleItemUpdateOnClick= () =>{

    }
    const handleItemDeleteOnClick= () =>{

    }
    const handleSave = async () => {
      
        if (!validateForm()) return;

        const phoneData = {
            imeiNumber,
            model,
            storage,
            colour,
            reason,
            name,
            outstanding,
            date,
            contact
        };

        try {
            const response = await axios.post('${backend_url}/api/phones', phoneData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            Swal.fire({
                title: 'Success!',
                text: 'Phone data saved successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save phone data',
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
                        value={model}
                        onChange={(ev) => setModel(ev.target.value)}
                        placeholder='   Model'
                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={imeiNumber}
                        onChange={(ev) => setImeiNumber(ev.target.value)}
                        placeholder='   IMEI Number'
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
        </div>
    );
}
