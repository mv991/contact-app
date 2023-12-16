import React from "react";

function Navbar() {
  return (
    <div className="md:w-full md:h-[70px] md:border-b-2 md:flex hidden font-mono items-center justify-center">
      <h1 className="italic font-semibold text-4xl text-purple-600 mr-auto ml-3">Contacts</h1>
      <div className="flex lg:w-[80%] gap-[6.5rem] lg:text-lg font-bold justify-around mr-4">
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Messages</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Contacts</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Media</h3>
      <h3 className="cursor-pointer text-gray-400 hover:text-purple-400">Images</h3>
      </div>
    </div>
  );
}

export default Navbar;
