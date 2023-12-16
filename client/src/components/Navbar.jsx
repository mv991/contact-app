import React from "react";

function Navbar() {
  return (
    <div className="md:w-full md:h-[70px] md:border-b-2 flex   font-mono items-center justify-center">
      <h1 className="italic font-semibold text-2xl md:text-4xl text-purple-600 mr-auto ml-3">Contacts</h1>
      <div className="md:flex hidden lg:w-[80%] gap-[6.5rem] lg:text-lg font-bold justify-around mr-4">
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Messages</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Contacts</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Media</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Images</h3>
      </div>
      <div className="dropdown md:hidden mr-6 mt-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="dropdown cursor-pointer w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <div className="dropdown-content  block pl-2">
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Messages</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Contacts</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Media</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Images</h3>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
