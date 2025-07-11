import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{backgroundColor:'rgba(214,69,52,255)'}} className="bg-blue-600 text-white py-8 shadow-md">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
      </div>

      {/* Intro Text */}
      <div className="max-w-3xl mx-auto mt-8 px-4 text-center">
        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-blue-600">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Why Choose Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Efficiency Card */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Efficiency</h3>
            <p className="text-gray-600">
              We streamline the healthcare experience, helping you schedule appointments and manage records faster and more reliably.
            </p>
          </div>

          {/* Convenience Card */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Convenience</h3>
            <p className="text-gray-600">
              Access your medical data and book appointments from the comfort of your home with just a few clicks.
            </p>
          </div>

          {/* Personalization Card */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Personalization</h3>
            <p className="text-gray-600">
              Receive personalized healthcare reminders and services tailored to your unique medical history.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default About;
