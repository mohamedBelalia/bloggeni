'use client';

import { Shield, CreditCard, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#652293] mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our service. By using our service, you agree to these terms.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Terms */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-[#652293]" />
              <h2 className="text-2xl font-semibold text-gray-900">Subscription Terms</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Payment Processing</h3>
                  <p className="text-gray-600">
                    All payments are processed securely through PayPal. We do not store your credit card information.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Billing Cycle</h3>
                  <p className="text-gray-600">
                    Subscriptions are billed on a monthly basis. Your subscription will automatically renew unless cancelled.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Cancellation Policy</h3>
                  <p className="text-gray-600">
                    You can cancel your subscription at any time through your PayPal account or by contacting our support team.
                  </p>
                </div>
              </div>
            </div>
          </section>


          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#652293]" />
              <h2 className="text-2xl font-semibold text-gray-900">Service Usage</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Content Ownership</h3>
                  <p className="text-gray-600">
                    You retain all rights to the content you generate using our service. We do not claim ownership of your content.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Usage Limits</h3>
                  <p className="text-gray-600">
                    Your subscription plan determines the number of blog posts you can generate per month. Exceeding these limits may require an upgrade.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy and Security */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[#652293]" />
              <h2 className="text-2xl font-semibold text-gray-900">Privacy and Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Data Protection</h3>
                  <p className="text-gray-600">
                    We implement industry-standard security measures to protect your data. All transactions are encrypted using SSL technology.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Information Collection</h3>
                  <p className="text-gray-600">
                    We collect only the information necessary to provide our services and process your payments securely.
                  </p>
                </div>
              </div>
            </div>
          </section>


          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-[#652293]" />
              <h2 className="text-2xl font-semibold text-gray-900">Important Notices</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Refund Policy</h3>
                  <p className="text-gray-600">
                    Refunds are handled according to PayPal&apos;s policies. Please contact our support team for assistance with refund requests.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Service Availability</h3>
                  <p className="text-gray-600">
                    We strive to maintain 99.9% uptime. Scheduled maintenance will be announced in advance.
                  </p>
                </div>
              </div>
            </div>
          </section>


          <section>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#652293]" />
              <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600">
              If you have any questions about these terms, please contact us at{' '}
              <a href="mailto:mohamedbelalia.dev@gmail.com" className="text-[#652293] hover:underline">
                mohamedbelalia.dev@gmail.com
              </a>
            </p>
          </section>
        </div>


        <div className="mt-8 text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
