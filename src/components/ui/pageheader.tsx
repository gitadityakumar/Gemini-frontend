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
  //TODO: add hardcoded icon here instead of placeholderurl
  const placeholderImageUrl = `https://via.placeholder.com/48x48/${getRandomColor().slice(1)}/FFFFFF?text=?`;
  const placeholderName = "Guest User";
  const imageUrl = isLoaded && user ? user.imageUrl : placeholderImageUrl;
  const fullName = isLoaded && user ? user.fullName : placeholderName;

  return (
    <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-filter backdrop-blur-lg 
      border border-gray-200/20 dark:border-zinc-800/20 
      rounded-lg shadow-lg dark:shadow-zinc-950/10
      p-4 m-2 flex flex-col md:flex-row items-center justify-between
      transition-colors duration-300">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="relative">
          <Image 
            className="rounded-3xl ring-2 ring-gray-200/50 dark:ring-zinc-700/50"
            src={imageUrl}
            width={48}
            height={48}
            alt="User avatar"
          />
          <div className="absolute inset-0 rounded-3xl ring-2 ring-white/10 dark:ring-black/10"></div>
        </div>
        <div className="ml-4">
          <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 transition-colors">
            {fullName}
          </h1>
          <h3 className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors">
            Watch History
          </h3>
        </div>
      </div>
      <div className="text-zinc-600 dark:text-zinc-400 flex flex-row items-center">
        <div className="text-xl text-center font-semibold rounded-lg p-2 mr-4 transition-colors">
          Mode: 
          {mode === 'private' ? (
            <span className="text-teal-500 dark:text-teal-400 ml-2 transition-colors">
              Private
            </span>
          ) : (
            <span className="bg-clip-text text-transparent bg-gradient-to-r 
              from-blue-400 to-purple-600 
              dark:from-blue-300 dark:to-purple-400 ml-2">
              Public
            </span>
          )}
        </div>
        <CustomComponent
          buttonText="Process"
          onProcess={onProcess}
          isProcessing={isProcessing}
          progress={progress!}
        />
      </div>
    </header>
  );
};

export default PageHeader;