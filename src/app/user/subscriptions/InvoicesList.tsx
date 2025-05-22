'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Clock, CreditCard, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface SubscriptionInvoice {
  id: string;
  paypal_subscription_id: string;
  plan: string;
  currency: string;
  start_date: string;
  next_billing_time: string;
  status: 'ACTIVE' | 'canceled' | 'pending';
  created_at: string;
}

const statusColor = {
  ACTIVE: 'bg-green-100 text-green-700',
  canceled: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-800',
};

const planDetails = {
  'P-33L59819EV611260PNAHE57I': {
    name: 'Growth Plan',
    price: '$19/mo',
    features: ['30 blog posts/month', 'Advanced SEO', 'Custom Tone', 'HTML Download'],
  },
  'P-2C6695118V582343YNAHFA4Y': {
    name: 'Unlimited Plan',
    price: '$49/mo',
    features: ['Unlimited posts', 'All Growth features', 'WordPress Integration'],
  },
};

export default function SubscriptionsPage({userId} : {userId : string | undefined}) {
  const [invoices, setInvoices] = useState<SubscriptionInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', userId); 

      if (error) {
        console.error('Failed to fetch invoices:', error.message);
      } else {
        setInvoices(data);
      }
      setLoading(false);
    };

    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Your Subscriptions</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your active subscriptions and view your billing history.
          </p>
        </div>


        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              <p className="text-gray-600">Loading your subscriptions...</p>
            </div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <CreditCard className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Active Subscriptions</h3>
            <p className="text-gray-600 mb-6">
              You don&apos;t have any active subscriptions yet. Upgrade your plan to access premium features.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition"
            >
              View Pricing Plans
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {invoices.map((sub) => {
              const plan = planDetails[sub.plan as keyof typeof planDetails] || {
                name: sub.plan,
                price: 'Custom',
                features: [],
              };

              return (
                <Card
                  key={sub.id}
                  className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 bg-white overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-semibold text-gray-800">{plan.name}</h2>
                          <Badge className={`${statusColor[sub.status]} px-3 py-1 text-sm capitalize rounded-full`}>
                            {sub.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-3xl font-bold text-primary mb-2">{plan.price}</p>
                          <p className="text-sm text-gray-500">PayPal ID: {sub.paypal_subscription_id}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>Started: {new Date(sub.start_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>Next Billing: {new Date(sub.next_billing_time).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="md:w-1/3">
                        <h3 className="font-semibold text-gray-800 mb-3">Plan Features</h3>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
