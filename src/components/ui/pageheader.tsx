import React from 'react';
import Image from 'next/image';

// @ts-ignore
const PageHeader = ({ userName }) => {
  return (
    <header className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-200 border-opacity-20 rounded-lg shadow-lg p-4 m-2 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <Image 
          className='rounded-3xl'
          src="https://yt3.ggpht.com/gFX04YcpKg9omeIlmG1e01EtfC_WJl0Ye6_dXh2su1DIs8NFM0vurW5IxWRm5F3vQFS4lsPu=s160-c-k-c0x00ffffff-no-rj"
          width={48}
          height={48}
          alt="User avatar"
        />
        <div className="ml-4">
          <h1 className="text-xl font-bold text-gray-800">{userName}</h1>
          <h3 className="text-sm text-gray-600">Watch History</h3>
        </div>
      </div>
      <div className="text-gray-600">
        <button 
          type="button" 
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Process
        </button>
      </div>
    </header>
  );
};

export default PageHeader;