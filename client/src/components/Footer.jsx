import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white py-10 font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Alumni Connect</h3>
          <p className="text-[#6B7280] text-sm">
            Bridging the gap between students and alumni for a better professional future.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="font-semibold mb-4 text-[#5FA8F5]">Contact Us</h4>
          <p className="text-sm text-[#EAF2FB]">support@alumniconnect.com</p>
          <p className="text-sm text-[#EAF2FB] mt-2">+91 12345 67890</p>
        </div>

        {/* Social Icons Placeholder */}
        <div>
          <h4 className="font-semibold mb-4 text-[#5FA8F5]">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="#" className="hover:text-[#2CB5A0] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#2CB5A0] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#2CB5A0] transition-colors">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#6B7280] mt-8 pt-6 text-center text-xs text-[#6B7280]">
        &copy; {new Date().getFullYear()} Alumni Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;