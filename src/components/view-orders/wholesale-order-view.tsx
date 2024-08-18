import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../crudbuttons/buttons';
import { backend_url } from '../../utill/utill';

interface Shop {
    shop_id: number;
    shop_name: string;
    address: string;
    email: string;
    contact_number: string;
    owner_nic: string;
    credit_limit: number;
    is_deleted: boolean;
    outstanding: number | null;
}

// Define interfaces for the data
interface WholesaleOrder {
    wholesale_order_id: number;
    discount: number;
    actual_price: number;
    total_amount: number;
    date: string;
    shop: Shop;
    items: string[];
    imeis: Imei[];
}

interface Imei {
    id: number;
    imei: string;
    storage: string;
    colour: string;
    warranty: string | null;
    batteryHealth: number;
    price: number;
    status: string;
    modelId: Model;
    customer: string | null;
    shop: string | null;
    deleted: boolean;
    iosversion: number;
}

interface Model {
    id: number;
    name: string | null;
    imeiNumbers: string | null;
    stockAddedDate: string | null;
}

// Define interfaces for RetailOrder and ReturnOrder
interface RetailOrder {
  retail_order_id: number;
  discount: number;
  actual_price: number;
  total_amount: number;
  date: string;
}

interface ReturnOrder {
  return_order_id: number;
  reason: string;
  price: number;
  date: string;
}

