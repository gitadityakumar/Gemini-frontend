import React from 'react';
import Image from 'next/image';
import { useUser } from "@clerk/nextjs";
import { modeState } from '@/app/recoilContextProvider';
import { useRecoilState } from 'recoil';
import CustomComponent from './customComponent';

interface PageHeaderProps {
  onProcess: () => Promise<void>; // Changed to Promise<void> to match CustomComponent
  isProcessing: boolean;
  progress: number | null;
  // hookError:string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onProcess, isProcessing, progress }) => {
  const { user, isLoaded } = useUser();
  const [mode] = useRecoilState(modeState);
  
  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Placeholder data for unauthenticated users
  const placeholderImageUrl = `https://via.placeholder.com/48x48/${getRandomColor().slice(1)}/FFFFFF?text=?`;
  const placeholderName = "Guest User";
  const imageUrl = isLoaded && user ? user.imageUrl : placeholderImageUrl;
  const fullName = isLoaded && user ? user.fullName : placeholderName;

  return (
    <header className="bg-zinc-100 bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-200 border-opacity-20 rounded-lg shadow-lg p-4 m-2 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <Image 
          className='rounded-3xl'
          src={imageUrl}
          width={48}
          height={48}
          alt="User avatar"
        />
        <div className="ml-4">
          <h1 className="text-xl font-bold text-gray-800">{fullName}</h1>
          <h3 className="text-sm text-gray-600">Watch History</h3>
        </div>
      </div>
      <div className="text-gray-600 flex flex-row items-center">
        <div className="text-xl text-center font-semibold rounded-lg p-2 mr-4">
          Mode: 
          {mode === 'private' ? (
            <span className="text-teal-400 ml-2">Private</span>
          ) : (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 ml-2">
              Public
            </span>
          )}
        </div>
        <CustomComponent
          buttonText="Process"
          onProcess={onProcess}
          isProcessing={isProcessing}
          progress={progress!}
          // hookError={hookError}

        />
      </div>
    </header>
  );
};

export default PageHeader;