import { useState, FormEvent } from 'react';
import TopNavbar from '../topNavbar';

// Define types for the IMEI details response
interface Model {
    id: number;
    name: string | null;
    imeiNumbers: Array<any>; // You can define a more specific type if needed
    stockAddedDate: string | null;
}

interface Customer {
    name: string | null;
    email: string | null;
    contact_number: string | null;
    nic: string | null;
}

interface Shop {
    shop_id: number;
    shop_name: string;
    address: string;
    email: string;
    contact_number: string;
    owner_nic: string;
    credit_limit: number;
    outstanding: string | null;
    _deleted: boolean;
}

interface ImeiDetails {
    id: number;
    imei: string;
    storage: string;
    colour: string;
    warranty: string | null;
    batteryHealth: number;
    price: number;
    status: string;
    modelId: Model;
    customer: Customer | null;
    shop: Shop | null;
    retailOrderDate: string | null;
    wholesaleOrderDate: string | null;
    deleted: boolean;
    iosversion: number;
}

export default function CheckImei() {
    const [imei, setImei] = useState<string>(''); // Store the entered IMEI
    const [imeiDetails, setImeiDetails] = useState<ImeiDetails | null>(null); // Store the fetched IMEI details
    const [error, setError] = useState<string>(''); // Store any error messages

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setImeiDetails(null);

        try {
            const response = await fetch(`http://localhost:8080/api/imei/return/${imei}`);
            if (!response.ok) {
                throw new Error('Failed to fetch IMEI details');
            }
            const data: ImeiDetails = await response.json();
            setImeiDetails(data); // Set the fetched data
        } catch (err: any) {
            setError(err.message); // Set error message if fetch fails
        }
    };

    return (
        <div className='m-4 text-white'> {/* Set default text color to white */}
            <div>
                <TopNavbar />
            </div>
            <form onSubmit={handleSubmit} className='my-4'>
                <label htmlFor='imei' className='block mb-2 text-lg'>
                    Check IMEI:
                </label>
                <input
                    type='text'
                    id='imei'
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                    className='border p-2 mb-4 w-full bg-gray-800 text-white' // Adjust background and text color
                    placeholder='Enter IMEI number'
                    required
                />
                <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
                    Check IMEI
                </button>
            </form>

            {error && <div className='text-red-500 text-lg'>{error}</div>} {/* Error text color */}

            {imeiDetails && (
                <div className='mt-4'>
                    <h2 className='text-xl font-bold mb-2'>IMEI Details</h2>
                    <p><strong>ID:</strong> {imeiDetails.id}</p>
                    <p><strong>IMEI:</strong> {imeiDetails.imei}</p>
                    <p><strong>Storage:</strong> {imeiDetails.storage}</p>
                    <p><strong>Colour:</strong> {imeiDetails.colour}</p>
                    <p><strong>Warranty:</strong> {imeiDetails.warranty || 'Not Available'}</p>
                    <p><strong>Battery Health:</strong> {imeiDetails.batteryHealth}%</p>
                    <p><strong>Price:</strong> {imeiDetails.price}</p>
                    <p><strong>Status:</strong> {imeiDetails.status}</p>
                    <p><strong>IOS Version:</strong> {imeiDetails.iosversion}</p>
                    <p><strong>Model:</strong> {imeiDetails.modelId.name}</p>
                    <p><strong>Retail Order Date:</strong> {imeiDetails.retailOrderDate ? new Date(imeiDetails.retailOrderDate).toLocaleString() : 'Not Available'}</p>
                    <p><strong>Wholesale Order Date:</strong> {imeiDetails.wholesaleOrderDate ? new Date(imeiDetails.wholesaleOrderDate).toLocaleString() : 'Not Available'}</p>
                    <p><strong>Deleted:</strong> {imeiDetails.deleted ? 'Yes' : 'No'}</p>

                    {/* Display customer details if available */}
                    {imeiDetails.customer ? (
                        <div className='mt-4'>
                            <h3 className='text-lg font-bold'>Customer Details</h3>
                            <p><strong>Name:</strong> {imeiDetails.customer.name || 'Not Available'}</p>
                            <p><strong>Email:</strong> {imeiDetails.customer.email || 'Not Available'}</p>
                            <p><strong>Phone:</strong> {imeiDetails.customer.contact_number || 'Not Available'}</p>
                            <p><strong>NIC:</strong> {imeiDetails.customer.nic || 'Not Available'}</p>
                        </div>
                    ) : (
                        <div className='mt-4'>
                            <h3 className='text-lg font-bold'>No Customer Information</h3>
                        </div>
                    )}

                    {/* Display shop details if available */}
                    {imeiDetails.shop ? (
                        <div className='mt-4'>
                            <h3 className='text-lg font-bold'>Shop Details</h3>
                            <p><strong>Shop ID:</strong> {imeiDetails.shop.shop_id}</p>
                            <p><strong>Shop Name:</strong> {imeiDetails.shop.shop_name}</p>
                            <p><strong>Address:</strong> {imeiDetails.shop.address}</p>
                            <p><strong>Email:</strong> {imeiDetails.shop.email}</p>
                            <p><strong>Contact Number:</strong> {imeiDetails.shop.contact_number}</p>
                            <p><strong>Owner NIC:</strong> {imeiDetails.shop.owner_nic}</p>
                            <p><strong>Credit Limit:</strong> {imeiDetails.shop.credit_limit}</p>
                            <p><strong>Outstanding:</strong> {imeiDetails.shop.outstanding || 'Not Available'}</p>
                            <p><strong>Deleted:</strong> {imeiDetails.shop._deleted ? 'Yes' : 'No'}</p>
                        </div>
                    ) : (
                        <div className='mt-4'>
                            <h3 className='text-lg font-bold'>No Shop Information</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
