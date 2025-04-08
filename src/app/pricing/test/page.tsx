"use client"

import React, { useEffect } from 'react'
import axios from 'axios'



const TestPricing = () => {
    useEffect(() => {

        getProducts()

        const script = document.createElement('script')
        script.src = 'https://app.lemonsqueezy.com/js/lemon.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }

    }, [])

    return (
        <button
            data-lemon-squeezy="true"
            data-product="484310"
            className="bg-green-600 text-white px-4 py-2 rounded"
        >
            Buy Now
        </button>
    )
}

export default TestPricing


const headers = {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_LEMONSQUEEZY_API_KEY}`
}

const getProducts = async () => {

    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_LEMONSQUEEZY_BASE_URL}/products`, { headers })

        console.log(response.data)

    } catch (error) {
        console.log(error);

    }

}