import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms and Conditions</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-base leading-relaxed">
          Welcome to our AI-powered blog post generator platform. By using our services, you agree to be bound by these terms and conditions. Please read them carefully.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
        <p className="text-base leading-relaxed">
          Our platform allows you to generate, store, and publish SEO-optimized blog content using AI. You are responsible for any content generated or published using your account. We reserve the right to suspend access if usage violates any laws or our policies.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
        <p className="text-base leading-relaxed">
          To access our services, you must register an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
        <p className="text-base leading-relaxed mb-2">
          Our services are provided on a subscription basis. Payments are processed securely through Paddle. By subscribing, you authorize us (via Paddle) to charge your payment method on a recurring monthly basis.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>All prices are listed in USD and may be subject to taxes depending on your location.</li>
          <li>You can cancel your subscription at any time through your account dashboard or by contacting support.</li>
          <li>No refunds are provided for partial months or unused time unless required by law.</li>
          <li>If payment fails, access to premium features may be suspended until the issue is resolved.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
        <p className="text-base leading-relaxed">
          All content generated through the platform belongs to you. However, the underlying AI system and platform architecture are owned by us. You agree not to reverse-engineer or replicate the service.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
        <p className="text-base leading-relaxed">
          We reserve the right to suspend or terminate accounts that violate these terms or are involved in abusive or illegal activity.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
        <p className="text-base leading-relaxed">
          We may update these terms from time to time. Continued use of the platform after changes constitutes your acceptance of the revised terms.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
        <p className="text-base leading-relaxed">
          For any questions regarding these Terms and Conditions, please contact us at: <a href="mailto:mohamedbelalia.dev@gmail.com" className="text-blue-600 underline">mohamedbelalia.dev@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
