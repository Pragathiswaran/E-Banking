import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useMutation } from 'react-query'

const LoginSchema = z.object({
    crn: z.string().max(10, {message: 'Invalid crn address'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
})
const Login = () => {

    const Navigate = useNavigate();

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema)
    });

    const loginHandler = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                crn: data.crn,
                password: data.password
            })
            console.log(response)
            return response
            
        } catch (error) {
            console.log(error)
        }
    }

    const mutation = useMutation({
        mutationFn: loginHandler,
        onSuccess: () => {
            console.log('success')
            alert('Login Successfull')
        }, 
        onError: (error) => {
            console.log(error)
            alert('Invalid Credentials')
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data);
        console.log(data)
    }
  return (
    <div className='max-w-md mx-auto mt-40 p-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold text-center mb-6'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div className='mb-4'>
            <label htmlFor="crn" className='block text-sm font-medium text-gray-700'>crn</label>
            <input type="crn" id="crn" className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" '{...register('crn')}/>
             {errors.crn && <p className="text-red-500 text-sm mt-1">{errors.crn.message}</p>}
        </div>
        <div className='mb-4'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>password</label>
            <input type="password" id="password" className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" ' {...register('password')}/>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className='mt-3'>
            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-indigo-700" disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Submitting...' : 'Login'}
            </button>
        </div>
    </form>
    </div>
  )
}

export default Login