import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const TransferSchema = z.object({
    amount: z.number().max(10000, { message: 'Amount should be less than 10000' }).min(1, { message: 'Amount should be greater than 1' })   ,
    accountNumber: z.string().min(10, { message: 'Account number should be 10 digits' }).max(10, { message: 'Account number should be 10 digits' }),
    ifsc: z.string().min(10, { message: 'IFSC code should be 8 characters' }).max(10, { message: 'IFSC code should be 10 characters' }) // updated validation
})  

const Transfer = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(TransferSchema)
    })

    const transferMoney = async (data) => {
        const reponse = await axios.post('http://localhost:8000/api/user/transfer', {
            amount: data.amount,
            receiverAccount: data.accountNumber,
            receiverIfsc: data.ifsc
        })

        console.log(reponse)
        return reponse
    }

    const muataion = useMutation({
        mutationKey: ['transfer'],
        mutationFn: transferMoney,
        onError: (error) => {
            console.log(error)
            alert(error.response.data.message)
        },
        onSuccess: (data) => {
            console.log(data)
            alert('Money transfered successfully')
        }
    })

    const onSubmit = (data) => {
        muataion.mutate(data)
        console.log(data)
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center mt-10'>
                <h1 className='text-3xl font-semibold'>NetBanking</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='mt-10 p-6 shadow-lg'>
                    <div className='mb-8'>
                        <label className='block text-sm font-medium text-gray-700'>Account Number</label>
                        <input 
                            type="text" 
                            className='w-96 mt-2 p-2 border border-gray-300 rounded-md' 
                            {...register('accountNumber')} 
                        />
                        {errors.accountNumber && <p className='text-red-500'>{errors.accountNumber.message}</p>}
                    </div>
                    <div className='mb-8'>
                        <label className='block text-sm font-medium text-gray-700'>IFSC Number</label>
                        <input 
                            type="text" 
                            className='w-96 mt-2 p-2 border border-gray-300 rounded-md' 
                            {...register('ifsc')} 
                        />
                        {errors.ifsc && <p className='text-red-500'>{errors.ifsc.message}</p>}
                    </div>
                    <div className='mt-8'>
                        <label className='block text-sm font-medium text-gray-700'>Amount</label>
                        <input 
                            type='number' 
                            className='w-96 mt-2 p-2 border border-gray-300 rounded-md' 
                            {...register('amount', { valueAsNumber: true })} // Ensuring the value is parsed as a number
                        />
                        {errors.amount && <p className='text-red-500'>{errors.amount.message}</p>}
                    </div>
                    <div className='mt-10'>
                        <button type='submit' className='block bg-gray-200 w-96 py-2 rounded'>Send Money</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Transfer
