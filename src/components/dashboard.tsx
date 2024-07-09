import React, { useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'; // Import BarChart from recharts
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const data = [
  { name: 'Label 1', value: 36638465.14 },
  { name: 'Label 2', value: 8141881.2 },
  { name: 'Label 3', value: 4070940.6 },
  { name: 'Label 4', value: 12212821.83 },
  { name: 'Label 5', value: 12212821.83 }
];

const productData = [
  { name: 'iPhone 13 Pro', popularity: 46, color: '#FFBB28' },
  { name: 'iPhone 12 Pro', popularity: 17, color: '#00C49F' },
  { name: 'iPhone 8+', popularity: 19, color: '#0088FE' },
  { name: 'iPhone X', popularity: 29, color: '#FF8042' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4848'];

export default function Dashboard() {

  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();


  const logoutFunction = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/');
        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  };
  
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
        <div className='flex-grow mr-[30vw]'>
          <span className='text-2xl text-white'>Hi, {name} Welcome Back!</span>
          <p className='text-white opacity-40 text-lg'>{getFormattedDate()}</p>
        </div>
        <div className='flex items-start'>
          <input placeholder='search reports' className='w-[300px] p-1 text-xl rounded-xl mr-2 input-bg-gradient-custom'/>
          <button onClick={logoutFunction} className='input-bg-gradient-custom p-2 bg-blue-500 rounded-full text-white'>
            <img src={'src/assets/icons/Logout.svg'} className='w-fit h-[3vh]'/>
          </button>
        </div>
      </div>

          {/* buttons  */}


      <div className='flex justify-around mt-5'>
        <button className='buttons-styles'>Income Report</button>
        <button className='buttons-styles'>Stock Update</button>
        <button className='buttons-styles'>Income Report</button>
        <button className='buttons-styles'>Selling Update</button>
        <button className='buttons-styles'>Return Update</button>
        <button className='daily_cost-buttons-styles p-1 rounded-xl w-fit flex items-center '>
          Daily Cost<img src={'src/assets/icons/Icon 4.svg'} className='ml-2' alt='icon'/>
        </button>
      </div>

      {/* 1st row */}


      <div className='flex justify-between mt-5'>
        <div className='background-colour-today-sales-div p-3 rounded-lg flex-1 mr-4'>
          <div className='ml-2 mt-1'>
            <span className='text-white text-lg font-bold'>Today's Sales</span><br/>
            <span className='text-xs text-gray-400'>Sales Summary</span>
          </div>

          <div className='flex justify-between w-full text-white mt-2'>
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

        {/* 1st row right side chart */}

        <div className="background-colour-today-sales-div text-white flex-1 p-3 rounded-lg">
          <div className="ml-2 mt-1">
            <span className="text-white text-lg font-bold">Total Earning</span><br/>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="h-[30vh] w-full">
              <Gauge className='text-white'
                value={75}
                startAngle={-110}
                endAngle={110}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                    fontWeight: 'bold',
                    fill: 'red',
                    transform: 'translate(0px, 0px)',
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Second row */}
    
              {/* top product */}

      <div className='flex justify-between mt-5'>
        <div className='background-colour-today-sales-div p-3 rounded-lg flex-1 mr-4'>
          <div className='ml-2 mt-1'>
            <span className='text-white text-lg font-bold'>Top Products</span><br/>
          </div>
              
          <div className='flex justify-between w-full text-white mt-2'>

          <div className='flex justify-between w-full text-white mt-2'>
            <BarChart
              width={600}
              height={300}
              data={productData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="popularity" fill="#8884d8">
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </div>



           </div>
        </div>


              {/* pie chart */}


        <div className="background-colour-today-sales-div text-white flex-1 p-3 rounded-lg">
          <div className="ml-2 mt-1">
            <span className="text-white text-lg font-bold">Income</span><br/>
          </div>
          <div className="flex justify-center items-center h-full">
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                        <Pie
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

      </div>
    </div>
  );
}
