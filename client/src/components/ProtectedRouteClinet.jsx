import React from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const ProtectedRouteClinet = ({children}) => {

    const navigate = useNavigate()
    const getCookie = Cookie.get('token')
    if(!getCookie){
        navigate('/login')
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRouteClinet