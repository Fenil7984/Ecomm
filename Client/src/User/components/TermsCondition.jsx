import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 animate__animated animate__fadeIn animate__delay-1s">
        Terms and Conditions
      </h1>
      <p className="text-sm text-gray-500 mb-8 text-center animate__animated animate__fadeIn animate__delay-2s">
        <strong>Effective Date:</strong> [Date]
      </p>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          1. Introduction
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to [Your Company Name]. By using our website and services,
          you agree to comply with and be bound by these Terms and Conditions.
          If you do not agree with these terms, please do not use our services.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          2. User Responsibilities
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          You agree to use our website and services for lawful purposes only.
          You will not use our platform to engage in any illegal, harmful, or
          fraudulent activities. You must also agree to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">Provide accurate and complete information when creating an account.</li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">Keep your account login credentials confidential and secure.</li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">Not to infringe on the intellectual property rights of others.</li>
          <li className="hover:text-blue-500 transition-all duration-300 ease-in-out">Comply with applicable laws and regulations.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          3. Account Termination
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          We reserve the right to suspend or terminate your account and access to
          our services at any time without notice if you violate any of these
          Terms and Conditions.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          4. Pricing and Payments
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          All prices for products and services are listed in [Currency] and are
          subject to change without notice. By making a purchase, you agree to
          pay the specified amount for the items and services, including any
          applicable taxes and shipping charges.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          5. Privacy Policy
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Your use of our website and services is also governed by our
          <a href="/privacyPolicy" className="text-blue-500 hover:underline"> Privacy Policy</a>.
          Please review the Privacy Policy to understand how we collect and use
          your personal data.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          6. Limitation of Liability
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          To the fullest extent permitted by law, [Your Company Name] is not
          liable for any indirect, incidental, or consequential damages arising
          from your use of our website or services. Our total liability shall
          not exceed the amount paid by you for the services or products
          provided.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          7. Governing Law
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          These Terms and Conditions are governed by and construed in accordance
          with the laws of [Country/State]. Any legal action or proceeding
          related to these terms shall be brought in the courts located in
          [Location].
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          8. Changes to These Terms
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          We reserve the right to update or change these Terms and Conditions at
          any time. When changes are made, the updated version will be posted on
          our website, and the “Effective Date” at the top of this page will be
          updated. Please review this page periodically for any updates.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 animate__animated animate__fadeIn">
          9. Contact Us
        </h2>
        <p className="text-lg text-gray-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
          If you have any questions or concerns about these Terms and Conditions,
          please contact us:
        </p>
        <ul className="list-none pl-0 text-gray-600 space-y-2">
          <li><strong>Email:</strong> [Your email address]</li>
          <li><strong>Phone:</strong> [Your contact number]</li>
          <li><strong>Address:</strong> [Your company address]</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditions;
