import React, { useState } from 'react';
import TopNavbar from '../topNavbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as crudButton from '../crudbuttons/buttons';
import RetailOrder from './reatail-order';



const style = {
    position: 'absolute' as 'absolute',
    color: "white",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "fit-content",
    bgcolor: '#14141E',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
};


export default function Order() {

    const [open, setOpen] = React.useState(false);
    const [openAddItem, setOpenAddItem] = React.useState(false);
    const [openAddPhone, setOpenAddPhone] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAddPhoneOpenModel = () => setOpenAddPhone(true);
    const handleAddPhoneCloseModel = () => setOpenAddPhone(false);
    const handleAddItemOpenModel = () => setOpenAddItem(true);
    const handleAddItemCloseModel = () => setOpenAddItem(false);
    const [orderType, setOrderType] = useState<string>("retail");



    return (
        <div className='m-4 w-full'>
            <div className="m-4">
                <TopNavbar />
            </div>

            <div className='mt-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-10'>
                        <p className='font-bold text-[#5386ED] text-3xl'>#00000253</p>
                        { 
                            orderType === "retail" ? (
                            <>
                                <button onClick={handleOpen} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Customer</button>
                                <button onClick={handleAddPhoneOpenModel} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Phone</button>
                                <button onClick={handleAddItemOpenModel} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3' >Add Item</button>
                            </>
                            ):(
                                <button onClick={handleOpen} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Phone</button>
                            )
                        }
                    </div>
                    <div>
                        <select onChange={(e) => setOrderType(e.target.value)} name="choice" className='bg-[#5386ED] text-white font-bold p-2 rounded-md'>
                            <option className='bg-black text-white' value="retail" selected>Retail Order</option>
                            <option className='bg-black text-white' value="wholesale" >Wholesale Order</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                {
                    orderType === "retail" ? (
                        <RetailOrder
                            isAddNewCustomerModelOpen={open}
                            isAddNewItemsModelOpen={openAddItem}
                            isAddNewPhoneModelOpen={openAddPhone}
                            handleAddNewCustomerModelClose={handleClose}
                            handleAddNewItemModelClose={handleAddItemCloseModel}
                            handleAddNewPhoneModelClose={handleAddPhoneCloseModel}
                        />
                    ) : (
                        <>
                        </>
                    )
                }

            </div>


        </div>
    );
}
