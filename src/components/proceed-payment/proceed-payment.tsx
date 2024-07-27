import React from 'react';
import TopNavbar from '../topNavbar';
import { useParams } from 'react-router-dom';

export default function ProceedPayment() {

  const { orderType } = useParams();
  // console.log(param.);

  switch (orderType) {
    case "retail-order":
      break;

    case "wholesale-order":
      break;

    case "return-order":
      break;

    default:
      return (<>
        <p className='text-white'>404</p>
      </>)

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
                  <th>Shop Name</th>
                  <th>Contact Number</th>
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
                  <tr><td>Discount Price</td>5000.00<td></td></tr>
                </tbody>
              </table>
            </div>

            <div>
              <div className='h-full w-1 bg-[#717171] mx-5'></div>
            </div>

            <div className='flex-1'>
              <table className='w-full'>
                <table className='w-full'>
                  <thead>
                    <th className='text-[#5386ED] text-xl'>Make Payment</th>
                    <th></th>
                  </thead>
                  <tbody className=''>
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
              </table>
              <div className='flex flex-col gap-2 mt-3' >
                <button className='bg-[#5356EC] p-2'>
                  Confirm Payment
                </button>
                <button className='border-2 border-[#5356EC] p-2 bg-[#343434]  '>
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
