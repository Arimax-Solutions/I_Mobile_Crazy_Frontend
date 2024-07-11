import React, { useState } from 'react';
import TopNavbar from '../topNavbar';
import '../item/item.css'; // Ensure this file does not override Tailwind classes



interface ItemData {
    category: string;
    name: string;
    brand: string;
    colour: string;
    price: string;
    warrenty: string;
  }

  
  const Item = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [colour, setColour] = useState('');
    const [price, setPrice] = useState('');
    const [warrenty, setWarrenty] = useState('');
    const [itemData, setItemData] = useState<ItemData | null>(null);
  
    const handleItemOnClick = async () => {
      const newItemData: ItemData = { category, name, brand, colour, price, warrenty };
      setItemData(newItemData);
      console.log(newItemData);
    };

    
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
      <div>
        <div className='mt-5 flex justify-between'>
          <input className='text-feild' onChange={(ev)=>{setCategory(ev.target.value)}} placeholder='   category'/>
          <input className='text-feild' onChange={(ev)=>{setName(ev.target.value)}} placeholder='   name'/>
          <input className='text-feild' onChange={(ev)=>{setBrand(ev.target.value)}} placeholder='   brand'/>
        </div>
        <div className='mt-4 flex justify-between'>
          <input className='text-feild' onChange={(ev)=>{setColour(ev.target.value)}} placeholder='   colour'/>
          <input className='text-feild' onChange={(ev)=>{setPrice(ev.target.value)}} placeholder='   price'/>
          <input className='text-feild' onChange={(ev)=>{setWarrenty(ev.target.value)}} placeholder='   warrenty'/>
        </div>
      </div>

      {/* 3rd row */}
      <div className='m-4 flex mt-5 justify-end'>
        <button onClick={handleItemOnClick} className='mr-[6vw] buttons-styles bg-green-button w-[7vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
            <img src={'src/assets/icons/Add Btn.svg'} className='mr-[0.3vw]' alt='add icon'/>ADD</button>
        <button className='mr-[6vw] buttons-styles bg-red-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
            <img src={'src/assets/icons/Delete Btn.svg'} className='mr-[0.3vw]' alt='delete icon'/>DELETE</button>
        <button className='buttons-styles bg-blue-button w-[8vw] h-[5vh] text-center rounded-xl flex justify-center items-center'>
            <img src={'src/assets/icons/Update Btn.svg'} className='mr-[0.3vw]' alt='update icon'/>UPDATE</button>
      </div>

      {/* 4th row */}
      <div className='m-4'>
        <table className='min-w-full divide-y  table-styles'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item ID</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Brand</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Colour</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Item Warranty</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row, replace with dynamic rows */}
            <tr>
              <td className='px-6 py-4 whitespace-nowrap '>001</td>
              <td className='px-6 py-4 whitespace-nowrap'>Item 1</td>
              <td className='px-6 py-4 whitespace-nowrap'>Brand 1</td>
              <td className='px-6 py-4 whitespace-nowrap'>Red</td>
              <td className='px-6 py-4 whitespace-nowrap'>$10.00</td>
              <td className='px-6 py-4 whitespace-nowrap'>1 year</td>
            </tr>
           
            <tr>
              <td className='px-6 py-4 whitespace-nowrap '>001</td>
              <td className='px-6 py-4 whitespace-nowrap'>Item 1</td>
              <td className='px-6 py-4 whitespace-nowrap'>Brand 1</td>
              <td className='px-6 py-4 whitespace-nowrap'>Red</td>
              <td className='px-6 py-4 whitespace-nowrap'>$10.00</td>
              <td className='px-6 py-4 whitespace-nowrap'>1 year</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Item;
