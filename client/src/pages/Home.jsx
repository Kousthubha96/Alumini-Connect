import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#F4F6F9] min-h-[80vh] flex items-center font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#2C2C2C] leading-tight">
            Connecting Past, Present, and <span className="text-[#2F5DAA]">Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#6B7280] max-w-lg mx-auto md:mx-0">
            Join the exclusive network of GM alumni. Mentorship, career opportunities, and lifelong connections start here.
          </p>
          <div className="pt-4">
            <Link 
              to="/register" 
              className="inline-block bg-[#2F5DAA] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#3B6FD8] hover:-translate-y-1 transition-all duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Element (Placeholder for an Illustration or Image) */}
        <div className="md:w-1/2 hidden md:block">
          <div className="bg-[#EAF2FB] rounded-3xl p-8 border-2 border-[#D1E3F8] shadow-sm transform rotate-2">
            <div className="bg-white rounded-2xl h-64 flex items-center justify-center text-[#2F5DAA] font-bold text-2xl border border-dashed border-[#5FA8F5]">
              [ Alumni Networking Illustration ]
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;