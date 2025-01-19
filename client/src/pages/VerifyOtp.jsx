import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

const VerifyOtpSchema = z.object({
    otp: z.string().max(6, {message: 'Invalid OTP'}).min(6, {message: 'Please Enter OTP'})
})

const VerifyOtp = () => {

    const Navigate = useNavigate();
    const phone = Cookie.get('phone')
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(VerifyOtpSchema)
    });

    if(!phone){
        // Navigate('/')
        console.log('phone not found')
    }

    const verifyOtpHandler = async (data) => {
        const response = await axios.post('http://localhost:8000/api/auth/verify', {
            otp: data.otp,
            phone: phone
        })

        return response
    }

    const mutation = useMutation({
        mutationFn: verifyOtpHandler,
        onSuccess: () => {
            console.log('success');
            alert('OTP verified successfully');
            Cookie.remove('phone');
            Navigate('/');
        },
        onError: (error) => {
            console.log(error)
            alert('Invalid OTP')
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data);
        console.log(data)
    }

  return (
    <form className="w-full flex flex-col items-center mt-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center mb-4">The OTP sent to your mobile number</div>
            <div className='mb-6'>
                <input type="text" placeholder="Enter OTP" className="block px-4 py-2 border border-gray-300 rounded-md"
                {...register('otp')}/>
                {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
            </div>
        <button type='submit' className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
            Verify OTP
        </button>
    </form>

  )
}

export default VerifyOtp