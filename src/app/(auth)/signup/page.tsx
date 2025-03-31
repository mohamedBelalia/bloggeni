import { Button } from '@/components/ui/button'
import React from 'react'

const SignupPage = () => {
  return (
    <div>
        <form action='/auth/signup' method='post'>
        <div className='grid'>
                <label>Email</label>
                <input type="text" name='email' className='border border-black' />
            </div>
            <hr />
            <div className='grid'>
                <label>Password</label>
                <input type="text" name='password' className='border border-black' />
            </div>

            <div className='mt-4'>
                <Button type='submit' className='cursor-pointer'>Signup</Button>
            </div>
        </form>
    </div>
  )
}

export default SignupPage