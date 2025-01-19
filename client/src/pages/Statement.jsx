import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const Statement = () => {
    const getStatement = async () => {
        const reponse = await axios.get('http://localhost:8000/api/user/statement')
        console.log(reponse)
        return reponse
    }

    const { data, isLoading, isError } = useQuery({
        queryKey:['statment'],
        queryFn: getStatement,
        onSuccess : (data) => {
            console.log(data.data.Statement)
            console.log('Success')
        },
        onError: () => {
            console.log('Error')
        }
    }) 

  return (
   <>
  {isLoading ? <h1 className='mt-40 text-center text-2xl font-semibold'>Loading...</h1> : (
      <div className='flex flex-col justify-center items-center'>   
      <div className='my-2 text-3xl font-bold'>Transaction History</div>
      <div className='mt-14 w-3/4'>
      <table className="w-full text-gray-700 text-lg border-collapse shadow-lg ">
          <thead className=''>
              <tr className="bg-gray-500 text-white ">
                  <th className="px-6 py-3 text-center">Transaction ID</th>
                  <th className="px-6 py-3 text-center">Amount</th>
                  <th className="px-6 py-3 text-center">Type</th>
                  <th className="px-6 py-3 text-center">Date</th>
                  <th className="px-6 py-3 text-center">Time</th>
              </tr>
          </thead>
              <tbody className="text-center">
              {
                    data.data.statement.map((item, index) => (
                        <tr className="bg-gray-100 hover:bg-blue-50 transition-colors duration-200" key={index}> 
                            <td className="px-6 py-3">{item.transactionId}</td>
                            <td className="px-6 py-3">{item.transactionAmount}</td>
                            <td className="px-6 py-3">{item.transactionType}</td>
                            <td className="px-6 py-3">{item.transactionDate}</td>
                            <td className="px-6 py-3">{item.transactionTime}</td>
                        </tr>
                        ))
                 }
              </tbody>
          </table>
      </div>
  </div>
  )}
   </>
  )
}

export default Statement