export default function WholesaleOrderView() {
  const [visibleTable, setVisibleTable] = useState<'retail' | 'wholesale' | 'return' | null>(null);
  const [token, setToken] = useState<string>('');
  const [wholesaleOrders, setWholesaleOrders] = useState<WholesaleOrder[]>([]);
  const [returnOrders, setReturnOrders] = useState<ReturnOrder[]>([]);
  const [retailOrders, setRetailOrders] = useState<RetailOrder[]>([]);
  const [activeTable, setActiveTable] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<WholesaleOrder | RetailOrder | ReturnOrder | null>(null);


  useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
          setToken(token);
      }
  }, []);

  useEffect(() => {
      // Fetch data from the backend
      const fetchData = async () => {
          if (!token) return;

          try {
              const response = await axios.get(`${backend_url}/api/wholesaleOrder`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              setWholesaleOrders(response.data.data);

              const retailResponse = await axios.get(`${backend_url}/api/retailOrder`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRetailOrders(retailResponse.data.data);
            const returnResponse = await axios.get(`${backend_url}/api/returnOrder`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setReturnOrders(returnResponse.data.data);
          } catch (error) {
              console.log("No data available");
          }
      };

      fetchData();
  }, [token]);

  const handleRetail = () => {
      setActiveTable('retail');
      setVisibleTable('retail');
  };

  const handleWholesale = () => {
      setActiveTable('wholesale');
      setVisibleTable('wholesale');
  };

  const handleReturnOrder = () => {
      setActiveTable('return');
      setVisibleTable('return');
  };

  const handleViewOrderDetails = (order: WholesaleOrder | RetailOrder | ReturnOrder) => {
      setSelectedOrder(order);
  };

  const handleCloseModal = () => {
      setSelectedOrder(null);
  };

  return (
      <div className="m-4">
          {/* buttons */}
          <div className='m-4 flex mt-5 gap-x-[1vw] justify-between'>
              <Button
                  onClick={handleRetail}
                  className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                  iconSrc={'src/assets/icons/Add Btn.svg'}
                  iconAlt='add icon'
              >
                  Retail Orders
              </Button>
              <Button
                  onClick={handleWholesale}
                  className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                  iconSrc={'src/assets/icons/Add Btn.svg'}
                  iconAlt='add icon'
              >
                  Wholesale
              </Button>
              <Button
                  onClick={handleReturnOrder}
                  className='buttons-styles bg-green-button w-full sm:w-[20%] md:w-[15%] lg:w-[15%] xl:w-[10vw] h-[5vh] text-center rounded-xl flex justify-center items-center'
                    iconSrc={'src/assets/icons/Add Btn.svg'}
                    iconAlt='add icon'
              >
                  Return Orders
              </Button>
          </div>

          {/* Conditional rendering of tables */}
          {visibleTable === 'wholesale' && (
              <div className='m-4 mt-5 overflow-auto max-h-[50vh]'>
                  <table className='w-full text-white table-styles'>
                      <thead>
                          <tr>
                              <th className='p-2 border'>Order ID</th>
                              <th className='p-2 border'>Discount</th>
                              <th className='p-2 border'>Actual Price</th>
                              <th className='p-2 border'>Total Amount</th>
                              <th className='p-2 border'>Date</th>
                              <th className='p-2 border'>Shop</th>
                              <th className='p-2 border'>View</th>
                          </tr>
                      </thead>
                      <tbody>
                          {wholesaleOrders.map((order, index) => (
                              <tr key={index} className='cursor-pointer'>
                                  <td className='p-2 border'>{order.wholesale_order_id}</td>
                                  <td className='p-2 border'>{order.discount}</td>
                                  <td className='p-2 border'>{order.actual_price}</td>
                                  <td className='p-2 border'>{order.total_amount}</td>
                                  <td className='p-2 border'>{order.date}</td>
                                  <td className='p-2 border'>{order.shop?.shop_name || 'N/A'}</td>
                                  <td className='p-2 border'>
                                      <button
                                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                          onClick={() => handleViewOrderDetails(order)}
                                      >
                                          View Details
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}

          {visibleTable === 'retail' && (
              <div className='m-4 mt-5 overflow-auto max-h-[50vh]'>
                  <table className='w-full text-white table-styles'>
                      <thead>
                          <tr>
                              <th className='p-2 border'>Order ID</th>
                              <th className='p-2 border'>Discount</th>
                              <th className='p-2 border'>Actual Price</th>
                              <th className='p-2 border'>Total Amount</th>
                              <th className='p-2 border'>Date</th>
                              <th className='p-2 border'>View</th>
                          </tr>
                      </thead>
                      <tbody>
                          {retailOrders.map((order, index) => (
                              <tr key={index} className='cursor-pointer'>
                                  <td className='p-2 border'>{order.retail_order_id}</td>
                                  <td className='p-2 border'>{order.discount}</td>
                                  <td className='p-2 border'>{order.actual_price}</td>
                                  <td className='p-2 border'>{order.total_amount}</td>
                                  <td className='p-2 border'>{order.date}</td>
                                  <td className='p-2 border'>
                                      <button
                                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                          onClick={() => handleViewOrderDetails(order)}
                                      >
                                          View Details
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}

          {visibleTable === 'return' && (
              <div className='m-4 mt-5 overflow-auto max-h/[50vh]'>
                  <table className='w-full text-white table-styles'>
                      <thead>
                          <tr>
                              <th className='p-2 border'>Order ID</th>
                              <th className='p-2 border'>Reason</th>
                              <th className='p-2 border'>Price</th>
                              <th className='p-2 border'>Date</th>
                              <th className='p-2 border'>View</th>
                          </tr>
                      </thead>
                      <tbody>
                          {returnOrders.map((order, index) => (
                              <tr key={index} className='cursor-pointer'>
                                  <td className='p-2 border'>{order.return_order_id}</td>
                                  <td className='p-2 border'>{order.reason}</td>
                                  <td className='p-2 border'>{order.price}</td>
                                  <td className='p-2 border'>{order.date}</td>
                                  <td className='p-2 border'>
                                      <button
                                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                          onClick={() => handleViewOrderDetails(order)}
                                      >
                                          View Details
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}

          {/* Modal for order details */}
          {selectedOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white rounded-lg p-4">
                      <h2 className="text-lg font-bold mb-4">Order Details</h2>
                      <p><strong>Order ID:</strong> {'wholesale_order_id' in selectedOrder ? selectedOrder.wholesale_order_id : 'retail_order_id' in selectedOrder ? selectedOrder.retail_order_id : selectedOrder.return_order_id}</p>
                      <p><strong>Date:</strong> {selectedOrder.date}</p>
                      {/* Additional fields based on order type */}
                      {'discount' in selectedOrder && (
                          <>
                              <p><strong>Discount:</strong> {selectedOrder.discount}</p>
                              <p><strong>Actual Price:</strong> {selectedOrder.actual_price}</p>
                              <p><strong>Total Amount:</strong> {selectedOrder.total_amount}</p>
                          </>
                      )}
                      {'reason' in selectedOrder && (
                          <>
                              <p><strong>Reason:</strong> {selectedOrder.reason}</p>
                              <p><strong>Price:</strong> {selectedOrder.price}</p>
                          </>
                      )}
                      <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                          onClick={handleCloseModal}
                      >
                          Close
                      </button>
                  </div>
              </div>
          )}
      </div>
  );
}
