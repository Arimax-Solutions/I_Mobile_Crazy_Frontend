// @ts-ignore
import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import TopNavbar from '../topNavbar.tsx';

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


const salesData = [
  { month: 'January', sales: 1000 },
  { month: 'February', sales: 2000 },
  { month: 'March', sales: 3000 },
  { month: 'April', sales: 1500 },
  { month: 'May', sales: 2000 },
  { month: 'June', sales: 2500 },
  { month: 'July', sales: 3000 },
  { month: 'August', sales: 3500 },
  { month: 'September', sales: 4000 },
  { month: 'October', sales: 4500 },
  { month: 'November', sales: 5000 },
  { month: 'December', sales: 5500 }
];

const weeklyOrderIncrementData = [
  { day: 'Monday', orders: 10 },
  { day: 'Tuesday', orders: 15 },
  { day: 'Wednesday', orders: 20 },
  { day: 'Thursday', orders: 25 },
  { day: 'Friday', orders: 30 },
  { day: 'Saturday', orders: 35 },
  { day: 'Sunday', orders: 40 }
];


export default function Dashboard() {
  return (

    <div className='m-4 w-full'>

      <div className='m-4'>
        <TopNavbar />


        {/* buttons  */}
        <div className='flex justify-around mt-5'>
          <button className='buttons-styles'>Income Report</button>
          <button className='buttons-styles'>Stock Update</button>
          <button className='buttons-styles'>Income Report</button>
          <button className='buttons-styles'>Selling Update</button>
          <button className='buttons-styles'>Return Update</button>
          <button className='daily_cost-buttons-styles p-1 rounded-xl w-fit flex items-center '>
            Daily Cost<img src={'src/assets/icons/daily cost.svg'} className='ml-2' alt='icon' />
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
              <div className='mb-2'>
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
              <span className="text-white text-lg font-bold">Total Earning</span><br />
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
        <div className='flex justify-between mt-5'>
          <div className='background-colour-today-sales-div p-3 rounded-lg flex-1 mr-4'>
            <div className='ml-2 mt-1'>
              <span className='text-white text-lg font-bold'>Top Products</span><br />
            </div>
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

          {/* Pie chart */}
          <div className="background-colour-today-sales-div text-white flex-1 p-3 rounded-lg">
            <div className="ml-2 mt-1">
              <span className="text-white text-lg font-bold">Income</span><br />
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
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>


        {/* 3rd row */}
        <div className='mt-2 flex justify-between'>
          {/* 3rd row 1st div */}
          <div className='background-colour-today-sales-div flex-1 mr-4 rounded-lg p-1'>
            <div className="ml-2 p-3">
              <span className="text-white text-lg font-bold">Sales Increment</span><br />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 3rd row second div */}
          <div className='background-colour-today-sales-div flex-1 rounded-lg'>
            <div className="ml-2 p-3">
              <span className="text-white text-lg font-bold">Weekly Order Increment</span><br />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyOrderIncrementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      </div>
      );
}

