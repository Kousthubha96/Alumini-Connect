import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F9] font-['Inter'] flex flex-col">
      {/* Navbar segment based on JSON */}
      <nav className="bg-[#2F5DAA] p-4 shadow-md">
        <h1 className="text-white text-xl font-semibold max-w-6xl mx-auto">Alumni Connect</h1>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-[#EAF2FB] w-full max-w-[400px] p-8 rounded-[12px] shadow-sm">
          <h2 className="text-[#2C2C2C] text-2xl font-semibold text-center mb-6">Login</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-[10px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:border-[#3B6FD8] bg-white text-[#2C2C2C]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-1">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full p-[10px] border border-[#D1D5DB] rounded-[8px] focus:outline-none focus:border-[#3B6FD8] bg-white text-[#2C2C2C]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#3B6FD8] hover:bg-[#2F5DAA] text-white font-medium p-[10px] rounded-[8px] transition-colors duration-200 mt-2"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6B7280]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3B6FD8] hover:text-[#2F5DAA] font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;