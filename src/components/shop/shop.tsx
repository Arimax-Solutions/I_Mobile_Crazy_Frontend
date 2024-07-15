import React, { useState } from "react";
import TopNavbar from "../topNavbar";

interface Ishops{
    
}

function Shop() {

    const [shops ,setShops] = useState([]);
    const [shop_name , setShopName] = useState("");
    const [address , setAddress] = useState("");
    const [contact_number, setContactNumber] = useState("");
    const [email,setEmail] = useState("");
    const [owner_nic,setOwnerNic] = useState("");
    const [outstanding,setOutstanding] = useState("");
    const [credit_limit,setCreditLimit] = useState("");


    function handleItemAddOnClick(){

    }

    function handleItemUpdateOnClick(){
        
    }

    function handleItemDeleteOnClick(){

    }

    return (
        <div className="m-4 w-full">
            <div className="m-4">
                <TopNavbar />
            </div>

            <div className="m-4">
                <p>aaa</p>
                {/* Inputs row */}
                <div className='text-white font-semibold'>
                    <div className='mt-5 flex justify-between'>
                        <input className='text-feild' value={shop_name} onChange={(ev) => setShopName(ev.target.value)} placeholder='shop name' />
                        <input className='text-feild' value={address} onChange={(ev) => setAddress(ev.target.value)} placeholder='adddress' />
                        <input className='text-feild' value={contact_number} onChange={(ev) => setContactNumber(ev.target.value)} placeholder='contact number' />
                    </div>
                    <div className='mt-4 flex justify-between'>
                        <input className='text-feild' value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder='email' />
                        <input className='text-feild' value={owner_nic} onChange={(ev) => setOwnerNic(ev.target.value)} placeholder='owner nic' />
                        <input className='text-feild' value={outstanding} onChange={(ev) => setOutstanding(ev.target.value)} placeholder='outstanding' />
                    </div>
                    <div className='mt-4 flex justify-between items-center'>
                        <input className='text-feild' value={credit_limit} onChange={(ev) => setCreditLimit(ev.target.value)} placeholder='credit limit' />
                        {/* Buttons for add, delete, update */}
                        <div className='flex justify-between items-end'>
                    
                            <div className='flex'>
                                <button onClick={handleItemAddOnClick} className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                                    <img src={'src/assets/icons/Add Btn.svg'} className='mr-[0.3vw]' alt='add icon' />ADD</button>
                                <button onClick={handleItemDeleteOnClick} className='mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                                    <img src={'src/assets/icons/Delete Btn.svg'} className='mr-[0.3vw]' alt='delete icon' />DELETE</button>
                                <button onClick={handleItemUpdateOnClick} className='buttons-styles bg-blue-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                                    <img src={'src/assets/icons/Update Btn.svg'} className='mr-[0.3vw]' alt='update icon' />UPDATE</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Table to display items */}
            <div className='mx-4 mt-5'>
                <table className='min-w-full divide-y table-styles'>
                    <thead>
                        <tr className=''>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Shop Id</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Address</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact Number</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Owner NIC</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Outstandin</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Credit Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {items.map((item) => (
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
                        ))} */}
                    </tbody>
                </table>

            </div>

        </div>
    )
}


export default Shop;