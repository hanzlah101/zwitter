import React from "react";

const Footer = () => {
  return (
    <footer className="text-xs m-4 text-gray-700">
      <div className="flex items-center gap-4">
        <span className="hover:underline cursor-pointer">Terms of Service</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Cookie Policy</span>
      </div>

      <div className="flex items-center text-xs mt-1 gap-4">
        <span className="hover:underline cursor-pointer">Ads info</span>
        <span className="hover:underline cursor-pointer">More</span>
        <span>© {new Date().getFullYear()} Twitter, Inc.</span>
      </div>
    </footer>
  );
};

export default Footer;
