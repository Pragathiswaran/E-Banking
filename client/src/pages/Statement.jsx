import React from 'react'

const Statement = () => {
  return (
   <>
    <div className='flex flex-col justify-center items-center'>   
        <div className='my-2 text-3xl font-bold'>Transaction History</div>
        <div className='mt-14 w-3/4'>
        <table className="w-full text-gray-700 text-lg border-collapse shadow-lg ">
            <thead className=''>
                <tr className="bg-gray-500 text-white ">
                    <th className="px-6 py-3 text-center">Transaction ID</th>
                    <th className="px-6 py-3 text-center">Amount</th>
                    <th className="px-6 py-3 text-center">Date</th>
                    <th className="px-6 py-3 text-center">Time</th>
                </tr>
            </thead>
                <tbody className="text-center">
                    <tr className="bg-gray-100 hover:bg-blue-50 transition-colors duration-200">
                        <td className="px-6 py-3">1</td>
                        <td className="px-6 py-3 text-green-500">+1000</td>
                        <td className="px-6 py-3">12/12/2021</td>
                        <td className="px-6 py-3">12:00</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
                        <td className="px-6 py-3">2</td>
                        <td className="px-6 py-3 text-red-500">-2000</td>
                        <td className="px-6 py-3">12/12/2021</td>
                        <td className="px-6 py-3">12:00</td>
                    </tr>
                    <tr className="bg-gray-100 hover:bg-blue-50 transition-colors duration-200">
                        <td className="px-6 py-3">3</td>
                        <td className="px-6 py-3 text-red-500">-3000</td>
                        <td className="px-6 py-3">12/12/2021</td>
                        <td className="px-6 py-3">12:00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
   </>
  )
}

export default Statement