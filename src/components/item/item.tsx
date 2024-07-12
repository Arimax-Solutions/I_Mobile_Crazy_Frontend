import React, { useState, useEffect } from 'react';
import TopNavbar from '../topNavbar';
import '../item/item.css'; // Ensure this file does not override Tailwind classes
import axios from 'axios';
import { backend_url } from '../../utill/utill';
import Swal from "sweetalert2";

interface ItemData {
    category: string;
    name: string;
    brand: string;
    colour: string;
    price: number; 
    warranty_period: string;
    qty: string;
}

interface TableItemData extends ItemData {
    item_id: number;
}

const Item = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [colour, setColour] = useState('');
    const [price, setPrice] = useState('');
    const [warranty_period, setWarrantyPeriod] = useState('');
    const [qty, setQty] = useState('');
    const [token, setToken] = useState('');
    const [items, setItems] = useState<TableItemData[]>([]);
    const [selectedItem, setSelectedItem] = useState<TableItemData | null>(null); 

    // Function to fetch items from backend
    const fetchItems = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setToken(token);
            try {
                const response = await axios.get(`${backend_url}/api/items`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data && Array.isArray(response.data.data)) {
                    setItems(response.data.data); 
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


    useEffect(() => {
        fetchItems();
    }, []);

    // Function to handle clicking on a table row
    const handleTableRowClick = (item: TableItemData) => {
        setSelectedItem(item); 
        setCategory(item.category);
        setName(item.name);
        setBrand(item.brand);
        setColour(item.colour);
        setPrice(item.price.toString()); // Convert number to string for input field
        setWarrantyPeriod(item.warranty_period);
        setQty(item.qty);
    };

    // Function to handle adding an item
    const handleItemAddOnClick = async () => {
        if (!validateForm()) {
            return;
        }
        
        const newItemData: ItemData = {
            category,
            name,
            brand,
            colour,
            price: parseFloat(price),
            warranty_period,
            qty
        };

        try {
            const response = await axios.post(
                `${backend_url}/api/items`, newItemData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Item added successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Clear input fields after successful addition
            setCategory('');
            setName('');
            setBrand('');
            setColour('');
            setPrice('');
            setWarrantyPeriod('');
            setQty('');

            // Refresh items list after adding item
            fetchItems();
        } catch (error) {
            console.error('Error adding item:', error);

            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add item',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Function to handle deleting an item
    const handleItemDeleteOnClick = async () => {
        if (!selectedItem) {
            console.error('No item selected for deletion');
            return;
        }

        try {
            const response = await axios.delete(
                `${backend_url}/api/items/${selectedItem.item_id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Item deleted successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Clear selected item and input fields after deletion
            setSelectedItem(null);
            setCategory('');
            setName('');
            setBrand('');
            setColour('');
            setPrice('');
            setWarrantyPeriod('');
            setQty('');

            // Refresh items list after deletion
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);

            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete item',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Function to handle updating an item
    const handleItemUpdateOnClick = async () => {
        if (!validateForm()) {
            return;
        }

        const updatedItemData: ItemData = {
            category,
            name,
            brand,
            colour,
            price: parseFloat(price),
            warranty_period,
            qty
        };

        try {
            const response = await axios.put(
                `${backend_url}/api/items/${selectedItem.item_id}`, updatedItemData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Item updated successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Clear selected item and input fields after update
            setSelectedItem(null);
            setCategory('');
            setName('');
            setBrand('');
            setColour('');
            setPrice('');
            setWarrantyPeriod('');
            setQty('');

            // Refresh items list after update
            fetchItems();
        } catch (error) {
            console.error('Error updating item:', error);

            // Show error alert
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update item',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const validateForm = (): boolean => {
        if (!category || !name || !brand || !colour || !price || !warranty_period || !qty) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all fields',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
    
        // Validate numeric price
        if (isNaN(parseFloat(price))) {
            Swal.fire({
                title: 'Error!',
                text: 'Price must be a number',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
    
        // Validate numeric quantity
        if (isNaN(parseFloat(qty))) {
            Swal.fire({
                title: 'Error!',
                text: 'Quantity must be a number',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return false;
        }
    
        return true;
    };
    


    return (
        <div className='m-4 w-full'>
            <div className='m-4'>
                <TopNavbar />
            </div>

            {/* Buttons row */}
            {/* <div className='m-4 flex mt-5 justify-start'>
                <button className='mr-[8vw] buttons-styles'>ADD TO ITEM STOCK</button>
                <button className='buttons-styles'>VIEW ALL ITEMS</button>
            </div> */}

            {/* Inputs row */}
            <div className='text-white font-semibold'>
                <div className='mt-5 flex justify-between'>
                    <input className='text-feild' value={category} onChange={(ev) => setCategory(ev.target.value)} placeholder='   category' />
                    <input className='text-feild' value={name} onChange={(ev) => setName(ev.target.value)} placeholder='   name' />
                    <input className='text-feild' value={brand} onChange={(ev) => setBrand(ev.target.value)} placeholder='   brand' />
                </div>
                <div className='mt-4 flex justify-between'>
                    <input className='text-feild' value={colour} onChange={(ev) => setColour(ev.target.value)} placeholder='   colour' />
                    <input className='text-feild' value={price} onChange={(ev) => setPrice(ev.target.value)} placeholder='   price' />
                    <input className='text-feild' value={warranty_period} onChange={(ev) => setWarrantyPeriod(ev.target.value)} placeholder='   warranty' />
                </div>
               
            </div>

            {/* Buttons for add, delete, update */}
            <div className='flex justify-between items-end'>
                <div>
                    <input className='text-feild text-white font-semibold' value={qty} onChange={(ev) => setQty(ev.target.value)} placeholder='   Qty' />
                </div>

                <div className='flex  mt-5'>
                <button onClick={handleItemAddOnClick} className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                    <img src={'src/assets/icons/Add Btn.svg'} className='mr-[0.3vw]' alt='add icon' />ADD</button>
                <button onClick={handleItemDeleteOnClick} className='mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                    <img src={'src/assets/icons/Delete Btn.svg'} className='mr-[0.3vw]' alt='delete icon' />DELETE</button>
                <button onClick={handleItemUpdateOnClick} className='buttons-styles bg-blue-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                    <img src={'src/assets/icons/Update Btn.svg'} className='mr-[0.3vw]' alt='update icon' />UPDATE</button>
            </div>
            </div>
            

            {/* Table to display items */}
            <div className='mt-5'>
                <table className='min-w-full divide-y table-styles'>
                    <thead>
                        <tr className=''>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Id</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Brand</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Color</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Warranty Period</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item.item_id}
                                className=' text-white font-semibold hover:bg-gray-50'
                                onClick={() => handleTableRowClick(item)}
                            >
                                <td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-500'>{item.item_id}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.category}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.name}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.brand}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.colour}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.price}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.warranty_period}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Item;
