import React from 'react';
import TopNavbar from '../topNavbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as crudButton from '../crudbuttons/buttons';

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



    return (
        <div className='m-4 w-full'>
            <div className="m-4">
                <TopNavbar />
            </div>

            <div className='mt-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-10'>
                        <p className='font-bold text-[#5386ED] text-3xl'>#00000253</p>
                        <button onClick={handleOpen} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Customer</button>
                        <button onClick={handleAddPhoneOpenModel} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3'>Add Phone</button>
                        <button onClick={handleAddItemOpenModel} className='border-2 border-[#5386ED] text-white rounded-full py-1 px-3' >Add Item</button>
                    </div>
                    <div>
                        <select name="choice" className='bg-[#5386ED] text-white font-bold p-2 rounded-md'>
                            <option className='bg-black text-white' value="first">Retail Order</option>
                            <option className='bg-black text-white' value="second" selected>Wholesale Order</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex justify-between mt-5 items-center'>
                <div className='flex items-center'>
                    <input
                        className='w-full text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                        value={""}
                        // onChange={(ev) => setModel(ev.target.value)}
                        placeholder='   Contact Number'
                    />
                    <button className='flex flex-col items-center h-full text-field border-1 border-[#5386ED] text-white mb-4 md:mb-0 '>
                        <img src="src/assets/icons/search-alt-2-svgrepo-com 1.svg" alt="" />
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
                    </tbody>}
                </table>
            </div>
            <div className='w-full flex gap-2 mt-5 justify-end'>
                <button className='bg-[#00900F] p-1 rounded-md text-white font-bold'>Proceed To Payment</button>
                <button className='bg-[#B10000] p-1 rounded-md text-white font-bold'>Cancel Payment</button>
            </div>

            {/* model add customer */}
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography className='text-center' id="modal-modal-title" variant="h5" component="h2">
                            Add new customer
                        </Typography>
                        <div className='w-full flex flex-col items-center mt-2'>
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={""}
                                // onChange={(ev) => setModel(ev.target.value)}
                                placeholder='   Contact Name'
                            />
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={""}
                                // onChange={(ev) => setModel(ev.target.value)}
                                placeholder='   Email'
                            />
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={""}
                                // onChange={(ev) => setModel(ev.target.value)}
                                placeholder='   Whatsapp Number'
                            />
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={""}
                                // onChange={(ev) => setModel(ev.target.value)}
                                placeholder='   Nic'
                            />
                        </div>
                        <div className='w-full flex gap-2 mt-5 justify-center'>
                            <button className='bg-[#00900F] p-2 rounded-md text-white font-bold'>Save customer</button>
                            <button className='bg-[#B10000] p-2 rounded-md text-white font-bold'>Cancel</button>
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* model add phones  */}
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={openAddPhone}
                    onClose={handleAddPhoneCloseModel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography className='' id="modal-modal-title" variant="h5" component="h2">
                            Add Phone
                        </Typography>
                        <div className='w-full flex flex-col mt-2'>
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={""}
                                // onChange={(ev) => setModel(ev.target.value)}
                                placeholder='   IMEI Number'
                            />
                            <div className='flex'>
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Model'
                                />
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Storage'
                                />
                            </div>
                            <div>
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Warranty Period'
                                />
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Color'
                                />
                            </div>
                            <div>
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Battery Health'
                                />
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Price'
                                />
                            </div>
                        </div>
                        <div className='w-full flex gap-2 mt-5 justify-end'>
                            <crudButton.default
                                onClick={() => {}}
                                className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                                iconSrc={'src/assets/icons/Add Btn.svg'}
                                iconAlt='add icon'
                            >
                                ADD
                            </crudButton.default>
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* model add items*/}
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={openAddItem}
                    onClose={handleAddItemCloseModel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography className='' id="modal-modal-title" variant="h5" component="h2">
                            Add Phone
                        </Typography>
                        <div className='w-full flex flex-col mt-2'>
                            <input
                                className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                value={""}
                                // onChange={(ev) => setModel(ev.target.value)}
                                placeholder='   IMEI Number'
                            />
                            <div className='flex'>
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Model'
                                />
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Storage'
                                />
                            </div>
                            <div>
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Warranty Period'
                                />
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Color'
                                />
                            </div>
                            <div>
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Battery Health'
                                />
                                <input
                                    className='text-feild mb-4 md:mb-0 md:w-[30%] lg:mx-2 md:mx-2 sm:mx-1'
                                    value={""}
                                    // onChange={(ev) => setModel(ev.target.value)}
                                    placeholder='   Price'
                                />
                            </div>
                        </div>
                        <div className='w-full flex gap-2 mt-5 justify-end'>
                            <crudButton.default
                                onClick={() => {}}
                                className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                                iconSrc={'src/assets/icons/Add Btn.svg'}
                                iconAlt='add icon'
                            >
                                ADD
                            </crudButton.default>
                        </div>
                    </Box>
                </Modal>
            </div>

        </div>
    );
}
