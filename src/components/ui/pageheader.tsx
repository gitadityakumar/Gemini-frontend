import React from 'react';
import Image from 'next/image';

// @ts-ignore

const PageHeader = ({ userName, watchHistory }) => {
  return (
    <header className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-200 border-opacity-20 rounded-lg shadow-lg p-4 m-2 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <Image className='rounded-3xl'
      src="https://yt3.ggpht.com/gFX04YcpKg9omeIlmG1e01EtfC_WJl0Ye6_dXh2su1DIs8NFM0vurW5IxWRm5F3vQFS4lsPu=s160-c-k-c0x00ffffff-no-rj"
      width={48}
      height={48}
      alt="Picture of the author"
    />
        <h1 className="text-xl font-bold text-gray-800 p-2">{userName}</h1>
      </div>
      <div className="text-gray-600">
        Watch History: <span className="font-semibold">{watchHistory}</span>
      </div>
    </header>
  );
};

export default PageHeader;