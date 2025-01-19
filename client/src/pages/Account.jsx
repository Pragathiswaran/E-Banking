import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookie from 'js-cookie';

const Account = () => {
  
  const getAccountData = async () => {
    const response = await axios.get('http://localhost:8000/api/user/account');
    return response.data;
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['account'],
    queryFn: getAccountData,
    enabled: !!Cookie.get('token'),
  });

  return (
    <>
    {isLoading ? <div className='mt-40'>Loading...</div> : (
      <div className='mt-10 mx-8'>
      <div className='flex items-center'>
        <div className='border-2 p-3 rounded-full mx-2'>
          <FontAwesomeIcon icon={faUser} className='size-[50px]'/>
        </div>
         <div>
              <h1 className='font-semibold text-3xl'>{data.user.name}</h1>
         </div>
      </div>
      <div className='mt-20'>
          <h1 className='text-3xl mb-12'>Account details</h1>
          <div className='grid grid-cols-2 gap-12 mt-4'>
              <div>
                  <h1 className='font-semibold text-xl'>Account Number</h1>
                  <p className='text-gray-500'>{data.user.account}</p>
              </div>
              <div>
                  <h1 className='font-semibold text-xl'>CRN Number</h1>
                  <p className='text-gray-500'>
                      {data.user.crn}
                  </p>
              </div>
              <div>
                  <h1 className='font-semibold text-xl'>Account Balance</h1>
                  <p className='text-gray-500'>{data.user.balance}</p>
              </div>
              <div>
                  <h1 className='font-semibold text-xl'>Account Type</h1>
                  <p className='text-gray-500'>{data.user.accountType}</p>
              </div>
          </div>
      </div>
  </div>
    )}
    </>
  )
}

export default Account