import React from 'react';
import TopNavbar from '../topNavbar';

export default function Order() {
    return (
        <div className='m-4 w-full'>
            <div className="m-4">
                <TopNavbar />
            </div>

            <div className='mt-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-10'>
                        <p className='font-bold text-[#5386ED] text-3xl'>#00000253</p>
                        <button className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Customer</button>
                        <button className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Phone</button>
                        <button className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3' >Add Item</button>
                    </div>
                    <div>
                        <select name="choice" className='bg-[#5386ED] text-white font-bold p-2 rounded-md'>
                            <option className='bg-black text-white' value="first">Retail Order</option>
                            <option className='bg-black text-white' value="second" selected>Wholesale Order</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex justify-between mt-5'>
                <div className='flex-1'>
                    <input
                        className='w-full text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={""}
                        // onChange={(ev) => setModel(ev.target.value)}
                        placeholder='   Contact Number'
                    />
                    <button>

                    </button>
                </div>
                <div>
                    <input
                        className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={""}
                        // onChange={(ev) => setModel(ev.target.value)}
                        placeholder='   Contact Name'
                    />
                </div>
            </div>

            <div className='mt-5'>
                <table className='min-w-full divide-y table-styles border-2'>
                    <thead>
                        <tr className=''>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Id</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Brand</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Color</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                            {/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Warranty Period</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Qty</th> */}
                        </tr>
                    </thead>
                    {<tbody className='min-h-80 h-80 border-green-600 border-2'>
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
                            </tr>
                        ))} */}
                    </tbody> }
                </table>
            </div>
            <div className='w-full flex gap-2 mt-5 justify-end'>
                <button className='bg-[#00900F] p-1 rounded-md text-white font-bold'>Proceed To Payment</button>
                <button className='bg-[#B10000] p-1 rounded-md text-white font-bold'>Cancel Payment</button>
            </div>
        </div>
    );
}
