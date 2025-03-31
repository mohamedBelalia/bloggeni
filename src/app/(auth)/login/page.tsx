"use client"

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {

    const [dataA, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    })

    const router = useRouter()

    const handleLogin = async () => {
        try {

            let { data, error } = await supabase.auth.signInWithPassword({
                email: dataA.email ,
                password: dataA.password
            })

            if (data) {
                router.refresh()
            }


        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='w-[50%] mx-auto mt-10'>
            <div className='grid'>
                <label>Email</label>
                <input type="text" name='email' className='border border-black' value={dataA?.email} onChange={handleChange} />
            </div>
            <hr />
            <div className='grid'>
                <label>Password</label>
                <input type="text" name='password' className='border border-black' value={dataA?.password} onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <Button className='cursor-pointer' onClick={handleLogin}>Login</Button>
            </div>
        </div>
    )
}

export default Login

