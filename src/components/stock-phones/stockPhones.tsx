import React, { useState, useEffect } from 'react';
import TopNavbar from '../topNavbar';
import Combobox from '../combobox/combobox';
import Button from '../crudbuttons/buttons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { backend_url } from '../../utill/utill';

// Define the Phone type
interface Phone {
    id: number;
    name: string;
    description: string;
    qty: number;
    model: string;
    imeiNumber: string;
    storage: string;
    iosVersion: string;
    batteryHealth: string;
    colour: string;
}

interface NewPhone {
    name: string;
    description: string;
    qty: number;
    models: phoneModels[];
}

interface phoneModels {
    name: string;
    stockAddedDate: string;
    imeiNumbers: iminumberPhones[];
}

interface iminumberPhones {
    imei: number;
    storage: string;
    colour: string;
    ios_version: string;
    battery_health: number;
}

export default function StockPhones() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [stockName, setStockName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [model, setModel] = useState('');
    const [imeiNumber, setImeiNumber] = useState('');
    const [storage, setStorage] = useState('');
    const [iosVersion, setIosVersion] = useState('');
    const [batteryHealth, setBatteryHealth] = useState('');
    const [colour, setColour] = useState('');
    const [token, setToken] = useState('');
    const [phones, setPhones] = useState<Phone[]>([]);
    const [selectedPhone, setSelectedPhone] = useState<Phone | null>(null);
    const [phoneModels, setPhoneModels] = useState<phoneModels[]>([]);
    const [modelsTable, setModelsTable] = useState<phoneModels[]>([]);

    const colourOptions = [
        { value: 'Gold', label: 'Gold' },
        { value: 'White', label: 'White' },
    ];

    const storageOptions = [
        { value: '64GB', label: '64GB' },
        { value: '128GB', label: '128GB' },
        { value: '256GB', label: '256GB' },
        { value: '512GB', label: '512GB' },
        { value: '1TB', label: '1TB' },
    ];

    useEffect(() => {
        fetchItems();
    }, []);

    const validateForm = (): boolean => {
        if (!stockName || !description || !quantity || !model || !imeiNumber || !storage || !iosVersion || !batteryHealth || !colour) {
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

    const fetchItems = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setToken(token);
            try {
                const response = await axios.get(`${backend_url}/api/stock`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data && Array.isArray(response.data.data)) {
                    setPhones(response.data.data);
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

    const handleAddPhone = () => {
        if (!validateForm()) return;

        const newPhoneModel: phoneModels = {
            name: model,
            stockAddedDate: formattedDate,
            imeiNumbers: [
                {
                    imei: parseInt(imeiNumber),
                    storage: storage,
                    colour: colour,
                    ios_version: iosVersion,
                    battery_health: parseInt(batteryHealth),
                },
            ],
        };
        
        setPhoneModels([...phoneModels, newPhoneModel]);
        setModelsTable([...modelsTable, newPhoneModel]); 
    };

    const handlePushOnClick = async () => {
        const newPhone: NewPhone = {
            name: stockName,
            description: description,
            qty: parseInt(quantity),
            models: phoneModels,
        };
        try {
            const response = await axios.post(`${backend_url}/api/stock`, newPhone, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status==201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Phone added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                setPhones([...phones, response.data.data]);
                setStockName('');
                setDescription('');
                setQuantity('');
                setPhoneModels([]);
                setModelsTable([]); // Clear the table state
            }
        } catch (error) {
            console.error('Error adding phone:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add phone',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleItemUpdateOnClick = async () => {
        if (!selectedPhone) return;

        const updatedPhone: Phone = {
            ...selectedPhone,
            name: stockName,
            description: description,
            qty: parseInt(quantity),
            model: model,
            imeiNumber: imeiNumber,
            storage: storage,
            iosVersion: iosVersion,
            batteryHealth: batteryHealth,
            colour: colour,
        };

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.put(`${backend_url}/api/stock/${selectedPhone.id}`, updatedPhone, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Phone updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                const updatedPhones = phones.map(phone => phone.id === selectedPhone.id ? response.data.data : phone);
                setPhones(updatedPhones);
                setSelectedPhone(null);
                setStockName('');
                setDescription('');
                setQuantity('');
                setModel('');
                setImeiNumber('');
                setStorage('');
                setIosVersion('');
                setBatteryHealth('');
                setColour('');
            }
        } catch (error) {
            console.error('Error updating phone:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update phone',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleItemDeleteOnClick = async (phoneId: number) => {
        if (!selectedPhone) return;

        try {
            await axios.delete(`${backend_url}/api/stock/${phoneId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const updatedPhones = phones.filter(phone => phone.id !== phoneId);
            setPhones(updatedPhones);
            setSelectedPhone(null);

            Swal.fire({
                title: 'Success!',
                text: 'Phone deleted successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setStockName('');
            setDescription('');
            setQuantity('');
            setModel('');
            setImeiNumber('');
            setStorage('');
            setIosVersion('');
            setBatteryHealth('');
            setColour('');
        } catch (error) {
            console.error('Error deleting phone:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete phone',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleTableRowClick = async (phone: Phone) => {
        setSelectedPhone(phone);
        setStockName(phone.name);
        setDescription(phone.description);
        setQuantity(phone.qty.toString());
        
        try {
            const response = await axios.get(`${backend_url}/api/stock/models/${phone.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // Assuming response.data is the array of models
            if (Array.isArray(response.data)) {
                setModelsTable(response.data);
            } else {
                console.error('Invalid data format received from server:', response.data);
            }
        } catch (error) {
            console.error('Error fetching phone models:', error);
        }
    };
    
    // Function to handle clicks on the model table rows
    const handleModelTableRowClick = (model: phoneModels) => {
        setModel(model.name);
        if (model.imeiNumbers.length > 0) {
            const imeiData = model.imeiNumbers[0];
            setImeiNumber(imeiData.imei.toString());
            setStorage(imeiData.storage);
            setIosVersion(imeiData.ios_version);
            setBatteryHealth(imeiData.battery_health.toString());
            setColour(imeiData.colour);
        }
    };


    return (
        <div className='m-4 w-full text-white font-semibold xl:max-w-[80vw] lg:max-w-[72vw] md:max-w-[65vw] sm:max-w-[65vw]'>
            <div className="m-4">
                <TopNavbar />
            </div>

            {/* Inputs row */}
            <div className='text-white font-semibold'>
                <div className='mt-5 flex flex-col sm:flex-row justify-between'>
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={stockName}
                        onChange={(ev) => setStockName(ev.target.value)}
                        placeholder='   Stock Name'
                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                        placeholder='   Description'
                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={quantity}
                        onChange={(ev) => setQuantity(ev.target.value)}
                        placeholder='   Quantity'
                    />
                </div>

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

                <div className='mt-5 flex flex-col sm:flex-row justify-between'>
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={iosVersion}
                        onChange={(ev) => setIosVersion(ev.target.value)}
                        placeholder='   IOS Version'
                    />
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={batteryHealth}
                        onChange={(ev) => setBatteryHealth(ev.target.value)}
                        placeholder='   Battery Health'
                    />
                    <Combobox
                        value={colour}
                        onChange={(ev) => setColour(ev.target.value)}
                        options={colourOptions}
                        placeholder='Colour'
                    />
                </div>
            </div>



         {/* Second table (list of phone models) */}
         <div className="mt-5 text-white">
                <h2 className="text-xl font-semibold mb-4">Phone Models</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 text-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-700">Model Name</th>
                                <th className="py-2 px-4 border-b border-gray-700">Stock Added Date</th>
                                <th className="py-2 px-4 border-b border-gray-700">IMEI Number</th>
                                <th className="py-2 px-4 border-b border-gray-700">Storage</th>
                                <th className="py-2 px-4 border-b border-gray-700">iOS Version</th>
                                <th className="py-2 px-4 border-b border-gray-700">Battery Health</th>
                                <th className="py-2 px-4 border-b border-gray-700">Colour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modelsTable.map((model, index) => (
                                <tr key={index} onClick={() => handleModelTableRowClick(model)}>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.stockAddedDate}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.imeiNumbers.map((imei) => imei.imei).join(', ')}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.imeiNumbers.map((imei) => imei.storage).join(', ')}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.imeiNumbers.map((imei) => imei.ios_version).join(', ')}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.imeiNumbers.map((imei) => imei.battery_health).join(', ')}</td>
                                    <td className="py-2 px-4 border-b border-gray-700">{model.imeiNumbers.map((imei) => imei.colour).join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          
          
          
          {/* buttons */}
         </div>


         <div className='flex mt-5 gap-x-[3vw] justify-end'>
            <Button
                onClick={handleAddPhone}
                className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                iconSrc={'src/assets/icons/Add Btn.svg'}
                iconAlt='add icon'
            >
                ADD
            </Button>
            <Button
                onClick={() => handleItemDeleteOnClick(selectedPhone?.id || 0)}
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
            <Button
                onClick={handlePushOnClick}
                className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                iconSrc={'src/assets/icons/Add Btn.svg'}
                iconAlt='add icon'
            >
                PUSH
            </Button>
        </div>



        {/* First table (list of phones) */}
               <div className="mt-5 text-white">
                        <h2 className="text-xl font-semibold mb-4">List of Stocks</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-800 text-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-700">ID</th>
                                        <th className="py-2 px-4 border-b border-gray-700">Name</th>
                                        <th className="py-2 px-4 border-b border-gray-700">Description</th>
                                        <th className="py-2 px-4 border-b border-gray-700">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {phones.map((phone) => (
                                        <tr key={phone.id} onClick={() => handleTableRowClick(phone)} className="cursor-pointer hover:bg-gray-700">
                                            <td className="py-2 px-4 border-b border-gray-700">{phone.id}</td>
                                            <td className="py-2 px-4 border-b border-gray-700">{phone.name}</td>
                                            <td className="py-2 px-4 border-b border-gray-700">{phone.description}</td>
                                            <td className="py-2 px-4 border-b border-gray-700">{phone.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

        </div>
    );
}