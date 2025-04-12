'use client';


import PayPalSubscriptionButton from '@/components/PayPalSubscriptionButton';
import { Button } from '@/components/ui/button';
import React from 'react'

const planTitle = 'growth';
const planId = 'P-51J84418L8135771CM75ZVIQ';

const CheckoutGrowthP = ({ userId }:{userId : string | undefined}) => {


    const handleSuccess = (subscriptionId: string) => {
        console.log("User subscribed successfully: ", subscriptionId);
        if(userId){
            handleSubscriptionSuccess(subscriptionId, userId);
        }
        
    };

    const handleSubscriptionSuccess = async (subscriptionId: string, userId: string) => {
        const res = await fetch('/api/paypal/subscription-details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscriptionId, userId , planTitle , planId }),
        });

        const data = await res.json();

        if (data.success) {
            console.log('Subscription saved:', data.subscription);
        } else {
            console.error('Error saving subscription:', data.error);
        }
    };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
            Checkout – Growth Plan
        </h1>
        <p className="text-center text-gray-500 mb-8 text-lg">
            Level up your blog game with automation and smart SEO
        </p>

        <div className="bg-gray-50 rounded-xl p-6 border border-purple-100 mb-6">
            <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-purple-700">Growth</span>
                <span className="text-2xl font-bold text-gray-900">$19/mo</span>
            </div>

            <ul className="text-gray-700 space-y-2 text-sm pl-2">
                <li>✔️ 30 blog posts / month</li>
                <li>✔️ Advanced SEO</li>
                <li>✔️ Custom Tone</li>
                <li>✔️ Add Extra Details</li>
                <li>✔️ Download as HTML</li>
            </ul>
        </div>

        <div className="text-center mb-4">
            <h2 className="text-gray-700 font-medium mb-2">
                Secure payment via
            </h2>

            {/* PayPal button placeholder */}
            <div id="paypal-button-container" className="mt-2">
                {
                    userId && userId !== ''
                    ?
                    <div>
                        {userId}
                        <PayPalSubscriptionButton planId='P-51J84418L8135771CM75ZVIQ' onSuccess={handleSuccess} />
                    </div>
                    : 
                    <Button>Login First id:{userId}</Button>
                }
            </div>
        </div>


    </div>
</div>
  )
}

export default CheckoutGrowthP