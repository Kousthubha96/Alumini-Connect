import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Alumni Connect</h1>
          <p className="text-xl text-gray-600">Building bridges between past and future</p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Alumni Connect is dedicated to fostering lifelong connections between alumni, students, and our institution.
            We believe that the relationships formed during academic years are invaluable resources for personal and professional growth.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our platform serves as a bridge between generations, enabling knowledge sharing, mentorship opportunities,
            career guidance, and community building that extends far beyond graduation.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-600">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">John Smith</h3>
              <p className="text-gray-600 mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-500">Class of 2010</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-600">👩</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">Community Manager</p>
              <p className="text-sm text-gray-500">Class of 2015</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-600">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mike Chen</h3>
              <p className="text-gray-600 mb-2">Technical Lead</p>
              <p className="text-sm text-gray-500">Class of 2018</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connection</h3>
              <p className="text-gray-700">We believe in the power of human connections and strive to create meaningful relationships.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth</h3>
              <p className="text-gray-700">Continuous learning and personal development are at the heart of our community.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-700">We maintain high standards in everything we do, from our platform to our community interactions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inclusion</h3>
              <p className="text-gray-700">Everyone belongs here. We welcome alumni from all backgrounds and experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;