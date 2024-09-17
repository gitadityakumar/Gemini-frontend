import React from 'react';
import Image from 'next/image';
import { useUser } from "@clerk/nextjs";
import { useToast } from '@/hooks/use-toast';

interface PageHeaderProps {
  onProcess: () => void;
  isProcessing: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onProcess, isProcessing }) => {
  const { user, isLoaded } = useUser();
  const { toast } = useToast()

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

  // Use actual user data if available, otherwise use placeholder data
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
      <div className="text-gray-600">
        <button 
          type="button" 
          className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onProcess}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isProcessing ? 'Processing...' : 'Process'}
        </button>
      </div>
    </header>
  );
};

export default PageHeader;