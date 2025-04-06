"use client";

import React, { useEffect, useState } from 'react'
import { initializePaddle, Paddle } from "@paddle/paddle-js"
import { Button } from '@/components/ui/button';


const Payment = () => {

  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (token) {
      initializePaddle({
        environment: 'sandbox',
        token: token,
      }).then((paddle) => setPaddle(paddle));
    } else {
      console.error("Paddle client token is not defined.");
    }
  },[])

  const handleCheckout = () => {
    if(!paddle) {
      return alert("Paddle is not initialized yet.");
    }

    paddle.Checkout.open({
      items : [
        {
          priceId : "pri_01jr1qb7f4jse9qed9eftq0anr",
          quantity : 1,
        }
      ],

      settings : {
        displayMode : "overlay",
        theme : "light" ,
        successUrl : "http://localhost:3000/success-subscription",
      }
    })

  }

  return (
    <div>
      <Button className='cursor-pointer' onClick={handleCheckout}>Procced To Payment</Button>
    </div>
  )
}

export default Payment