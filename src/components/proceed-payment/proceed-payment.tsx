import React, {useState} from 'react';
import TopNavbar from '../topNavbar';
import {useLocation, useParams} from 'react-router-dom';
import axios from "axios";
import {backend_url} from "../../utill/utill.ts";

export default function ProceedPayment() {
  const { orderType } = useParams();
  const location = useLocation();
  const { phones, items , customerName, contactNumber, customerId } = location.state || { phones: [], items: [], customerName: '', contactNumber: '' ,customerId: ''};
  const [discount, setDiscount] = useState(0);
  const [customerAmount, setCustomerAmount] = useState(0);

  console.log('Customer Name:', customerName);
  console.log('Customer Number:', contactNumber);
  console.log('Customer Id:', customerId);
  console.log('Phones:', phones);
  console.log('Item Data:', items);
  const totalPhonePrice = phones.reduce((sum, phone) => sum + parseFloat(phone.price) || 0, 0);

  // Calculate total price for items
  const totalItemPrice = items.reduce((sum, item) => sum + parseFloat(item.price) || 0, 0);

  // Calculate subtotal
  const subtotal = totalPhonePrice + totalItemPrice;

  const totalAmount = subtotal - discount;

  const totalAfterDiscount = subtotal - discount;
  // Calculate balance
  const balance = customerAmount - totalAfterDiscount;

  // Update the discount when the input changes
  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscount(value);
  };

  const saveOrder = async () => {
    const order = {
      retail_order_id: 1, // This would typically be generated by your backend
      discount: discount,
      actual_price: subtotal,
      total_amount: totalAfterDiscount,
      date: new Date().toISOString(), // Or any date you want to set
      is_deleted: false,
      customer: {
        customer_id: customerId,
        name: customerName,
        contact_phone: contactNumber,
      },
      items: items.map(item => ({
        item_id: item.item_id,
        category: item.category,
        brand: item.brand,
        name: item.name,
        colour: item.colour,
        warranty_period: item.warranty_period,
        qty: item.qty,
        price: item.price
      })),
      imeis: phones.map(phone => ({
        id: phone.id, // This needs to be included if you're tracking phones by id
        model: phone.modelName,
        imei: phone.imei,
        storage: phone.storage,
        colour: phone.colour,
        ios_version: phone.ios_version,
        battery_health: phone.battery_health,
        price: phone.price,
        warranty: phone.warranty
      }))
    };

    try {
      const response = await axios.post(`${backend_url}/api/retailOrder`, order);
      // Handle success response
      console.log('Order saved successfully:', response.data);
    } catch (error) {
      // Handle error response
      console.error('Error saving order:', error);
    }
  };


  switch (orderType) {
    case "retail-order":
      return <div className='m-4 w-full'>
        <div className="m-4">
          <TopNavbar />
        </div>
        <div className='bg-[#14141E] rounded-md p-3 text-white'>
          <div className='flex justify-between'>
            <div>
              <button className='mr-4'>Cash Payment</button>
              <button>Card Payment</button>
            </div>
            <div>
              <p className='text-3xl text-[#5386ED]'>#00000253</p>
            </div>
          </div>
          <hr className='my-3' />
          <div className='flex'>
            <div className='flex-1 p-4'>
              <table className='w-full '>
                <thead>
                <tr>
                  <th className="font-bold px-6 py-2 ">Customer</th>
                  <th className="font-bold px-6 py-2 ">Contact Number</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className="px-6 py-2 ">{customerName}</td>
                  <td className="px-6 py-2 ">{contactNumber}</td>
                </tr>
                </tbody>
              </table>

              <div className="space-y-4">
                <table className="w-full border-collapse">
                  <thead>
                  <tr>
                    <th className="font-bold px-6 py-4 text-left">Model Name</th>
                    <th className="font-bold px-6 py-4 text-left">Imei Number</th>
                    <th className="font-bold px-6 py-4 text-left">Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  {phones.map((phone, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2">{phone.modelName}</td>
                        <td className="px-6 py-2">{phone.imei}</td>
                        <td className="px-6 py-2">{phone.price}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>

                <hr className='my-3' />

                <table className="w-full border-collapse">
                  <thead>
                  <tr>
                    <th className="font-bold px-6 py-4 text-left">Item Name</th>
                    <th className="font-bold px-6 py-4 text-left">Quantity</th>
                    <th className="font-bold px-6 py-4 text-left">Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  {items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2">{item.name}</td>
                        <td className="px-6 py-2">{item.qty}</td>
                        <td className="px-6 py-2">{item.price}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>

            </div>

            <div>
              <div className='h-full w-1 bg-[#717171] mx-5'></div>
            </div>
            <div className='flex-1'>
              <table className='w-full'>
                <thead>
                <tr>
                  <th className='text-[#5386ED] text-xl'>Make Payment</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <div className='mt-4'>
                      <p>Subtotal</p>
                    </div>
                  </td>
                  <td>
                    <div className='mt-1'>
                      <p>{subtotal.toFixed(2)}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='mt-1'>
                      <p>Discount</p>
                    </div>
                  </td>
                  <td>
                    <div className='mt-1'>
                      <input
                          type='number'
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                          className='bg-[#1E1E1E] text-white px-2 py-1 rounded-md'
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='mt-1'>
                      <p>Total Amount</p>
                    </div>
                  </td>
                  <td>
                    <div className='mt-1'>
                      <p>{totalAfterDiscount.toFixed(2)}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='mt-1'>
                      <p>Customer Amount</p>
                    </div>
                  </td>
                  <td>
                    <div className='mt-1'>
                      <input
                          type='number'
                          value={customerAmount}
                          onChange={(e) => setCustomerAmount(parseFloat(e.target.value) || 0)}
                          className='bg-[#1E1E1E] text-white px-2 py-1 rounded-md'
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='mt-5'>
                      <p>Balance</p>
                    </div>
                  </td>
                  <td>
                    <div className='mt-5'>
                      <p>{balance.toFixed(2)}</p>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div className='flex flex-col gap-2 mt-3'>
                <button
                    className='bg-[#5356EC] p-2'
                    onClick={saveOrder}
                >
                  Confirm Payment
                </button>
                <button className='border-2 border-[#5356EC] p-2 bg-[#343434]'>
                  Cancel Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
          ;
    case "wholesale-order":
      return <div>Wholesale Order Content</div>;
    case "return-order":
      return <div>Return Order Content</div>;
    default:
      return <p className='text-white'>404 Not Found</p>;
  }

  return (
      <>
        <div className='m-4 w-full'>
          <div className="m-4">
            <TopNavbar />
          </div>
          <div className='bg-[#14141E] rounded-md p-3 text-white'>
            <div className='flex justify-between'>
              <div>
                <button>Cash payment</button>
                <button>Card payment</button>
              </div>
              <div>
                <p className='text-3xl text-[#5386ED]'>#00000253</p>
              </div>
            </div>
            <hr className='my-3' />
            <div className='flex'>
              <div className='flex-1'>
                <table className='w-full'>
                  <thead>
                  <tr>
                    <th>Shop Name</th>
                    <th>Contact Number</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      <div className='mt-5'>
                        <p>Sub Total</p>
                      </div>
                    </td>
                    <td>
                      <div className='mt-5'>
                        <p>50000.00</p>
                      </div>
                    </td>
                  </tr>
                  <tr><td>Discount</td><td>500.00</td></tr>
                  <tr><td>Discount Price</td><td>5000.00</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div className='h-full w-1 bg-[#717171] mx-5'></div>
              </div>
              <div className='flex-1'>
                <table className='w-full'>
                  <thead>
                  <tr>
                    <th className='text-[#5386ED] text-xl'>Make Payment</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      <div className='mt-4'>
                        <p>Customer amount</p>
                      </div>
                    </td>
                    <td>
                      <div className='mt-1'>
                        <p>50000.00</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='mt-1'>
                        <p>Total amount</p>
                      </div>
                    </td>
                    <td>
                      <div className='mt-1'>
                        <p>50000.00</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='mt-5'>
                        <p>Balance</p>
                      </div>
                    </td>
                    <td>
                      <div className='mt-5'>
                        <p>50000.00</p>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <div className='flex flex-col gap-2 mt-3' >
                  <button className='bg-[#5356EC] p-2'>
                    Confirm Payment
                  </button>
                  <button className='border-2 border-[#5356EC] p-2 bg-[#343434]'>
                    Cancel payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
