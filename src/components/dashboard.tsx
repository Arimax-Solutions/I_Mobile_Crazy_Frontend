import React, { useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';


export default function Dashboard() {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  const getFormattedDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    const today = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(today);
    const dateParts = formattedDate.split(' ');
    return `${dateParts[0]}, ${dateParts.slice(1).join(' ')}`;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedName = localStorage.getItem('username');
    if (storedToken && storedName) {
      setToken(storedToken);
      setName(storedName);
    }
  }, []);

  return (
    <div className='m-4'>

      <div className='flex justify-between '>
        <div className='flex-grow mr-[35vw]'>
          <span className='text-2xl text-white'>Hi, {name} Welcome Back!</span>
          <p className='text-white opacity-40 text-lg'>{getFormattedDate()}</p>
        </div>
        <div className='flex items-start'>
          <input placeholder='search reports' className='w-[300px] p-1 text-xl rounded-xl mr-2 input-bg-gradient-custom'/>
          <button className='input-bg-gradient-custom p-2 bg-blue-500 rounded-full text-white'>
               <img src={'src/assets/icons/Logout.svg'} className='w-fit h-[3vh]'/>
            </button>
        </div>
      </div>

      <div className='flex justify-around mt-5'>
        <button className='buttons-styles'>Income Report</button>
        <button className='buttons-styles'>Stock Update</button>
        <button className='buttons-styles'>Income Report</button>
        <button className='buttons-styles'>Selling Update</button>
        <button className='buttons-styles'>Return Update</button>
        <button className='daily_cost-buttons-styles p-1 rounded-xl w-fit '>Daily Cost + icon</button>
      </div>
        
{/* ------------------------------------------------------------------------------------------ */}

    <div className='flex justify-between mt-5'>
    <div className='background-colour-today-sales-div p-4 rounded-lg'>
      <div className='ml-2 mt-2'>
        <span className='text-white text-lg font-bold'>Today's Sales</span><br/>
        <span className='text-xs text-gray-400'>Sales Summary</span>
      </div>

      <div className='flex justify-between w-full text-white mt-4'>
        <div className='custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center'>
          <div className='mb-2'>
            <img src={'src/assets/icons/Icon 1.svg'} alt='icon' className='mx-auto' />
          </div>
          <div className='text-2xl'>$5k</div>
          <div className='text-sm'>Total Sales</div>
          <div className='text-xs text-orange-500'>+10% from yesterday</div>
        </div>
        <div className='custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center'>
          <div className='mb-2'>
            <img src={'src/assets/icons/Icon 2.svg'} alt='icon' className='mx-auto' />
          </div>
          <div className='text-2xl'>500</div>
          <div className='text-sm'>Total Orders</div>
          <div className='text-xs text-green-500'>+8% from yesterday</div>
        </div>
        <div className='custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center'>
          <div className='mb-2'>
            <img src={'src/assets/icons/Icon 3.svg'} alt='icon' className='mx-auto' />
          </div>
          <div className='text-2xl'>12</div>
          <div className='text-sm'>Product Sold</div>
          <div className='text-xs text-purple-500'>+20% from yesterday</div>
        </div>
        <div className='custom-div w-[12vw] bg-gray-800 p-4 rounded-lg text-center'>
          <div className='mb-2 '>
            <img src={'src/assets/icons/Icon 4.svg'} alt='icon' className='w-fit mx-auto' />
          </div>
          <div className='text-2xl'>12</div>
          <div className='text-sm'>New Customers</div>
          <div className='text-xs text-blue-500'>+3% from yesterday</div>
        </div>   
      </div>
    </div>

{/* -------------------------------------------------charts----------------------------------------- */}

        <div className='text-white'>

         {/* 1st chart */}

          <div>
            <Gauge
              value={75}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: 'translate(0px, 0px)',
                },
              }}
              text={
                ({ value, valueMax }) => `${value} / ${valueMax}`
              }
                />
          </div>

          {/* second chart */}

          <div>
            <Gauge
              value={75}
              startAngle={-110}
              endAngle={110}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: 'translate(0px, 0px)',
                },
              }}
              text={
                ({ value, valueMax }) => `${value} / ${valueMax}`
              }
            />
          </div>
        </div>
      </div>
    
    </div>
  );
}
