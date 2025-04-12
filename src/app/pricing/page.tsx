'use client';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    path:'/pricing/starter-plan',
    price: 'Free',
    features: [
      '3 blog posts / month',
      'Basic SEO',
      'Limited customization',
      'Storage access',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Growth',
    path:'/pricing/growth-plan',
    price: '$19/mo',
    features: [
      '30 blog posts / month',
      'Advanced SEO',
      'Custom Tone',
      'Add Extra Details',
      'Download as HTML',
    ],
    cta: 'Upgrade Now',
    highlighted: true,
  },
  {
    name: 'Unlimited',
    path:'/pricing/unlimited-plan',
    price: '$49/mo',
    features: [
      'Unlimited blog posts',
      'All Growth features',
      'Auto-publish to WordPress',
    ],
    cta: 'Go Unlimited',
    highlighted: false,
  },
];

export default function PricingPage() {


  // const handleSuccess = (subscriptionId: string) => {
  //   console.log("User subscribed successfully: ", subscriptionId);
  //   handleSubscriptionSuccess(subscriptionId, '39449775-b6a3-472a-84da-b70510d6a929');
  // };

  // const handleSubscriptionSuccess = async (subscriptionId: string, userId: string) => {
  //   const res = await fetch('/api/paypal/subscription-details', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ subscriptionId, userId }),
  //   });
  
  //   const data = await res.json();
  
  //   if (data.success) {
  //     console.log('Subscription saved:', data.subscription);
  //   } else {
  //     console.error('Error saving subscription:', data.error);
  //   }
  // };
  

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Simple Pricing, Powerful Results</h1>
        <p className="text-lg text-gray-600 mb-10">Start free. Upgrade when you&apos;re ready.</p>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-xl p-8 flex flex-col justify-between border transition-transform duration-300 hover:scale-[1.02] ${
                plan.highlighted ? 'border-[#652293] bg-[#f9f5ff]' : 'border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 text-sm font-semibold text-[#652293]">Most Popular</div>
              )}
              <div>
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-3xl font-bold mb-6 text-[#652293]">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-left text-gray-700">
                      <Check className="w-5 h-5 mr-2 text-[#652293]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {/* <PayPalSubscriptionButton planId={plan.priceId} onSuccess={handleSuccess} /> */}
              <a
                href={plan.path}
                className={`w-full mt-auto py-2 px-4 rounded-xl text-white cursor-pointer font-semibold shadow ${
                  plan.highlighted
                    ? 'bg-[#652293] hover:bg-[#531a7a]'
                    : 'bg-gray-300  hover:bg-gray-400 !text-black'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold text-center mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              q: 'Can I cancel anytime?',
              a: 'Yes, you can cancel your subscription at any time without penalties.',
            },
            {
              q: 'Does this work with all WordPress themes?',
              a: 'Yes, we publish content using the official WordPress API, compatible with all themes.',
            },
            {
              q: 'What happens if I hit my post limit?',
              a: 'You’ll be prompted to upgrade or wait for your monthly quota to reset.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'We offer a 7-day refund policy on paid plans if you’re not satisfied.',
            },
          ].map((item, idx) => (
            <details key={idx} className="bg-gray-100 p-4 rounded-xl">
              <summary className="font-semibold cursor-pointer">{item.q}</summary>
              <p className="mt-2 text-gray-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
