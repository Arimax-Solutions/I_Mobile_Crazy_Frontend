import React, { useEffect, useState } from "react";
import TopNavbar from "../topNavbar";
import Swal from "sweetalert2";
import axios from "axios";
import { backend_url } from "../../utill/utill";


interface Ishops {

}

function Shop() {

    const [shops, setShops] = useState([]);
    const [shop_name, setShopName] = useState("");
    const [address, setAddress] = useState("");
    const [contact_number, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [owner_nic, setOwnerNic] = useState("");
    const [outstanding, setOutstanding] = useState("");
    const [credit_limit, setCreditLimit] = useState("");
    const [shopId , setShopId] = useState(null);


    async function handleItemAddOnClick() {
        try {
            const formData = formValidation();
            await axios.post(`${backend_url}/api/shop`, {
                ...formData
            });
            await Swal.fire({
                title: 'Success!',
                text: 'Shop saved successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            clear();
        } catch (e) {
            console.log(e);
        }
    }

    async function fetchAllShopData() {

        const response = await axios.get(`${backend_url}/api/shop`);
        setShops(response.data.data);

    }

    function handleItemUpdateOnClick() {

    }

    function handleItemDeleteOnClick() {

    }

    function clear() {
        setShopName("");
        setAddress("");
        setContactNumber("");
        setEmail("");
        setOwnerNic("");
        setOutstanding("");
        setCreditLimit("");
        setShopId(null)
        fetchAllShopData();
    }

    function setValue(value:any){
        setShopName(value.shop_name);
        setAddress(value.address);
        setContactNumber(value.contact_number);
        setEmail(value.email);
        setOwnerNic(value.owner_nic);
        setOutstanding(value.outStanding);
        setCreditLimit(value.credit_limit)
        setShopId(value.shop_id)
        // fetchAllShopData();
    }

    function formValidation() {
        if (!shop_name && !address && !contact_number && !email && !owner_nic && !outstanding && !credit_limit) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all fields',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            throw new Error("please fill the form")
        }

        isValidEmail(email);
        isValidNIC(owner_nic)
        const contactNumber = isValidPhoneNumber(contact_number);
        const outStanding = isValidNumber(outstanding);
        const creditLimit = isValidNumber(credit_limit);
        return {
            "shop_name": shop_name,
            "address": address,
            "email": email,
            "contact_number": contactNumber,
            "outStanding": outStanding,
            "owner_nic": owner_nic,
            "credit_limit": creditLimit,
            "is_deleted": false
        }
    }

    function isValidNumber(value: string) {
        if (/^-?\d+$/.test(value)) {
            // The value is an integer
            return parseInt(value, 10);
        } else if (/^-?\d+\.\d+$/.test(value)) {
            // The value is a float
            return parseFloat(value);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the valid Numbers',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            throw new Error("Not a valid number")
        }
    }

    function isValidPhoneNumber(contactNumber: string) {
        const phoneNumberRegex = /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/
        if (!phoneNumberRegex.test(contactNumber)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the valid contact number',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            throw new Error("please fill the form")
        }
        return Number.parseInt(contactNumber);
    }

    function isValidNIC(nic: string) {
        const nicRegex = /^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))/
        if (!nicRegex.test(nic)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the valid NIC number',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            throw new Error("please fill the form")
        }
    }

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter the valid email',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            throw new Error("please fill the form")
        }
    }

    function tableRowHandleClick(id: number,value:any) {
        console.log(id);
        console.log(value);
        setValue(value);
        
    }

    useEffect(() => {
        fetchAllShopData();
    }, [0])

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
                        {shops.map((item: any) => (
                            <tr
                                key={item.shop_id}
                                className=' text-white font-semibold hover:bg-gray-50'
                                onClick={() => tableRowHandleClick(item.shop_id,item)}
                            >
                                <td className='px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-500'>{item.shop_id}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.shop_name}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.address}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.contact_number}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.email}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.owner_nic}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.outStanding}</td>
                                <td className='px-6 py-2 whitespace-nowrap text-sm text-gray-500'>{item.credit_limit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}


export default Shop;