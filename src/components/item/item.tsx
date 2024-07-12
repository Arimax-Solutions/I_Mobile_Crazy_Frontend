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
}

const Item = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [colour, setColour] = useState('');
    const [price, setPrice] = useState('');
    const [warranty_period, setWarrantyPeriod] = useState('');
    const [token, setToken] = useState('');
    const [items, setItems] = useState<ItemData[]>([]);


    // save item

    const handleItemAddOnClick = async () => {
      const newItemData: ItemData = {
          category,
          name,
          brand,
          colour,
          price: parseFloat(price), // Convert price to a number
          warranty_period
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

    // delete item
    const handleItemDeleteOnClick = async () => {
        const newItemData: ItemData = {
            category,
            name,
            brand,
            colour,
            price: parseFloat(price), 
            warranty_period
        };
        console.log(newItemData);
    };

    // update Item
    const handleItemUpdateOnClick = async () => {
        const newItemData: ItemData = {
            category,
            name,
            brand,
            colour,
            price: parseFloat(price),
            warranty_period
        };
        try {
          const response = await axios.put(
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
              text: 'Item update successfully',
              icon: 'success',
              confirmButtonText: 'OK'
          });
      } catch (error) {
          console.error('Error adding item:', error);

          // Show error alert
          Swal.fire({
              title: 'Error!',
              text: 'Failed to update item',
              icon: 'error',
              confirmButtonText: 'OK'
          });
      }
    };

    useEffect(() => {
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
                  // Check if response has data property and it is an array
                  if (response.data && Array.isArray(response.data.data)) {
                      setItems(response.data.data); // Set items from response.data.data
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
  
      fetchItems();
  }, []);
  
  

    return (
        <div className='m-4 w-full'>
            <div className='m-4'>
                <TopNavbar />
            </div>

            {/* 1st row */}
            <div className='m-4 flex mt-5 justify-start'>
                <button className='mr-[8vw] buttons-styles'>ADD TO ITEM STOCK</button>
                <button className='buttons-styles'>VIEW ALL ITEMS</button>
            </div>

            {/* 2nd row */}
            <div className='text-white font-semibold'>
                <div className='mt-5 flex justify-between'>
                    <input className='text-feild' onChange={(ev) => { setCategory(ev.target.value) }} placeholder='   category' />
                    <input className='text-feild' onChange={(ev) => { setName(ev.target.value) }} placeholder='   name' />
                    <input className='text-feild' onChange={(ev) => { setBrand(ev.target.value) }} placeholder='   brand' />
                </div>
                <div className='mt-4 flex justify-between'>
                    <input className='text-feild' onChange={(ev) => { setColour(ev.target.value) }} placeholder='   colour' />
                    <input className='text-feild' onChange={(ev) => { setPrice(ev.target.value) }} placeholder='   price' />
                    <input className='text-feild' onChange={(ev) => { setWarrantyPeriod(ev.target.value) }} placeholder='   warrenty' />
                </div>
            </div>

            {/* 3rd row */}
            <div className='m-4 flex mt-5 justify-end'>
                <button onClick={handleItemAddOnClick} className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                    <img src={'src/assets/icons/Add Btn.svg'} className='mr-[0.3vw]' alt='add icon' />ADD</button>
                <button onClick={handleItemDeleteOnClick} className='mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                    <img src={'src/assets/icons/Delete Btn.svg'} className='mr-[0.3vw]' alt='delete icon' />DELETE</button>
                <button onClick={handleItemUpdateOnClick} className='buttons-styles bg-blue-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
                    <img src={'src/assets/icons/Update Btn.svg'} className='mr-[0.3vw]' alt='update icon' />UPDATE</button>
            </div>

            {/* 4th row */}
            <div className='m-4'>
                <table className='min-w-full divide-y  table-styles'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Name</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Brand</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Category</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Colour</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Warranty</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items && items.map(item => (
                      <tr key={item.id}>
                          <td className='px-6 py-4 whitespace-nowrap'>{item.name}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{item.brand}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{item.category}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{item.colour}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{item.warranty_period}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>{`$${item.price.toFixed(2)}`}</td>
                      </tr>
                  ))}

                  </tbody>

                </table>
            </div>
        </div>
    );
};

export default Item;
